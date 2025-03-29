"use client"
import React, { useState } from 'react';
import {
  Beaker,
  FileText,
  Users,
  MessageCircle,
  Pill,
  X,
  ChevronDown
} from 'lucide-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'guest' | 'organisation' | null;
}

function SignUpModal({ isOpen, onClose, type }: SignUpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-6">
          {type === 'guest' ? 'Guest User Sign Up' : 'Organisation Sign Up'}
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />
          </div>
          {type === 'organisation' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Organization Name
              </label>
              <input
                type="text"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter organization name"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

function FeatureCard({ 
  title, 
  description, 
  icon: Icon,
  summary,
  accentColor 
}: { 
  title: string;
  description: string;
  icon: React.ElementType;
  summary: string;
  accentColor: string;
}) {
  return (
    <div className={`bg-gray-900 rounded-xl p-6 shadow-xl border-t-4 ${accentColor} transition-transform hover:scale-[1.02]`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <Icon className="text-gray-400" size={24} />
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="text-gray-300 leading-relaxed text-sm">{summary}</p>
      </div>
    </div>
  );
}

function LandingPg() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [signUpType, setSignUpType] = useState<'guest' | 'organisation' | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const features = [
    {
      title: "Drug Composition",
      description: "Detailed breakdown of active ingredients and formulation specifics",
      icon: Beaker,
      accentColor: "border-blue-500",
      summary: "Access comprehensive information about drug formulations, including active pharmaceutical ingredients, excipients, and delivery mechanisms. Stay informed about dosage forms and strength variations."
    },
    {
      title: "FDA Reports",
      description: "Latest regulatory updates and safety assessments",
      icon: FileText,
      accentColor: "border-rose-500",
      summary: "Track real-time FDA regulatory updates, including safety assessments, label changes, and compliance requirements. Monitor adverse event reports and risk evaluations to ensure patient safety."
    },
    {
      title: "Patient Data",
      description: "Comprehensive patient statistics and outcomes",
      icon: Users,
      accentColor: "border-emerald-500",
      summary: "Analyze patient demographics, treatment outcomes, and adherence patterns. Monitor side effect profiles and effectiveness across different patient populations to optimize treatment strategies."
    },
    {
      title: "Social Updates",
      description: "Real-time social media engagement and sentiment analysis",
      icon: MessageCircle,
      accentColor: "border-purple-500",
      summary: "Stay connected with patient experiences and public perception through social media monitoring. Track discussions, sentiment trends, and engagement metrics to understand market dynamics."
    }
  ];

  const handleSignUpClick = (type: 'guest' | 'organisation') => {
    setSignUpType(type);
    setIsSignUpOpen(true);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Pill className="text-blue-500" size={28} />
              <span className="text-xl font-bold">Medify</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <span>Sign Up</span>
                <ChevronDown size={16} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-10">
                  <button
                    onClick={() => handleSignUpClick('guest')}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    Guest User
                  </button>
                  <button
                    onClick={() => handleSignUpClick('organisation')}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    Organisation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Drug Information Dashboard</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive insights into drug composition, regulatory status, patient outcomes, and social engagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="mt-12 text-center text-gray-400">
          <p className="text-sm">Last updated: March 2025</p>
        </div>
      </div>

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => {
          setIsSignUpOpen(false);
          setSignUpType(null);
        }}
        type={signUpType}
      />
    </div>
  );
}

export default LandingPg;