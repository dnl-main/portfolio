"use client";

import { useLogout } from "@/hooks/useLogout";

export default function LogoutButton() {
  const logoutMutation = useLogout();

  return (
    <button
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
        logoutMutation.isPending 
          ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200" 
          : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200"
      }`}
    >
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </button>
  );
}