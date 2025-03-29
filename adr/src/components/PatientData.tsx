import React from 'react';
import { Users } from 'lucide-react';

interface PatientDataProps {
  drug?: any;
}

const PatientData: React.FC<PatientDataProps> = ({ drug }) => {
  const patientData = drug
    ? {
        totalPatients: 12845,
        avgAge: 64,
        genderDistribution: { male: 42, female: 58 },
        commonSideEffects: [
          { name: 'Muscle Pain', percentage: 12 },
          { name: 'Headache', percentage: 8 },
          { name: 'Dizziness', percentage: 6 },
          { name: 'Nausea', percentage: 5 },
          { name: 'Fatigue', percentage: 4 }
        ],
        adherenceRate: 76,
        averageRating: 3.8,
        effectivenessRating: 4.2
      }
    : null;

  if (!patientData) {
    return (
      <div className="bg-[#0A0A0A] border border-[#666666]/20 rounded-xl p-5 shadow-sm flex items-center justify-center h-80">
        <div className="text-center">
          <p className="text-[#666666] mb-2">Search for a medication to view patient data</p>
          <div className="inline-block p-2 rounded-full bg-[#666666]/10">
            <Users className="h-6 w-6 text-[#666666]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] border border-[#666666]/20 rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Patient Data</h2>
        <div className="text-sm">
          <span className="text-blue-400 font-bold">{patientData.totalPatients.toLocaleString()}</span>{' '}
          patients
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border border-[#666666]/20 rounded-lg p-3">
          <p className="text-sm text-[#666666] mb-1">Average Age</p>
          <p className="text-xl font-bold">{patientData.avgAge}</p>
        </div>
        <div className="border border-[#666666]/20 rounded-lg p-3">
          <p className="text-sm text-[#666666] mb-1">Adherence Rate</p>
          <p className="text-xl font-bold">{patientData.adherenceRate}%</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-medium mb-2">Gender Distribution</p>
        <div className="h-4 rounded-full bg-[#666666]/20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
            style={{ width: `${patientData.genderDistribution.male}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-[#666666] mt-1">
          <span>Male: {patientData.genderDistribution.male}%</span>
          <span>Female: {patientData.genderDistribution.female}%</span>
        </div>
      </div>

      <div>
        <p className="font-medium mb-2">Common Side Effects</p>
        <div className="space-y-2">
          {patientData.commonSideEffects.map((effect: { name: string; percentage: number }, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <p className="text-sm w-24">{effect.name}</p>
              <div className="flex-1 h-2 rounded-full bg-[#666666]/20 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-400"
                  style={{ width: `${effect.percentage * 5}%` }}
                ></div>
              </div>
              <p className="text-xs text-[#666666] w-8 text-right">{effect.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientData;
