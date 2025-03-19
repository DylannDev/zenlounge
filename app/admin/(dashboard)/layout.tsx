export const dynamic = "force-dynamic";

import React from "react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";
import { getAdminStatus } from "@/actions/getAdminStatus";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const isAdmin = await getAdminStatus();

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <AdminDashboardLayout adminName={isAdmin}>{children}</AdminDashboardLayout>
  );
};

export default DashboardLayout;
