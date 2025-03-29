'use client';

import React, { useState } from 'react';
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
const mockDrugs: Drug[] = [
  {
    id: 1,
    name: 'Atorvastatin',
    brandNames: ['Lipitor', 'Torvast'],
    class: 'HMG-CoA reductase inhibitor (statin)',
    indications: 'Hypercholesterolemia, Prevention of cardiovascular disease',
    composition: [
      { name: 'Atorvastatin Calcium', amount: '10-80mg', role: 'Active Ingredient' },
      { name: 'Calcium Carbonate', amount: '10mg', role: 'Stabilizer' }
      // ... other components
    ]
  },
  {
    id: 2,
    name: 'Metformin',
    brandNames: ['Glucophage', 'Fortamet'],
    class: 'Biguanide',
    indications: 'Type 2 Diabetes',
    composition: [
      { name: 'Metformin Hydrochloride', amount: '500-1000mg', role: 'Active Ingredient' }
    ]
  }
];

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDrug, setActiveDrug] = useState<Drug | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const foundDrug = mockDrugs.find(drug =>
      drug.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setActiveDrug(foundDrug || null);
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <form onSubmit={handleSearch} className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search for a drug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-80"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Search
        </button>
      </form>

      {activeDrug ? (
        <>
          <h1 className="text-2xl font-bold mb-6">
            Search Results for: <span className="text-blue-400">{activeDrug.name}</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <DrugComposition drug={activeDrug} />
            <FDAReports drug={activeDrug} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SocialUpdates drug={activeDrug} />
            <PatientData drug={activeDrug} />
          </div>
        </>
      ) : (
        <h1 className="text-2xl font-bold mb-6">
          Search for a drug to view details
        </h1>
      )}
    </div>
  );
};

export default Dashboard;
