"use client";

import { useQuery } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function useUser() {
  return useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      // Small safety check for env variables
      if (!apiUrl) return null;

      const response = await fetch(`${apiUrl}/client`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 401) {
        return null;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      return response.json();
    },
    // Keep data fresh for 5 mins
    staleTime: 1000 * 60 * 5, 
    // If the user leaves the tab and comes back, check if they are still logged in
    refetchOnWindowFocus: true, 
    // Don't retry on 401s or 404s
    retry: (failureCount, error: any) => {
      if (error?.message?.includes("401")) return false;
      return failureCount < 2; // Retry twice for other network errors
    },
  });
}