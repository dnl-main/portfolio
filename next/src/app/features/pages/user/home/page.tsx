// src/app/features/pages/user/home/page.jsx
'use client';

import { useState } from 'react';
import { useAppointments } from '../../components/appointment/useAppointments';
import AppointmentForm from '../../components/appointment/AppointmentForm';

// Hardcoding the current user for simplicity as requested
const CURRENT_USER = 'dave'; 

export default function HomeUser() {
  const { appointments, handleCreate, handleUpdate, handleDelete } =
    useAppointments('user', CURRENT_USER);

  const [editingAppt, setEditingAppt] = useState(null);

  const handleCreateAppointment = (data) => {
    // The hook will handle the re-render for both dashboards
    handleCreate({ ...data, user: CURRENT_USER });
  };

  const handleUpdateAppointment = (data) => {
    // Only update if we are editing
    if (editingAppt) {
      handleUpdate(editingAppt.id, data);
      setEditingAppt(null); // Close the edit form
    }
  };

  // Helper component to render an appointment card
  const AppointmentCard = ({ appt }) => (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition bg-white flex justify-between items-center">
      <div>
        <h4 className="text-lg font-semibold text-gray-800">{appt.title}</h4>
        <p className="text-sm text-gray-500">
          {appt.date} at {appt.time}
        </p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => setEditingAppt(appt)}
          className="px-3 py-1 text-sm text-white bg-indigo-500 rounded hover:bg-indigo-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(appt.id)}
          className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-2">
          👋 User Dashboard ({CURRENT_USER})
        </h1>

        {/* CREATE/EDIT APPOINTMENT FORM */}
        <AppointmentForm
          user={CURRENT_USER}
          initialData={editingAppt}
          onSave={editingAppt ? handleUpdateAppointment : handleCreateAppointment}
          onCancel={() => setEditingAppt(null)}
        />

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Appointments ({appointments.length})</h2>

        {/* APPOINTMENTS LIST */}
        <div className="space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <AppointmentCard key={appt.id} appt={appt} />
            ))
          ) : (
            <p className="text-gray-500 italic">You have no scheduled appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
}