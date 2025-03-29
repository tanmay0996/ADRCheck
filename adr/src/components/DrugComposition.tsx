import React from 'react';

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
    <div className="bg-[#0A0A0A] border border-[#666666]/20 rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Drug Composition</h2>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-xs">FDA Approved</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <h3 className="text-lg font-bold text-blue-400">{drugData.name}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
            {drugData.class}
          </span>
        </div>
        <div className="text-sm text-[#666666] mb-2">
          <span className="text-white">Brand Names:</span> {drugData.brandNames.join(', ')}
        </div>
        <div className="text-sm text-[#666666]">
          <span className="text-white">Indications:</span> {drugData.indications}
        </div>
      </div>

      <h3 className="font-medium mb-3">Composition</h3>
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {drugData.composition.map((component, index) => (
          <div
            key={index}
            className="border border-[#666666]/20 rounded-lg p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{component.name}</p>
              <p className="text-xs text-[#666666]">{component.role}</p>
            </div>
            <div className="text-sm font-medium text-blue-400">{component.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrugComposition;
