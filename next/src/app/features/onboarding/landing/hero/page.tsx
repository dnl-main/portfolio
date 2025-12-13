"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Users List</h1>

      {users.map(user => (
        <div key={user.id} style={{ marginBottom: "1rem" }}>
          <strong>{user.name}</strong> — {user.email}
          <div style={{ fontSize: "0.8rem", color: "#555" }}>
            Joined: {new Date(user.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </main>
  );
}

