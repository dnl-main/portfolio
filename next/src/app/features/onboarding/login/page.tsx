"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Helper to extract a cookie value by name from document.cookie
 */
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(";").shift() || "");
  }
  return null;
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // e.g., http://localhost:8000/api
  const baseUrl = apiUrl?.replace('/api', '');   // e.g., http://localhost:8000

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // 1. INITIALIZE CSRF PROTECTION
      // Tells Laravel to set the XSRF-TOKEN cookie in the browser
      await fetch(`${baseUrl}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include", 
      });

      // 2. EXTRACT TOKEN
      // Laravel requires the XSRF-TOKEN cookie value to be sent back in a header
      const xsrfToken = getCookie("XSRF-TOKEN");

      // 3. ATTEMPT LOGIN
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json",
          "X-XSRF-TOKEN": xsrfToken || "", // Fixes the 419 error
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", 
      });

      const data = await response.json();

      if (response.ok) {
        // 4. STORE USER DATA
        sessionStorage.setItem("user", JSON.stringify(data.user));

        setStatus({ type: "success", message: "Login successful!" });
        
        // 5. REDIRECT BASED ON ROLE
        const role = data.user.role;
        if (role === "admin") router.push("/features/pages/admin/home");
        else if (role === "user") router.push("/features/pages/user/home");
        else if (role === "superadmin") router.push("/features/pages/superadmin/home");
        else router.push("/"); 
        
      } else {
        setStatus({ 
          type: "error", 
          message: data.message || "Invalid credentials." 
        });
      }
    } catch (err) {
      console.error("Login Error:", err);
      setStatus({ type: "error", message: "Could not connect to the server." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Login</h1>

        {status.message && (
          <div
            className={`p-3 mb-4 rounded text-sm font-medium ${
              status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="border p-2 rounded text-black focus:outline-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="border p-2 rounded text-black focus:outline-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 p-2 rounded text-white font-bold transition-colors ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
      
      <p className="mt-4 text-xs text-gray-400 italic text-center">
        Real authentication connected to <br/> 
        <span className="font-mono text-blue-500">{apiUrl}</span>
      </p>
    </div>
  );
}