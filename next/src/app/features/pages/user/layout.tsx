"use client";

import React, { ReactNode } from "react";
import RoleGuard from "@/components/RoleGuard"; // Adjust path
// import UserNavbar from "../../components/layouts/UserNavbar";

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <RoleGuard allowedRoles={["user"]}>
      <div className="flex flex-col min-h-screen">
        {/* <UserNavbar /> */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </RoleGuard>
  );
}
