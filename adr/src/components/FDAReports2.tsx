"use client";
import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  AlertCircle, 
  Package, 
  Factory, 
  Stethoscope, 
  ShieldAlert, 
  Activity, 
  Timer,
  ChevronDown,
  Clock,
  XCircle,
  X,
  Heart
} from 'lucide-react';

// --------------------- PatientData Component ---------------------
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
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:border-slate-600 animate-scale-in my-8">
        <div className="text-center">
          <p className="text-slate-400 text-base mb-4">Search for a medication to view patient data</p>
          <div className="inline-block p-2 rounded-full bg-slate-700/30">
            <Pill className="h-6 w-6 text-slate-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:border-slate-600 animate-fade-in my-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-blue-500/10">
            <Activity className="h-5 w-5 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Patient Data
          </h2>
        </div>
        <div className="flex items-center gap-1 bg-blue-500/10 px-3 py-1 rounded-full">
          <Pill className="h-4 w-4 text-blue-400" />
          <span className="text-blue-400 font-bold">{patientData.totalPatients.toLocaleString()}</span>
          <span className="text-slate-400 text-xs">patients</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-slate-700/30 rounded-xl p-3 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="h-3 w-3 text-emerald-400" />
            <p className="text-slate-400 text-xs">Average Age</p>
          </div>
          <p className="text-xl font-bold text-white">{patientData.avgAge}</p>
        </div>
        <div className="bg-slate-700/30 rounded-xl p-3 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-1 mb-1">
            <Stethoscope className="h-3 w-3 text-purple-400" />
            <p className="text-slate-400 text-xs">Adherence Rate</p>
          </div>
          <p className="text-xl font-bold text-white">{patientData.adherenceRate}%</p>
        </div>
        <div className="bg-slate-700/30 rounded-xl p-3 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-1 mb-1">
            <Heart className="h-3 w-3 text-rose-400" />
            <p className="text-slate-400 text-xs">Effectiveness</p>
          </div>
          <p className="text-xl font-bold text-white">{patientData.effectivenessRating}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-base font-semibold text-white mb-2">Gender Distribution</h3>
        <div className="h-3 rounded-full bg-slate-700/30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
            style={{ width: `${patientData.genderDistribution.male}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-blue-400">Male: {patientData.genderDistribution.male}%</span>
          <span className="text-purple-400">Female: {patientData.genderDistribution.female}%</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1 mb-2">
          <AlertCircle className="h-4 w-4 text-rose-400" />
          <h3 className="text-base font-semibold text-white">Common Side Effects</h3>
        </div>
        <div className="space-y-2">
          {patientData.commonSideEffects.map((effect, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">{effect.name}</span>
                <span className="text-slate-400">{effect.percentage}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-700/30 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-rose-400 transition-all duration-300 hover:from-rose-400 hover:to-rose-300"
                  style={{ width: `${effect.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --------------------- End PatientData Component ---------------------

// FDAResult and related interfaces
interface FDAResult {
  openfda?: {
    brand_name?: string[];
    generic_name?: string[];
    manufacturer_name?: string[];
    [key: string]: any;
  };
  indications_and_usage?: string[];
  warnings?: string[];
  adverse_reactions?: string[];
  dosage_and_administration?: string[];
  [key: string]: any;
}

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
}

function InfoCard({ title, icon, children, accentColor = "border-blue-500", className = "" }: InfoCardProps) {
  return (
    <div className={`bg-gray-900 rounded-xl p-6 shadow-xl border-t-4 ${accentColor} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface ExpandableTextProps {
  text: string[];
  className?: string;
}

function ExpandableText({ text, className = '' }: ExpandableTextProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // We'll consider text long if the joined text is over 200 characters
  const shouldTruncate = text.join(' ').length > 200;

  return (
    <div className={`space-y-2 text-gray-300 ${className}`}>
      {shouldTruncate ? (
        <>
          <p className="text-sm">
            {text[0].slice(0, 200)}...
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors text-sm mt-2"
          >
            <span>Read More</span>
            <ChevronDown size={16} />
          </button>
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Full Text</h3>
                <div className="space-y-2 text-gray-300">
                  {text.map((item, idx) => (
                    <p key={idx} className="text-sm">{item}</p>
                  ))}
                </div>
              </div>
            </Modal>
          )}
        </>
      ) : (
        text.map((item, idx) => (
          <p key={idx} className="text-sm">{item}</p>
        ))
      )}
    </div>
  );
}

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}

function App() {
  const [drug, setDrug] = useState('');
  const [reports, setReports] = useState<FDAResult[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // state to track search

  const fetchFDAReport = async () => {
    if (!drug) return;
    setSearched(true); // mark that a search has been initiated
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/fda-report?drug=${encodeURIComponent(drug)}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setReports([]);
      } else {
        setReports(data.results || []);
      }
    } catch (err) {
      setError('Error fetching FDA report');
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Pill className="text-blue-400" size={32} />
              <span className="text-xl font-bold">FDA Drug Reports</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Drug Information Search</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Access comprehensive FDA drug reports including composition, warnings, and usage guidelines.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Enter drug name (e.g., Aspirin)"
              value={drug}
              onChange={(e) => setDrug(e.target.value)}
              className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
              onKeyPress={(e) => e.key === 'Enter' && fetchFDAReport()}
            />
            <button
              onClick={fetchFDAReport}
              disabled={loading}
              className="absolute right-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Timer className="animate-spin" size={20} />
              ) : (
                <Search size={20} />
              )}
              <span>{loading ? 'Searching...' : 'Search'}</span>
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {reports.length > 0 && reports.map((report, reportIndex) => (
          <div key={reportIndex} className="mb-12 last:mb-0 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">
              Drug Report {reportIndex + 1}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Basic Info Card */}
              {report.openfda && (
                <InfoCard
                  title="Basic Information"
                  icon={<Package className="text-blue-400" size={24} />}
                  accentColor="border-blue-500"
                >
                  <div className="space-y-4">
                    {report.openfda.brand_name && (
                      <div className="flex items-start space-x-3">
                        <Package className="text-blue-400 mt-1" size={20} />
                        <div>
                          <h4 className="text-sm text-gray-400">Brand Name</h4>
                          <p className="text-white">{report.openfda.brand_name.join(', ')}</p>
                        </div>
                      </div>
                    )}
                    {report.openfda.generic_name && (
                      <div className="flex items-start space-x-3">
                        <Stethoscope className="text-green-400 mt-1" size={20} />
                        <div>
                          <h4 className="text-sm text-gray-400">Generic Name</h4>
                          <p className="text-white">{report.openfda.generic_name.join(', ')}</p>
                        </div>
                      </div>
                    )}
                    {report.openfda.manufacturer_name && (
                      <div className="flex items-start space-x-3">
                        <Factory className="text-purple-400 mt-1" size={20} />
                        <div>
                          <h4 className="text-sm text-gray-400">Manufacturer</h4>
                          <p className="text-white">{report.openfda.manufacturer_name.join(', ')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </InfoCard>
              )}

              {/* Indications Card */}
              {report.indications_and_usage && (
                <InfoCard
                  title="Indications and Usage"
                  icon={<Activity className="text-green-400" size={24} />}
                  accentColor="border-green-500"
                >
                  <ExpandableText text={report.indications_and_usage} />
                </InfoCard>
              )}

              {/* Warnings Card */}
              {report.warnings && (
                <InfoCard
                  title="Warnings"
                  icon={<ShieldAlert className="text-red-400" size={24} />}
                  accentColor="border-red-500"
                >
                  <ExpandableText text={report.warnings} />
                </InfoCard>
              )}

              {/* Adverse Reactions Card */}
              {report.adverse_reactions && (
                <InfoCard
                  title="Adverse Reactions"
                  icon={<XCircle className="text-yellow-400" size={24} />}
                  accentColor="border-yellow-500"
                >
                  <ExpandableText text={report.adverse_reactions} />
                </InfoCard>
              )}

              {/* Dosage Card */}
              {report.dosage_and_administration && (
                <InfoCard
                  title="Dosage and Administration"
                  icon={<Clock className="text-purple-400" size={24} />}
                  accentColor="border-purple-500"
                >
                  <ExpandableText text={report.dosage_and_administration} />
                </InfoCard>
              )}
            </div>
          </div>
        ))}

        {/* Render Patient Data Component only after a search */}
        {searched && (
          <div className="max-w-2xl mx-auto">
            <PatientData drug={drug} />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
