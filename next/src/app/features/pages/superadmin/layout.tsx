"use client";

import React, { ReactNode } from "react";
import RoleGuard from "@/components/RoleGuard";
// import SuperadminNavbar from "../../components/layouts/SuperadminNavbar";

interface SuperadminLayoutProps {
  children: ReactNode;
}

export default function SuperadminLayout({ children }: SuperadminLayoutProps) {
  return (
    <RoleGuard allowedRoles={["superadmin"]}>
      <div className="flex flex-col min-h-screen">
        {/* <SuperadminNavbar /> */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </RoleGuard>
  );
}
