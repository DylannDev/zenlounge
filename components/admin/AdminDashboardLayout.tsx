"use client";

import React, { useState, useTransition } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import {
  PiArrowsClockwise,
  PiCalendarPlus,
  PiFlowerTulip,
  PiHouseLine,
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
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  // ✅ Intercepte la navigation pour la wrapper dans une transition React.
  // Cela rend isPending=true pendant que le server component cible fetch
  // ses données → on peut afficher un overlay flouté sur le contenu actuel.
  const handleNavigate = (href: string) => (e: React.MouseEvent) => {
    if (href === pathname) return; // pas de loader si on reclique sur l'onglet courant
    e.preventDefault();
    startTransition(() => router.push(href));
  };

  const links = [
    {
      label: "Prestations",
      href: "/admin/bookings",
      icon: <PiFlowerTulip className="h-5 w-5 flex-shrink-0" />,
      onClick: handleNavigate("/admin/bookings"),
    },
    {
      label: "Nouvelle réservation",
      href: "/admin/bookings/new",
      icon: <PiCalendarPlus className="h-5 w-5 flex-shrink-0" />,
      onClick: handleNavigate("/admin/bookings/new"),
    },
    {
      label: "Forfaits",
      href: "/admin/forfaits",
      icon: <PiArrowsClockwise className="h-5 w-5 flex-shrink-0" />,
      onClick: handleNavigate("/admin/forfaits"),
    },
    {
      label: "Location",
      href: "/admin/rentals",
      icon: <PiHouseLine className="h-5 w-5 flex-shrink-0" />,
      onClick: handleNavigate("/admin/rentals"),
    },
    {
      label: "Clients",
      href: "/admin/clients",
      icon: <PiUserCheck className="h-5 w-5 flex-shrink-0" />,
      onClick: handleNavigate("/admin/clients"),
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
                <div key={idx} onClick={() => setOpen(false)}>
                  <SidebarLink
                    link={link}
                    className={`${pathname === link.href && "bg-rose-dark/10 rounded-lg"}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex flex-col flex-1 overflow-y-auto py-4 px-4 sm:px-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Bienvenue, {adminName} 👋</h1>
          <p className="text-sm text-blue-light">
            Gérez vos réservations et clients en toute simplicité.
          </p>
        </div>
        <div className="flex-1">
          {/* ✅ Le contenu reste affiché mais flouté pendant que la nouvelle
              page se charge en arrière-plan (transition React) */}
          <div
            className={cn(
              "transition-[filter] duration-200",
              isPending && "blur-sm pointer-events-none select-none"
            )}
          >
            {children}
          </div>
        </div>
      </main>

      {/* ✅ Loader en position fixed pour rester centré dans la zone visible
          quel que soit le scroll. Offset à gauche pour ne pas recouvrir la
          sidebar (300px sur desktop, top-bar de h-10 sur mobile). */}
      {isPending && (
        <div className="fixed top-10 left-0 right-0 bottom-0 md:top-0 md:left-[300px] z-40 flex items-center justify-center bg-white/30 pointer-events-none">
          <Loader text="Chargement..." />
        </div>
      )}
      <Toaster />
    </div>
  );
}
