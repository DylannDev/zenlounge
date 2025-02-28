"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import {
  PiFlowerTulip,
  PiListMagnifyingGlass,
  PiSignOut,
  PiUserCheck,
} from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/actions/authClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboardLayout({
  children,
  adminName,
}: {
  children: React.ReactNode;
  adminName: string | null;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { toast } = useToast();

  const links = [
    {
      label: "Prestations",
      href: "/admin/bookings",
      icon: <PiFlowerTulip className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Historique",
      href: "/admin/history",
      icon: <PiListMagnifyingGlass className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Clients",
      href: "/admin/clients",
      icon: <PiUserCheck className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Déconnexion",
      onClick: async () => {
        const response = await logout();
        if (response.success) {
          router.push("/");
        } else {
          toast({ description: response.message });
        }
      },
      icon: <PiSignOut className="h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <div className={cn("flex flex-col md:flex-row bg-white w-full h-screen")}>
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo color="rose" />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={`${pathname === link.href && "bg-rose-dark/10 rounded-lg"}`}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex flex-col flex-1 overflow-y-auto py-4 px-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Bienvenue, {adminName} 👋</h1>
          <p className="text-sm text-blue-light">
            Gérez vos réservations et clients en toute simplicité.
          </p>
        </div>
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
