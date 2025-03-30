import React, { useState } from 'react';
import { Search, Pill } from 'lucide-react';
import FDAReports from './FDAReports';
import DrugComposition from './DrugComposition';
import SocialUpdates from './SocialUpdates';
import PatientData from './PatientData';

interface Composition {
  name: string;
  amount: string;
  role: string;
}

interface Drug {
  id: number;
  name: string;
  brandNames: string[];
  class: string;
  indications: string;
  composition: Composition[];
}

// Mock data for drug search
// const mockDrugs: Drug[] = [
//   {
//     id: 1,
//     name: 'Atorvastatin',
//     brandNames: ['Lipitor', 'Torvast'],
//     class: 'HMG-CoA reductase inhibitor (statin)',
//     indications: 'Hypercholesterolemia, Prevention of cardiovascular disease',
//     composition: [
//       { name: 'Atorvastatin Calcium', amount: '10-80mg', role: 'Active Ingredient' },
//       { name: 'Calcium Carbonate', amount: '10mg', role: 'Stabilizer' },
//       { name: 'Microcrystalline Cellulose', amount: '20mg', role: 'Binder' },
//       { name: 'Lactose Monohydrate', amount: '25mg', role: 'Diluent' },
//       { name: 'Croscarmellose Sodium', amount: '5mg', role: 'Disintegrant' },
//       { name: 'Magnesium Stearate', amount: '2mg', role: 'Lubricant' },
//       { name: 'Hydroxypropyl Cellulose', amount: '5mg', role: 'Coating agent' }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Metformin',
//     brandNames: ['Glucophage', 'Fortamet'],
//     class: 'Biguanide',
//     indications: 'Type 2 Diabetes',
//     composition: [
//       { name: 'Metformin Hydrochloride', amount: '500-1000mg', role: 'Active Ingredient' },
//       { name: 'Povidone', amount: '15mg', role: 'Binder' },
//       { name: 'Magnesium Stearate', amount: '2mg', role: 'Lubricant' },
//       { name: 'Hypromellose', amount: '8mg', role: 'Coating agent' }
//     ]
//   }
// ];

const Dashboard: React.FC = () => {
  const [selectedDrug, setSelectedDrug] = useState<string>(''); // Store entered drug
  const [activeDrug, setActiveDrug] = useState<string | null>(null); // Store searched drug

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDrug.trim() !== '') {
      setActiveDrug(selectedDrug.trim()); // Store the entered drug when searched
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Pill className="h-6 w-6 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Drug Information Dashboard
            </h1>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Enter drug name..."
                value={selectedDrug}
                onChange={(e) => setSelectedDrug(e.target.value)}
                className="w-full bg-slate-700/30 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Search
            </button>
          </form>
        </div>

        {activeDrug && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <DrugComposition drug={activeDrug} />
              <FDAReports drug={activeDrug} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SocialUpdates drug={activeDrug} />
              <PatientData drug={activeDrug} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;