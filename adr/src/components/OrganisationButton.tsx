import React, { useState } from 'react';
// import { OrganisationForm } from './OrganisationForm';
import { OrganisationForm } from './OrganisationForm';

export function OrganisationButton() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Organisation
      </button>
      {showForm && <OrganisationForm onClose={() => setShowForm(false)} />}
    </>
  );
}
