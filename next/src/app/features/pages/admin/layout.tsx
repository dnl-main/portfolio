"use client";

import React, { ReactNode } from "react";
import RoleGuard from "@/components/RoleGuard"; // Adjust path
// import AdminNavbar from "../../components/layouts/AdminNavbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="flex flex-col min-h-screen">
        {/* <AdminNavbar /> */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </RoleGuard>
  );
}
