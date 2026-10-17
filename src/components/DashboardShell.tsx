"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Loader2, Menu, ShieldCheck } from "lucide-react";
import { useAuth } from "./AuthProvider";
import DashboardGate from "./DashboardGate";
import DashboardSidebar from "./DashboardSidebar";
import ThemeToggle from "./ThemeToggle";

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
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <Loader2 size={26} className="animate-spin text-brand" />
      </div>
    );
  }

  if (!user) return <DashboardGate />;

  return (
    <div className="flex min-h-screen bg-canvas">
      <DashboardSidebar mobileOpen={mobileOpen} onMobileClose={closeMobile} />

      <div className="min-w-0 flex-1">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-surface/90 px-5 py-3.5 backdrop-blur md:hidden">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
              <ShieldCheck size={18} strokeWidth={2.5} />
            </span>
            <span className="text-[13px] font-extrabold tracking-wide text-ink">
              INSURO<span className="text-brand">.AFRICA</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink"
            >
              <Menu size={20} />
            </button>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
