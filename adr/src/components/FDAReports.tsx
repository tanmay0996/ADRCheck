import React from 'react';
import { FileText, AlertCircle, ArrowUpRight } from 'lucide-react';

interface Drug {
  name: string;
}

interface FDAReportsProps {
  drug?: Drug;
}

interface Report {
  id: string;
  title: string;
  date: string;
  type: string;
  status: string;
  summary: string;
}

const FDAReports: React.FC<FDAReportsProps> = ({ drug }) => {
  const reports: Report[] = drug
    ? [
        {
          id: 'FDA-2023-1254',
          title: `Safety Review: ${drug.name}`,
          date: 'March 15, 2025',
          type: 'Safety Review',
          status: 'Completed',
          summary: `Regular safety review for ${drug.name} completed with no significant concerns identified. Continues to meet safety standards for approved indications.`
        },
        {
          id: 'FDA-2024-0873',
          title: `Adverse Event Analysis: ${drug.name}`,
          date: 'February 2, 2025',
          type: 'Adverse Event',
          status: 'Under Review',
          summary: `Investigating reports of rare side effects in patients taking ${drug.name} along with calcium channel blockers. Clinical significance under evaluation.`
        },
        {
          id: 'FDA-2024-1105',
          title: `Label Update: ${drug.name}`,
          date: 'January 17, 2025',
          type: 'Label Update',
          status: 'Approved',
          summary: `Updated labeling to include new drug interactions and dosage recommendations for elderly patients taking ${drug.name}.`
        }
      ]
    : [
        {
          id: 'FDA-2025-0124',
          title: 'Safety Alert: Zomipran HCl',
          date: 'March 23, 2025',
          type: 'Safety Alert',
          status: 'Urgent',
          summary: 'New safety concerns identified regarding cardiovascular risks in patients with pre-existing heart conditions.'
        },
        {
          id: 'FDA-2025-0097',
          title: 'Approval: Nevoxamet for Type II Diabetes',
          date: 'March 18, 2025',
          type: 'Approval',
          status: 'New',
          summary: 'New molecular entity approved for treatment of Type II Diabetes with favorable safety profile.'
        },
        {
          id: 'FDA-2025-0082',
          title: 'Label Update: Brantivex',
          date: 'March 10, 2025',
          type: 'Label Update',
          status: 'Complete',
          summary: 'Updated contraindications and warning about potential interactions with commonly prescribed antibiotics.'
        },
        {
          id: 'FDA-2025-0065',
          title: 'Extended Indication: Lumeridol',
          date: 'March 5, 2025',
          type: 'Indication',
          status: 'Approved',
          summary: 'Previously approved anticoagulant now indicated for prevention of stroke in patients with specific risk factors.'
        }
      ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-slate-600 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            FDA Reports
          </h2>
        </div>
        <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View All
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {reports.map((report, index) => (
          <div
            key={index}
            className="bg-slate-700/30 rounded-xl p-4 transition-all duration-300 hover:transform hover:scale-[1.02] animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className={`h-5 w-5 ${
                  report.status === 'Urgent'
                    ? 'text-rose-400'
                    : report.status === 'Under Review'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`} />
                <h3 className="font-medium text-white">{report.title}</h3>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  report.status === 'Urgent'
                    ? 'bg-rose-500/10 text-rose-400'
                    : report.status === 'Under Review'
                    ? 'bg-amber-500/10 text-amber-400'
                    : 'bg-emerald-500/10 text-emerald-400'
                }`}
              >
                {report.status}
              </span>
            </div>
            <div className="text-sm text-slate-400 mb-2">
              {report.id} • {report.date}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{report.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FDAReports;