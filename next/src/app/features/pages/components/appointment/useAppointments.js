// src/hooks/useAppointments.js
import { useState, useEffect } from 'react';
import {
  getAllAppointments,
  getAppointmentsByUser,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from './data';

/**
 * Custom hook to manage appointment state and interact with the data utility.
 * @param {'admin' | 'user'} role - Defines the role for filtering data.
 * @param {string} username - The current user's username (e.g., 'dave').
 */
export const useAppointments = (role, username) => {
  // Use a state variable to hold the appointments data
  const [appointments, setAppointments] = useState([]);

  // Function to refresh the data from the utility file and update the state
  const fetchData = () => {
    let data;
    if (role === 'admin') {
      data = getAllAppointments();
    } else {
      // For 'user' role, fetch only their appointments
      data = getAppointmentsByUser(username);
    }
    setAppointments(data);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData(); // Fetch data initially

    // 🌟 ADD POLLING: Fetch data every 5 seconds 🌟
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000); // Check for updates every 5000 milliseconds (5 seconds)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [role, username]);useEffect(() => {
    fetchData();
  }, [role, username]);

  // Wrapper functions that interact with the utility AND force a re-render
  const handleCreate = (newAppointment) => {
    createAppointment(newAppointment);
    fetchData(); // Refresh state after creation
  };

  const handleUpdate = (id, updatedFields) => {
    updateAppointment(id, updatedFields);
    fetchData(); // Refresh state after update
  };

  const handleDelete = (id) => {
    deleteAppointment(id);
    fetchData(); // Refresh state after deletion
  };

  return {
    appointments,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};