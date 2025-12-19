// src/components/AppointmentForm.jsx
'use client';

import { useState, useEffect } from 'react';

const AppointmentForm = ({
  user,
  initialData = null,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [time, setTime] = useState(initialData?.time || '');

  // Reset form when initialData changes (e.g., switching from create to edit)
  useEffect(() => {
    setTitle(initialData?.title || '');
    setDate(initialData?.date || '');
    setTime(initialData?.time || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    const appointmentData = {
      title,
      date,
      time,
      user: initialData?.user || user, // Preserve user for update, or set for create
    };

    onSave(appointmentData);

    // Reset form for creation mode after successful save
    if (!initialData) {
      setTitle('');
      setDate('');
      setTime('');
    }
  };

  return (
    <div className="p-4 bg-white shadow-xl rounded-lg mb-6">
      <h3 className="text-xl font-bold mb-4 text-indigo-700">
        {initialData ? 'Edit Appointment' : 'Schedule New Appointment'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Appointment Title"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-md"
          >
            {initialData ? 'Update' : 'Create'} Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;