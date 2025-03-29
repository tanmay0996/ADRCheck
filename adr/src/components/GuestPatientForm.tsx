import React, { useState } from 'react';
import { X, User, Guitar as Hospital, FileText, Calendar, Pill, Stethoscope, Heart, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface GuestPatientFormProps {
  onClose: () => void;
}

export function GuestPatientForm({ onClose }: GuestPatientFormProps) {
  const [expandedSections, setExpandedSections] = useState({
    medications: false,
    symptoms: false,
    conditions: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const medicationLabels = [
    "started",
    "began",
    "prescribed",
    "initiated",
    "stopped",
    "discontinued",
    "withdrew",
    "cessation of",
    "after",
    "following",
    "subsequent to"
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-10 z-50 overflow-y-auto pb-10">
      <div className="bg-gray-900 rounded-xl p-8 w-full max-w-lg relative shadow-2xl border border-gray-800">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-500 rounded-full p-4 shadow-xl border-4 border-gray-900">
          <FileText size={32} className="text-white" />
        </div>
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-full p-2"
        >
          <X size={20} />
        </button>

        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-2 text-white text-center">Patient Information</h2>
          <p className="text-gray-400 text-center mb-8">Please fill in the patient details below</p>
        </div>

        <form className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 border border-gray-700 hover:border-gray-600"
                placeholder="Patient ID"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hospital size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 border border-gray-700 hover:border-gray-600"
                placeholder="Hospital ID"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 border border-gray-700 hover:border-gray-600"
                placeholder="Full Name"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="number"
                className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 border border-gray-700 hover:border-gray-600"
                placeholder="Age"
              />
            </div>
          </div>

          {/* Medications Section */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('medications')}
              className="w-full px-4 py-3 bg-gray-800 flex items-center justify-between text-white hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Pill size={18} className="text-blue-500" />
                <span className="font-semibold">Medications</span>
              </div>
              {expandedSections.medications ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            {expandedSections.medications && (
              <div className="p-4 space-y-3 animate-fade-in">
                {medicationLabels.map((label) => (
                  <div key={label} className="relative">
                    <input
                      type="text"
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 border border-gray-700 hover:border-gray-600"
                      placeholder={`${label} {med}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Symptoms Section */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('symptoms')}
              className="w-full px-4 py-3 bg-gray-800 flex items-center justify-between text-white hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Stethoscope size={18} className="text-rose-500" />
                <span className="font-semibold">Symptoms</span>
              </div>
              {expandedSections.symptoms ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            {expandedSections.symptoms && (
              <div className="p-4 animate-fade-in">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AlertCircle size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 border border-gray-700 hover:border-gray-600"
                    placeholder="experiencing {symptom}"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Conditions Section */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('conditions')}
              className="w-full px-4 py-3 bg-gray-800 flex items-center justify-between text-white hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Heart size={18} className="text-emerald-500" />
                <span className="font-semibold">Conditions</span>
              </div>
              {expandedSections.conditions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            {expandedSections.conditions && (
              <div className="p-4 animate-fade-in">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AlertCircle size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 border border-gray-700 hover:border-gray-600"
                    placeholder="suffering from {condition}"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6 flex items-center justify-center space-x-2"
          >
            <FileText size={18} />
            <span>Submit Patient Information</span>
          </button>
        </form>
      </div>
    </div>
  );
}