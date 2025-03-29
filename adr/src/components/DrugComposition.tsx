import React from 'react';
import { FlaskRound as Flask, ArrowUpRight, CheckCircle } from 'lucide-react';

interface Composition {
  name: string;
  amount: string;
  role: string;
}

interface Drug {
  name: string;
  brandNames: string[];
  class: string;
  indications: string;
  composition: Composition[];
}

interface DrugCompositionProps {
  drug?: Drug;
}

const DrugComposition: React.FC<DrugCompositionProps> = ({ drug }) => {
  const drugData: Drug = drug || {
    name: 'Atorvastatin',
    brandNames: ['Lipitor', 'Torvast'],
    class: 'HMG-CoA reductase inhibitor (statin)',
    indications: 'Hypercholesterolemia, Prevention of cardiovascular disease',
    composition: [
      { name: 'Atorvastatin Calcium', amount: '10-80mg', role: 'Active Ingredient' },
      { name: 'Calcium Carbonate', amount: '10mg', role: 'Stabilizer' },
      { name: 'Microcrystalline Cellulose', amount: '20mg', role: 'Binder' },
      { name: 'Lactose Monohydrate', amount: '25mg', role: 'Diluent' },
      { name: 'Croscarmellose Sodium', amount: '5mg', role: 'Disintegrant' },
      { name: 'Magnesium Stearate', amount: '2mg', role: 'Lubricant' },
      { name: 'Hydroxypropyl Cellulose', amount: '5mg', role: 'Coating agent' }
    ]
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-slate-600 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <Flask className="h-6 w-6 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Drug Composition
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <span className="text-emerald-400">FDA Approved</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold text-emerald-400">{drugData.name}</h3>
          <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400">
            {drugData.class}
          </span>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-slate-300">
            <span className="text-slate-400">Brand Names:</span> {drugData.brandNames.join(', ')}
          </div>
          <div className="text-sm text-slate-300">
            <span className="text-slate-400">Indications:</span> {drugData.indications}
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-4">Composition</h3>
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {drugData.composition.map((component, index) => (
          <div
            key={index}
            className="bg-slate-700/30 rounded-xl p-4 transition-all duration-300 hover:transform hover:scale-[1.02] animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-white">{component.name}</p>
                <p className="text-xs text-slate-400">{component.role}</p>
              </div>
              <div className="text-sm font-medium text-emerald-400">{component.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrugComposition;