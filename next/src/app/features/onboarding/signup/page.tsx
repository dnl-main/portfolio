// "use client";

// import React, { useState, ChangeEvent, FormEvent } from "react";
// import Link from "next/link";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL; // http://localhost:8000/api
// const baseUrl = apiUrl?.replace("/api", "");   // http://localhost:8000

// // --------------------
// // Types
// // --------------------
// interface SignupFormData {
//   email: string;
//   password: string;
// }

// interface StatusState {
//   type: "success" | "error" | "";
//   message: string;
// }

// // --------------------
// // Helpers
// // --------------------
// const getCookie = (name: string): string | null => {
//   if (typeof document === "undefined") return null;
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     return decodeURIComponent(parts.pop()?.split(";").shift() || "");
//   }
//   return null;
// };

// // --------------------
// // Component
// // --------------------
// export default function SignupApp() {
//   const [formData, setFormData] = useState<SignupFormData>({
//     email: "",
//     password: "",
//   });

//   const [status, setStatus] = useState<StatusState>({
//     type: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState<boolean>(false);

//   // --------------------
//   // Handlers
//   // --------------------
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatus({ type: "", message: "" });

//     try {
//       // 1️⃣ Initialize CSRF cookie (REQUIRED by Sanctum)
//       await fetch(`${baseUrl}/sanctum/csrf-cookie`, {
//         method: "GET",
//         credentials: "include",
//       });

//       // 2️⃣ Extract CSRF token from cookie
//       const xsrfToken = getCookie("XSRF-TOKEN");

//       // 3️⃣ Send signup request
//       const response = await fetch(`${apiUrl}/signup`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "X-XSRF-TOKEN": xsrfToken || "",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatus({
//           type: "success",
//           message: "Account created successfully!",
//         });
//         setFormData({ email: "", password: "" });
//       } else {
//         const errorMessage = data?.errors
//           ? (Object.values(data.errors).flat()[0] as string)
//           : data?.message || "Something went wrong";

//         setStatus({ type: "error", message: errorMessage });
//       }
//     } catch (error) {
//       console.error("Signup Error:", error);
//       setStatus({
//         type: "error",
//         message: "Could not connect to the server.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --------------------
//   // UI
//   // --------------------
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Sign Up
//         </h1>

//         {status.message && (
//           <div
//             className={`p-3 mb-4 rounded text-sm font-medium ${
//               status.type === "success"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {status.message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-semibold text-gray-600">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="name@company.com"
//               className="border p-2 rounded text-black focus:ring-2 focus:ring-green-500 outline-none"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               autoComplete="email"
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-semibold text-gray-600">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               placeholder="••••••••"
//               className="border p-2 rounded text-black focus:ring-2 focus:ring-green-500 outline-none"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               autoComplete="new-password"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`p-2 mt-2 rounded text-white font-bold transition-colors ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700"
//             }`}
//           >
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-500">
//           Already have an account?{" "}
//           <Link
//             href="/features/onboarding/login"
//             className="text-blue-600 font-semibold hover:underline"
//           >
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // http://localhost:8000/api
const baseUrl = apiUrl?.replace("/api", "");   // http://localhost:8000

// --------------------
// Types
// --------------------
interface SignupFormData {
  email: string;
  password: string;
}

interface StatusState {
  type: "success" | "error" | "";
  message: string;
}

// --------------------
// Helpers
// --------------------
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(";").shift() || "");
  }
  return null;
};

// --------------------
// Component
// --------------------
export default function SignupApp() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState<StatusState>({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  // --------------------
  // Speed Optimization: Pre-fetch CSRF
  // --------------------
  useEffect(() => {
    const initializeCsrf = async () => {
      try {
        // Only fetch if the cookie isn't already present to save a request
        if (!document.cookie.includes("XSRF-TOKEN")) {
          await fetch(`${baseUrl}/sanctum/csrf-cookie`, {
            method: "GET",
            credentials: "include",
          });
        }
      } catch (err) {
        console.error("Initial CSRF fetch failed:", err);
      }
    };
    initializeCsrf();
  }, [baseUrl]);

  // --------------------
  // Handlers
  // --------------------
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // 1️⃣ Extract CSRF token (Should already be there thanks to useEffect)
      let xsrfToken = getCookie("XSRF-TOKEN");

      // Fallback: If for some reason the token isn't there yet, fetch it now
      if (!xsrfToken) {
        await fetch(`${baseUrl}/sanctum/csrf-cookie`, {
          method: "GET",
          credentials: "include",
        });
        xsrfToken = getCookie("XSRF-TOKEN");
      }

      // 2️⃣ Send signup request
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfToken || "",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Account created successfully!",
        });
        setFormData({ email: "", password: "" });
      } else {
        const errorMessage = data?.errors
          ? (Object.values(data.errors).flat()[0] as string)
          : data?.message || "Something went wrong";

        setStatus({ type: "error", message: errorMessage });
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setStatus({
        type: "error",
        message: "Could not connect to the server.",
      });
    } finally {
      setLoading(false);
    }
  };

  // --------------------
  // UI
  // --------------------
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h1>

        {status.message && (
          <div
            className={`p-3 mb-4 rounded text-sm font-medium ${
              status.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              className="border p-2 rounded text-black focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="border p-2 rounded text-black focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`p-2 mt-2 rounded text-white font-bold transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/features/onboarding/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}