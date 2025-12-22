"use client";

import Link from 'next/link';
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";
import LogoutButton from "@/components/LogoutButton"; // Import the new component

export default function HomeAdmin() {
  const { data: account, isLoading, isError } = useUser();
  const logoutMutation = useLogout();

  // 1. If we are currently logging out, show a clean state
  // This stops the "Unauthenticated" error from flashing on screen
  if (logoutMutation.isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 font-medium animate-pulse">Signing out...</p>
      </div>
    );
  }

  if (isLoading) return <div className="p-8 font-medium">Verifying account...</div>;

  if (isError || !account) return <div className="p-8 text-red-500">Failed to load account details.</div>;

  return (
    <div className="homeAdmin p-8 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        
        {/* Using the new standalone component */}
        <LogoutButton />
      </div>
      
      <div className="bg-white shadow-sm rounded-xl p-8 border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Profile Information</h2>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 uppercase">
            {account.role}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Account ID</label>
              <p className="text-gray-900 font-mono">#{account.id}</p>
            </div>
            
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Email Address</label>
              <p className="text-gray-900">{account.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Full Name</label>
              <p className="text-gray-900">
                {account.first_name || account.last_name 
                  ? `${account.first_name ?? ''} ${account.last_name ?? ''}`.trim() 
                  : "Name not provided"}
              </p>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Mobile Number</label>
              <p className="text-gray-900">{account.mobile_number || "No number linked"}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-50 flex justify-between items-center text-sm text-gray-400">
          <p>Joined on {new Date(account.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <Link href="/features/pages/admin/settings" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Edit Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}