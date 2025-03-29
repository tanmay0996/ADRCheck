import React from 'react';
import { MessageSquare, Share2, ThumbsUp, Twitter, Facebook, MessageCircle, ArrowUpRight } from 'lucide-react';

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

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-slate-600 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <MessageSquare className="h-6 w-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Social Updates
          </h2>
        </div>
        <button className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
          View All
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {socialUpdates.map((update, index) => (
          <div
            key={index}
            className="bg-slate-700/30 rounded-xl p-4 transition-all duration-300 hover:transform hover:scale-[1.02] animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div
                  className={`p-1.5 rounded-lg ${
                    update.sentiment === 'positive'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : update.sentiment === 'negative'
                      ? 'bg-rose-500/10 text-rose-400'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {getPlatformIcon(update.platform)}
                </div>
                <span className="font-medium text-white">{update.platform}</span>
              </div>
              <span className="text-xs text-slate-400">{update.date}</span>
            </div>
            <p className="text-sm text-slate-300 mb-3 leading-relaxed">{update.content}</p>
            <div className="flex gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>{update.engagement.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{update.engagement.comments}</span>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-3.5 w-3.5" />
                <span>{update.engagement.shares}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialUpdates;