// "use client";

// import { useEffect, useState, ReactNode } from "react";
// import { useRouter, usePathname } from "next/navigation";

// interface RoleGuardProps {
//   allowedRoles: string[];
//   children: ReactNode;
// }

// export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState<any>(null);

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // 1. Check local storage first for a fast initial check
//         const localUser = sessionStorage.getItem("user");
        
//         if (!localUser) {
//           handleUnauthenticated();
//           return;
//         }

//         const currentUser = JSON.parse(localUser);

//         // 2. Verify session with Laravel Sanctum 
//         // This ensures the cookie is still valid on the server
//         const response = await fetch(`${apiUrl}/user`, {
//           method: "GET",
//           headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//           },
//           credentials: "include", // Essential to send the Sanctum cookie
//         });

//         if (!response.ok) {
//           // If server says 401 Unauthorized, the cookie is dead
//           handleUnauthenticated();
//           return;
//         }

//         const verifiedUser = await response.json();
//         setUser(verifiedUser);

//         // 3. Role-based Authorization Logic
//         if (!allowedRoles.includes(verifiedUser.role)) {
//           redirectBasedOnRole(verifiedUser.role);
//           return;
//         }

//         setIsLoading(false);
//       } catch (error) {
//         console.error("Auth check failed:", error);
//         handleUnauthenticated();
//       }
//     };

//     const handleUnauthenticated = () => {
//       sessionStorage.removeItem("user");
//       const publicRoutes = ["/features/onboarding/login", "/features/onboarding/signup", "/features/onboarding/landing"];
//       if (!publicRoutes.includes(pathname)) {
//         router.replace("/features/onboarding/login");
//       }
//       setIsLoading(false);
//     };

//     const redirectBasedOnRole = (role: string) => {
//       if (role === "user") router.replace("/features/pages/user/home");
//       else if (role === "admin") router.replace("/features/pages/admin/home");
//       else if (role === "superadmin") router.replace("/features/pages/superadmin/home");
//     };

//     checkAuth();
//   }, [pathname, allowedRoles, router, apiUrl]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-gray-500 font-medium">Verifying Session...</p>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }



"use client";

import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";

interface RoleGuardProps {
  allowedRoles: string[];
  children: ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // 1. Hook into TanStack Query
  // 'data' is renamed to 'user' for clarity
  const { data: account, isLoading, isError } = useUser();

  useEffect(() => {
    // 2. Handle Unauthenticated or Error States
    // If the query finished loading and we have no user, they need to log in.
    if (!isLoading && (!account || isError)) {
      const publicRoutes = [
        "/features/onboarding/login", 
        "/features/onboarding/signup", 
        "/features/onboarding/landing"
      ];
      
      if (!publicRoutes.includes(pathname)) {
        router.replace("/features/onboarding/login");
      }
      return;
    }

    // 3. Handle Unauthorized Roles
    // If user exists but their role isn't in the allowed list, redirect them to their own home.
    if (account && !allowedRoles.includes(account.role)) {
      switch (account.role) {
        case "user":
          router.replace("/features/pages/user/home");
          break;
        case "admin":
          router.replace("/features/pages/admin/home");
          break;
        case "superadmin":
          router.replace("/features/pages/superadmin/home");
          break;
        default:
          router.replace("/"); // Fallback
      }
    }
  }, [account, isLoading, isError, allowedRoles, router, pathname]);

  // 4. Scannable Loading State
  // This only shows on the very first load or hard refresh.
  // Subsequent navigations will be instant thanks to TanStack cache.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 font-medium animate-pulse">Verifying Session...</p>
      </div>
    );
  }

  // 5. Final Gate
  // Only render the children if the user is authenticated and has the correct role.
  if (account && allowedRoles.includes(account.role)) {
    return <>{children}</>;
  }

  // Return null while the useEffect redirection is happening to prevent "flicker"
  return null;
}