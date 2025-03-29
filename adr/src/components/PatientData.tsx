import React from 'react';
import { Users, Activity, Clock, ThumbsUp, AlertCircle, Heart } from 'lucide-react';

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
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-slate-600 animate-scale-in">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">Search for a medication to view patient data</p>
          <div className="inline-block p-4 rounded-full bg-slate-700/30">
            <Users className="h-8 w-8 text-slate-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-slate-600 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Activity className="h-6 w-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Patient Data
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full">
          <Users className="h-5 w-5 text-blue-400" />
          <span className="text-blue-400 font-bold">{patientData.totalPatients.toLocaleString()}</span>
          <span className="text-slate-400">patients</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-700/30 rounded-xl p-4 transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-emerald-400" />
            <p className="text-slate-400">Average Age</p>
          </div>
          <p className="text-3xl font-bold text-white">{patientData.avgAge}</p>
        </div>
        <div className="bg-slate-700/30 rounded-xl p-4 transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center gap-2 mb-2">
            <ThumbsUp className="h-4 w-4 text-purple-400" />
            <p className="text-slate-400">Adherence Rate</p>
          </div>
          <p className="text-3xl font-bold text-white">{patientData.adherenceRate}%</p>
        </div>
        <div className="bg-slate-700/30 rounded-xl p-4 transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-rose-400" />
            <p className="text-slate-400">Effectiveness</p>
          </div>
          <p className="text-3xl font-bold text-white">{patientData.effectivenessRating}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Gender Distribution</h3>
        <div className="h-4 rounded-full bg-slate-700/30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 progress-bar transition-all duration-300"
            style={{ '--target-width': `${patientData.genderDistribution.male}%` } as React.CSSProperties}
          ></div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-blue-400">Male: {patientData.genderDistribution.male}%</span>
          <span className="text-purple-400">Female: {patientData.genderDistribution.female}%</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-rose-400" />
          <h3 className="text-lg font-semibold text-white">Common Side Effects</h3>
        </div>
        <div className="space-y-4">
          {patientData.commonSideEffects.map((effect, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">{effect.name}</span>
                <span className="text-slate-400">{effect.percentage}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-700/30 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-rose-400 progress-bar transition-all duration-300 hover:from-rose-400 hover:to-rose-300"
                  style={{ '--target-width': `${effect.percentage * 5}%` } as React.CSSProperties}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientData;