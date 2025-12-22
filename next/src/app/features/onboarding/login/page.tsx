"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Added for redirection
import { useQueryClient } from "@tanstack/react-query";

/**
 * Helper to extract a cookie value by name from document.cookie
 */
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(";").shift() || "");
  return null;
};

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const baseUrl = apiUrl?.replace('/api', '');

  /**
   * 1. INITIALIZATION
   * - Checks localStorage for a remembered email
   * - Pre-fetches CSRF cookie for speed
   */
  useEffect(() => {
    const savedEmail = localStorage.getItem("remembered_client_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    const initCsrf = async () => {
      try {
        if (!document.cookie.includes("XSRF-TOKEN")) {
          await fetch(`${baseUrl}/sanctum/csrf-cookie`, { credentials: "include" });
        }
      } catch (e) { 
        console.error("CSRF Init failed", e); 
      }
    };
    initCsrf();
  }, [baseUrl]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // 2. ATTEMPT LOGIN
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") || "",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", 
      });

      const data = await response.json();

      if (response.ok) {
        // 3. REMEMBER ME LOGIC
        if (rememberMe) {
          localStorage.setItem("remembered_client_email", email);
        } else {
          localStorage.removeItem("remembered_client_email");
        }

        // 4. UPDATE GLOBAL STATE (TanStack Cache)
        queryClient.setQueryData(["account"], data.account);
        
        // 5. SUCCESS & REDIRECT
        setStatus({ type: "success", message: "Login successful!" });
        
        const role = data.account.role;
        const routes: Record<string, string> = {
          admin: "/features/pages/admin/home",
          user: "/features/pages/user/home",
          superadmin: "/features/pages/superadmin/home",
        };

        router.push(routes[role] || "/");
        
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
         <h1 className="text-2xl font-bold mb-6 text-center text-black">Sign In</h1>

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
              className="border p-2 rounded text-black focus:outline-blue-500 transition-all"
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
              className="border p-2 rounded text-black focus:outline-blue-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="rememberMe"
              className="w-4 h-4 cursor-pointer"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label 
              htmlFor="rememberMe" 
              className="text-sm text-gray-600 cursor-pointer select-none"
            >
              Remember my email
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 p-2 rounded text-white font-bold transition-all ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Redirect to Signup */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link 
            href="/features/onboarding/signup" 
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
      
      <p className="mt-4 text-xs text-gray-400 italic text-center">
        Authentication connected to <br/> 
        <span className="font-mono text-blue-500">{apiUrl}</span>
      </p>
    </div>
  );
}