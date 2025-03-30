"use client"
import { useState } from 'react';
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
  ChevronUp,
  Clock,
  XCircle
} from 'lucide-react';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.join(' ').length > 200;

  return (
    <div className={`space-y-2 text-gray-300 ${className}`}>
      {shouldTruncate && !isExpanded ? (
        <>
          <p className="text-sm">
            {text[0].slice(0, 200)}...
          </p>
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors text-sm mt-2"
          >
            <span>Show More</span>
            <ChevronDown size={16} />
          </button>
        </>
      ) : (
        <>
          {text.map((item, idx) => (
            <p key={idx} className="text-sm">{item}</p>
          ))}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(false)}
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors text-sm mt-2"
            >
              <span>Show Less</span>
              <ChevronUp size={16} />
            </button>
          )}
        </>
      )}
    </div>
  );
}

function App() {
  const [drug, setDrug] = useState('');
  const [reports, setReports] = useState<FDAResult[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFDAReport = async () => {
    if (!drug) return;
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

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-center space-x-3">
            <AlertCircle className="text-red-400" size={24} />
            <p className="text-red-400">{error}</p>
          </div>
        )}

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
      </div>
    </div>
  );
}

export default App;