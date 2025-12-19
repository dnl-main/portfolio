// src/utils/data.js

/**
 * A simple in-memory "database" object.
 * An array of appointments, each with an ID, user (for ownership), and details.
 */
let appointments = [
  {
    id: 'a1',
    user: 'dave', // This is the 'user' who created it
    title: 'Initial Checkup',
    date: '2024-10-25',
    time: '10:00',
  },
  {
    id: 'a2',
    user: 'admin', // The admin could also have appointments
    title: 'Team Meeting Prep',
    date: '2024-10-26',
    time: '14:30',
  },
];

/**
 * Generates a simple unique ID. In a real app, you'd use a library like UUID.
 * @returns {string}
 */
const generateId = () => Math.random().toString(36).substr(2, 9);

/**
 * --- CRUD FUNCTIONS ---
 */

export const getAllAppointments = () => {
  // Returns a copy to prevent external direct modification of the original array
  return [...appointments];
};

export const getAppointmentsByUser = (username) => {
  return appointments.filter(app => app.user === username);
};

export const createAppointment = (newAppointment) => {
  const appointment = {
    id: generateId(),
    // Assume the incoming object already has a 'user' field set
    ...newAppointment,
  };
  appointments.push(appointment);
  return appointment;
};

export const updateAppointment = (id, updatedFields) => {
  const index = appointments.findIndex(app => app.id === id);
  if (index !== -1) {
    // Merge the existing appointment with the updated fields
    appointments[index] = { ...appointments[index], ...updatedFields };
    return appointments[index];
  }
  return null;
};

export const deleteAppointment = (id) => {
  const initialLength = appointments.length;
  appointments = appointments.filter(app => app.id !== id);
  return appointments.length < initialLength; // Return true if deleted
};