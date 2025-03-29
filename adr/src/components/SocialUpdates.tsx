import React from 'react';

interface Engagement {
  likes: number;
  shares: number;
  comments: number;
}

interface SocialUpdate {
  platform: string;
  date: string;
  content: string;
  engagement: Engagement;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface Drug {
  name: string;
}

interface SocialUpdatesProps {
  drug?: Drug;
}

const SocialUpdates: React.FC<SocialUpdatesProps> = ({ drug }) => {
  const socialUpdates: SocialUpdate[] = drug
    ? [
        {
          platform: 'Twitter',
          date: 'March 28, 2025',
          content: `Patients are reporting increased satisfaction with ${drug.name} compared to previous treatments. #PatientExperience #MedicalUpdates`,
          engagement: { likes: 245, shares: 87, comments: 32 },
          sentiment: 'positive'
        },
        {
          platform: 'Reddit',
          date: 'March 25, 2025',
          content: `Discussion thread in r/Medicine about new research on ${drug.name}'s efficacy for off-label uses. Interesting perspectives from healthcare professionals.`,
          engagement: { likes: 189, shares: 0, comments: 76 },
          sentiment: 'neutral'
        },
        {
          platform: 'Facebook',
          date: 'March 22, 2025',
          content: `Patient support group reporting concerns about insurance coverage for ${drug.name}. Multiple users struggling with high copays.`,
          engagement: { likes: 43, shares: 12, comments: 28 },
          sentiment: 'negative'
        }
      ]
    : [
        {
          platform: 'Twitter',
          date: 'March 28, 2025',
          content:
            'Breaking: FDA advisory panel unanimously recommends approval of Nexavalent for treatment-resistant depression. $BPH stock surging.',
          engagement: { likes: 1245, shares: 587, comments: 92 },
          sentiment: 'positive'
        },
        {
          platform: 'Reddit',
          date: 'March 27, 2025',
          content:
            'PharmaTimes reports generic Zaridex (Tenamizole) availability delayed until Q4 due to manufacturing issues. Patients express frustration over continued high costs.',
          engagement: { likes: 832, shares: 0, comments: 167 },
          sentiment: 'negative'
        },
        {
          platform: 'Medical Forum',
          date: 'March 26, 2025',
          content:
            "New meta-analysis questions long-term efficacy of Bromocriptine for Parkinson's disease compared to newer alternatives.",
          engagement: { likes: 345, shares: 78, comments: 42 },
          sentiment: 'neutral'
        },
        {
          platform: 'Facebook',
          date: 'March 25, 2025',
          content:
            'Patient advocacy group launches campaign for expanded access to Rivotrexate for rare autoimmune conditions. Over 5,000 signatures collected.',
          engagement: { likes: 2437, shares: 1893, comments: 256 },
          sentiment: 'positive'
        }
      ];

  return (
    <div className="bg-[#0A0A0A] border border-[#666666]/20 rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Social Media Updates</h2>
        <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
      </div>

      <div className="space-y-4">
        {socialUpdates.map((update, index) => (
          <div
            key={index}
            className="border border-[#666666]/20 rounded-lg p-3 hover:bg-[#666666]/5 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    update.sentiment === 'positive'
                      ? 'bg-green-500'
                      : update.sentiment === 'negative'
                      ? 'bg-red-500'
                      : 'bg-yellow-500'
                  }`}
                ></div>
                <span className="font-medium">{update.platform}</span>
              </div>
              <span className="text-xs text-[#666666]">{update.date}</span>
            </div>
            <p className="text-sm mb-3">{update.content}</p>
            <div className="flex space-x-4 text-xs text-[#666666]">
              <span>👍 {update.engagement.likes}</span>
              <span>💬 {update.engagement.comments}</span>
              <span>🔄 {update.engagement.shares}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialUpdates;
