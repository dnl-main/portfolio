"use client";

import Link from "next/link";

export default function SuperadminHome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        {/* <h1 className="text-2xl font-bold mb-4 text-red-600">Access Denied</h1> */}
        <p className="mb-6 text-gray-700">
          superadmin
        </p>
      </div>
    </div>
  );
}
