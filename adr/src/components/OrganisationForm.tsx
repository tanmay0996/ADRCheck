import React from 'react';
import { X } from 'lucide-react';

interface OrganisationFormProps {
  onClose: () => void;
}

export function OrganisationForm({ onClose }: OrganisationFormProps) {
  return (
    <>
      {/* Hide scrollbar styling */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center pt-20 z-50">
        <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative shadow-2xl overflow-y-auto max-h-[80vh] no-scrollbar">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-white">Organisation Form</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <input
                type="text"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Organisation Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
              <input
                type="text"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Organisation Address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Organisation Email"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
