import React from 'react';

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
    <div className="bg-[#0A0A0A] border border-[#666666]/20 rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">FDA Reports</h2>
        <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
      </div>
      <div className="space-y-4">
        {reports.map((report, index) => (
          <div
            key={index}
            className="border border-[#666666]/20 rounded-lg p-3 hover:bg-[#666666]/5 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{report.title}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  report.status === 'Urgent'
                    ? 'bg-red-500/10 text-red-400'
                    : report.status === 'Under Review'
                    ? 'bg-yellow-500/10 text-yellow-400'
                    : 'bg-green-500/10 text-green-400'
                }`}
              >
                {report.status}
              </span>
            </div>
            <div className="text-sm text-[#666666] mb-2">
              {report.id} • {report.date}
            </div>
            <p className="text-sm">{report.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FDAReports;
