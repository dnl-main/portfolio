"use client";

import { useQuery } from "@tanstack/react-query";
import React from 'react';

// Define the structure of the data expected from the Laravel backend
type User = {
  id: number;
  name: string;      // Note: This likely combines first_name and last_name in the backend query
  email: string;
  created_at: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Function to fetch the user data from the backend API endpoint.
 */
const fetchUsers = async (): Promise<User[]> => {
  if (!apiUrl) {
    throw new Error("Configuration Error: NEXT_PUBLIC_API_URL is missing.");
  }
  
  // This is the key connection point: fetching the data from the Laravel API
  const res = await fetch(`${apiUrl}/users`); 
  
  if (!res.ok) {
    // Better error message including status code
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }
  return res.json();
};


export default function HeroApp() {
  
  // Use the useQuery hook to manage fetching and caching state
  const { 
    data: users, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ["usersData"], 
    queryFn: fetchUsers,     
  });

  // --- 1. Loading State ---
  if (isLoading) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Users List test</h1>
        <p>Loading users... ⏳</p>
      </main>
    );
  }

  // --- 2. Error State ---
  if (isError) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Users List</h1>
        <p style={{ color: 'red', border: '1px dashed red', padding: '10px' }}>
          ❌ Error fetching data from backend: {errorMessage}
        </p>
      </main>
    );
  }

  // --- 3. Success and Display State ---
  const hasUsers = users && users.length > 0;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Users List ({users?.length || 0} Total)</h1>

      {!hasUsers && <p style={{ color: '#ffa500' }}>⚠️ No users found in the database.</p>}

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {users?.map(user => (
          <div 
            key={user.id} 
            style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}
          >
            {/* Displaying fetched data */}
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{user.name}</div>
            <div style={{ color: '#007bff' }}>{user.email}</div>
            
            <div style={{ fontSize: "0.8rem", color: "#555", marginTop: '0.5rem' }}>
              Joined: {new Date(user.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}