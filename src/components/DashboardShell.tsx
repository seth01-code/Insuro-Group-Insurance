"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useState } from "react";
import insuro from "@/assets/insuro.png";
import { useAuth } from "./AuthProvider";
import DashboardGate from "./DashboardGate";
import DashboardSidebar from "./DashboardSidebar";
import MenuButton from "./MenuButton";
import { DashboardShellSkeleton } from "./skeletons/DashboardSkeleton";

// Sidebar + mobile top bar shared by every /dashboard page.
// Only renders for signed-in users.
export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, ready } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Session not read yet (first paint)
  if (!ready) return <DashboardShellSkeleton />;

  if (!user) return <DashboardGate />;

  return (
    <div className="flex min-h-screen bg-canvas">
      <DashboardSidebar mobileOpen={mobileOpen} onMobileClose={closeMobile} />

      <div className="min-w-0 flex-1">
        {/* Mobile top bar (the theme switch lives inside the menu) */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-surface/90 px-5 py-2.5 backdrop-blur md:hidden">
          <Link href="/">
            <Image
              src={insuro}
              alt="Insuro Africa Logo"
              width={100}
              height={50}
              priority
              className="h-12 w-auto object-contain dark:brightness-0 dark:invert"
            />
          </Link>
          <MenuButton onClick={() => setMobileOpen(true)} />
        </header>

        {children}
      </div>
    </div>
  );
}
