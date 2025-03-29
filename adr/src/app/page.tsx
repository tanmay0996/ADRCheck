"use client";
import React, { useState, useEffect } from 'react';
import {
  Beaker,
  FileText,
  Users,
  MessageCircle,
  Pill
} from 'lucide-react';
// import { GuestButton } from './GuestButton'; // Importing the Guest Button component
import { GuestButton } from '@/components/GuestButton';

/* Enhanced SplashScreen Component with Blinking Animation */
function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 transition-all duration-500">
      <div className="flex items-center space-x-4">
        <Pill size={56} className="text-blue-400 animate-blink" />
        <h1 className="text-7xl font-extrabold text-white tracking-wide animate-blink">
          Medify
        </h1>
      </div>
    </div>
  );
}

/* FeatureCard Component */
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
    <div className={`bg-gray-900 rounded-xl p-6 shadow-xl border-t-4 ${accentColor} transition-transform hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
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

/* LandingPg Component (Main Landing Page) */
function LandingPg() {
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

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Pill className="text-blue-400" size={32} />
              <span className="text-xl font-bold">Medify</span>
            </div>
            <div className="flex space-x-4">
              <GuestButton /> {/* GuestButton imported above */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Organisation
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Drug Information Dashboard</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive insights into drug composition, regulatory status, patient outcomes, and social engagement.
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
    </div>
  );
}

/* HomePage Component integrating SplashScreen and LandingPg */
export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // Display splash screen for 4 seconds
    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <SplashScreen /> : <LandingPg />;
}
