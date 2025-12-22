"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Helper to get cookies by name
 */
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(";").shift() || "");
  return null;
};

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/logout`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          // CSRF protection for Laravel
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") || "", 
        },
        credentials: "include",
      });

      // Even if the response is 401 (already logged out), we proceed to clean up
      if (!response.ok && response.status !== 401) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Logout failed");
      }
    },
    onSuccess: () => {
      /**
       * 1. IMMEDIATE REDIRECT
       * Moves the user away from the dashboard before we delete data.
       */
      router.replace("/features/onboarding/login");

      /**
       * 2. DATA PURGE
       * We use a small timeout so the transition starts before the 
       * 'Unauthenticated' error can flash on the dashboard.
       */
      setTimeout(() => {
        // Clear TanStack Query Memory
        queryClient.clear(); 

        // Clear Session Storage (Based on your DevTools logs)
        sessionStorage.removeItem("user");    // Removing the 'user' ghost
        sessionStorage.removeItem("account"); // Removing 'account' backup
        
        // Note: We do NOT remove localStorage.remembered_client_email 
        // because we want the login box to remember the user.
      }, 150);
    },
    onError: (error) => {
      console.error("Logout Process Error:", error.message);
      
      /**
       * SECURITY FALLBACK
       * If Laravel says the token is invalid (419) or expired, 
       * it means you're already logged out on the server.
       * We force a cleanup on the client side.
       */
      queryClient.clear();
      sessionStorage.removeItem("user");
      router.replace("/features/onboarding/login");
    }
  });
}