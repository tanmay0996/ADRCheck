'use client';

import { useState } from 'react';
import { Tag, FileText, Building, Info, AlertCircle, XCircle, Clock } from 'lucide-react';

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

const FDAReports2 = () => {
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-red-500">FDA Drug Report</h2>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter drug name (e.g., Aspirin)"
          value={drug}
          onChange={(e) => setDrug(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
        <button
          onClick={fetchFDAReport}
          className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          {loading ? 'Loading...' : 'Fetch Report'}
        </button>
      </div>
      {error && (
        <div className="mb-4 text-center text-red-600 font-medium">
          Error: {error}
        </div>
      )}
      {reports.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {reports.map((report, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-red-500 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  {report.openfda?.brand_name
                    ? report.openfda.brand_name.join(', ')
                    : 'Unknown Brand'}
                </h3>
                <p className="text-gray-600 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <strong>Generic Name:</strong>{' '}
                  {report.openfda?.generic_name
                    ? report.openfda.generic_name.join(', ')
                    : 'N/A'}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <strong>Manufacturer:</strong>{' '}
                  {report.openfda?.manufacturer_name
                    ? report.openfda.manufacturer_name.join(', ')
                    : 'N/A'}
                </p>
              </div>
              {report.indications_and_usage && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Info className="w-5 h-5" />
                    <strong>Indications and Usage:</strong>
                  </div>
                  <ul className="mt-1 list-disc list-inside text-gray-600">
                    {report.indications_and_usage.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {report.warnings && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <AlertCircle className="w-5 h-5" />
                    <strong>Warnings:</strong>
                  </div>
                  <ul className="mt-1 list-disc list-inside text-gray-600">
                    {report.warnings.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {report.adverse_reactions && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <XCircle className="w-5 h-5" />
                    <strong>Adverse Reactions:</strong>
                  </div>
                  <ul className="mt-1 list-disc list-inside text-gray-600">
                    {report.adverse_reactions.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {report.dosage_and_administration && (
                <div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-5 h-5" />
                    <strong>Dosage and Administration:</strong>
                  </div>
                  <ul className="mt-1 list-disc list-inside text-gray-600">
                    {report.dosage_and_administration.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FDAReports2;
