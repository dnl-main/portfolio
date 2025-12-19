"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface RoleGuardProps {
  allowedRoles: string[];
  children: ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Check local storage first for a fast initial check
        const localUser = sessionStorage.getItem("user");
        
        if (!localUser) {
          handleUnauthenticated();
          return;
        }

        const currentUser = JSON.parse(localUser);

        // 2. Verify session with Laravel Sanctum 
        // This ensures the cookie is still valid on the server
        const response = await fetch(`${apiUrl}/user`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include", // Essential to send the Sanctum cookie
        });

        if (!response.ok) {
          // If server says 401 Unauthorized, the cookie is dead
          handleUnauthenticated();
          return;
        }

        const verifiedUser = await response.json();
        setUser(verifiedUser);

        // 3. Role-based Authorization Logic
        if (!allowedRoles.includes(verifiedUser.role)) {
          redirectBasedOnRole(verifiedUser.role);
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        handleUnauthenticated();
      }
    };

    const handleUnauthenticated = () => {
      sessionStorage.removeItem("user");
      const publicRoutes = ["/features/onboarding/login", "/features/onboarding/signup", "/features/onboarding/landing"];
      if (!publicRoutes.includes(pathname)) {
        router.replace("/features/onboarding/login");
      }
      setIsLoading(false);
    };

    const redirectBasedOnRole = (role: string) => {
      if (role === "user") router.replace("/features/pages/user/home");
      else if (role === "admin") router.replace("/features/pages/admin/home");
      else if (role === "superadmin") router.replace("/features/pages/superadmin/home");
    };

    checkAuth();
  }, [pathname, allowedRoles, router, apiUrl]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 font-medium">Verifying Session...</p>
      </div>
    );
  }

  return <>{children}</>;
}