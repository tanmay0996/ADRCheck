import React, { useState } from 'react';
import { 
  X, 
  User, 
  FileText, 
  Calendar, 
  Pill, 
  Stethoscope, 
  Heart, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle 
} from 'lucide-react';

interface GuestPatientFormProps {
  onClose: () => void;
  hospitalId: string; // hospitalId comes dynamically via props
}

export function GuestPatientForm({ onClose, hospitalId }: GuestPatientFormProps) {
  const [expandedSections, setExpandedSections] = useState({
    medications: false,
    symptoms: false,
    conditions: false,
  });
  
  // Controlled field states
  const [patientId, setPatientId] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  
  // Field-specific errors
  const [fieldErrors, setFieldErrors] = useState<{
    patientId?: string;
    fullName?: string;
    age?: string;
  }>({});
  
  // General response or error message
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const medicationLabels = [
    'started',
    'began',
    'prescribed',
    'initiated',
    'stopped',
    'discontinued',
    'withdrew',
    'cessation of',
    'after',
    'following',
    'subsequent to',
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setResponseData(null);
    setFieldErrors({});

    // Validate each field individually
    const errors: { patientId?: string; fullName?: string; age?: string } = {};
    if (!patientId.trim()) {
      errors.patientId = 'Please enter a Patient ID.';
    }
    if (!fullName.trim()) {
      errors.fullName = 'Please enter a Full Name.';
    }
    if (!age.trim()) {
      errors.age = 'Please enter the Age.';
    } else if (isNaN(Number(age)) || Number(age) <= 0) {
      errors.age = 'Age must be a valid positive number.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    // Build the data payload
    const payload = {
      patientId,
      fullName,
      age: Number(age),
    };

    try {
      // Using dynamic hospitalId in the URL.
      const res = await fetch(`/api/hospitals/${hospitalId}/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message ||
          `Request failed with status ${res.status}`
        );
      }

      const data = await res.json();
      setResponseData(data);
    } catch (err: any) {
      console.error('Error during form submission:', err);
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center min-h-screen z-50 overflow-y-auto">
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

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div className="space-y-4">
            {/* Controlled Patient ID Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="patientId"
                className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 border border-gray-700 hover:border-gray-600"
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
              {fieldErrors.patientId && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.patientId}</p>
              )}
            </div>

            {/* Controlled Full Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="fullName"
                className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 border border-gray-700 hover:border-gray-600"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {fieldErrors.fullName && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.fullName}</p>
              )}
            </div>

            {/* Controlled Age Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="number"
                name="age"
                className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 border border-gray-700 hover:border-gray-600"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              {fieldErrors.age && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.age}</p>
              )}
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
                {medicationLabels.map(label => (
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

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {responseData && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl text-white font-bold mb-2">Response Data</h3>
            <pre className="text-white text-sm">{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
