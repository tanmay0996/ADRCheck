import React, { useState } from 'react';
// import { GuestPatientForm } from './GuestPatientForm';
import { GuestPatientForm } from './GuestPatientForm';

export function GuestButton() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Guest
      </button>
      {showForm && <GuestPatientForm onClose={() => setShowForm(false)} />}
    </>
  );
}
