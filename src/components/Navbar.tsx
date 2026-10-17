"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  House,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import { initialsFor, type AuthUser } from "@/lib/auth";
import insuro from "@/assets/insuro.png";
import { useAuth } from "./AuthProvider";
import MenuButton from "./MenuButton";
import ThemeToggle from "./ThemeToggle";

type NavLink = { href: string; label: string; Icon: LucideIcon };

const baseLinks: NavLink[] = [
  { href: "/", label: "Home", Icon: House },
  { href: "/plans", label: "Insurance", Icon: ShieldCheck },
];
const dashboardLink: NavLink = {
  href: "/dashboard",
  label: "Dashboard",
  Icon: LayoutDashboard,
};

// Natural colors in light mode, white in dark mode (extra classes can force white elsewhere)
function Logo({
  className,
  priority,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={insuro}
      alt="Insuro Africa Logo"
      width={160}
      height={80}
      priority={priority}
      className={clsx(
        "w-auto object-contain dark:brightness-0 dark:invert",
        className,
      )}
    />
  );
}

function AccountMenu({
  user,
  onLogout,
}: {
  user: AuthUser;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-3 transition hover:border-brand"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-brand text-[11px] font-extrabold text-white">
          {initialsFor(user.name)}
        </span>
        <span className="max-w-32 truncate text-[13px] font-semibold text-ink">
          {user.name.split(" ")[0]}
        </span>
        <ChevronDown
          size={15}
          className={clsx(
            "text-muted transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="modal-in absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-[0_25px_60px_-20px_rgba(15,58,140,0.45)]"
        >
          <div className="border-b border-line px-3 pb-3 pt-2">
            <div className="truncate text-[14px] font-bold text-ink">
              {user.name}
            </div>
            <div className="truncate text-[12px] text-muted">{user.email}</div>
            <div className="mt-1 truncate text-[12px] font-semibold text-brand">
              {user.company}
            </div>
          </div>
          <Link
            href="/dashboard"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-ink transition hover:bg-brand-soft"
          >
            <LayoutDashboard size={17} className="text-muted" /> Dashboard
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-ink transition hover:bg-brand-soft"
          >
            <LogOut size={17} className="text-muted" /> Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, ready, openAuth, logout } = useAuth();

  // The drawer is "open" only on the page it was opened on, so navigating closes it
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const closeDrawer = () => setOpenAt(null);

  const isHome = pathname === "/";
  const links = user ? [...baseLinks, dashboardLink] : baseLinks;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Escape closes the drawer + lock page scroll while it's open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenAt(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          "z-50",
          isHome
            ? "absolute inset-x-0 top-0"
            : "sticky top-0 border-b border-line/60 bg-surface/90 backdrop-blur",
        )}
      >
        <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          {/* Logo: white over the blue panel on the home page (lg and up) */}
          <Link href="/" className="flex items-center gap-2.5">
            <Logo
              priority
              className={clsx("h-20", isHome && "lg:brightness-0 lg:invert")}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "relative py-1 text-[13px] font-medium transition-colors",
                  isActive(l.href)
                    ? "text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-ink"
                    : "text-muted hover:text-ink",
                )}
              >
                {l.label}
              </Link>
            ))}

            <ThemeToggle />

            {!ready ? (
              <span aria-hidden className="h-10 w-44" />
            ) : user ? (
              <AccountMenu user={user} onLogout={logout} />
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openAuth("login")}
                  className="px-2 text-[13px] font-semibold text-ink transition hover:text-brand"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => openAuth("signup")}
                  className="rounded-full bg-brand px-6 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-brand-dark"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Hamburger (below md) */}
          <MenuButton
            onClick={() => setOpenAt(pathname)}
            className="md:hidden"
          />
        </nav>
      </header>

      {/* Mobile menu: half-width panel from the left + dimmed backdrop.
          Sits outside <header> so the header's backdrop-blur can't trap its fixed positioning. */}
      <div
        aria-hidden={!open}
        inert={!open}
        className={clsx(
          "fixed inset-0 z-90 transition-[visibility] duration-300 md:hidden",
          open ? "visible" : "invisible",
        )}
      >
        {/* Backdrop */}
        <div
          onClick={closeDrawer}
          className={clsx(
            "absolute inset-0 bg-[#0a0f1e]/55 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Panel */}
        <aside
          className={clsx(
            "absolute inset-y-0 left-0 flex w-1/2 min-w-64 max-w-xs flex-col overflow-hidden rounded-r-3xl bg-surface shadow-[0_0_60px_-10px_rgba(10,15,30,0.5)] transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {/* Decoration */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-brand-soft opacity-80 blur-2xl"
          />
          <div
            aria-hidden
            className="animate-ring pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full border border-brand/15"
          />

          {/* Header */}
          <div className="relative flex h-16 shrink-0 items-center justify-between px-4">
            <Link href="/" onClick={closeDrawer}>
              <Logo className="h-11" />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeDrawer}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand transition hover:bg-brand hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body (scrolls on short screens) */}
          <div className="scrollbar-none relative flex flex-1 flex-col overflow-y-auto px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-1 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <p className="px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              Menu
            </p>

            <nav className="mt-2 space-y-1">
              {links.map((l, i) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={closeDrawer}
                    aria-current={active ? "page" : undefined}
                    style={
                      open ? { animationDelay: `${120 + i * 60}ms` } : undefined
                    }
                    className={clsx(
                      "flex items-center gap-3 rounded-2xl px-2.5 py-2 text-[14px] font-semibold transition-colors",
                      open && "drawer-item",
                      active
                        ? "bg-brand text-white shadow-[0_12px_28px_-14px_rgba(26,86,219,0.8)]"
                        : "text-ink hover:bg-brand-soft",
                    )}
                  >
                    <span
                      className={clsx(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                        active ? "bg-white/15" : "bg-brand-soft text-brand",
                      )}
                    >
                      <l.Icon size={16} />
                    </span>
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="mt-auto space-y-2.5 pt-6">
              {ready && user ? (
                <>
                  <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand via-brand to-brand-dark p-3 text-white">
                    <div className="animate-ring absolute -right-8 -top-10 h-28 w-28 rounded-full border border-white/20" />
                    <div className="relative flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-[11px] font-extrabold ring-1 ring-white/30">
                        {initialsFor(user.name)}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-bold">
                          {user.name}
                        </div>
                        <div className="truncate text-[11px] text-white/70">
                          {user.company}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      logout();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand/20 py-2.5 text-[13px] font-semibold text-brand transition hover:bg-brand-soft"
                  >
                    <LogOut size={15} /> Log out
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      openAuth("signup");
                    }}
                    className="group flex w-full items-center justify-between rounded-full bg-brand py-1.5 pl-5 pr-1.5 text-[13px] font-bold text-white shadow-[0_12px_28px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark"
                  >
                    Get Started
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand transition group-hover:translate-x-0.5">
                      <ArrowRight size={15} />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      openAuth("login");
                    }}
                    className="w-full rounded-full border-2 border-brand/20 py-2.5 text-[13px] font-semibold text-brand transition hover:bg-brand-soft"
                  >
                    Sign in
                  </button>
                </>
              )}

              <ThemeToggle variant="segment" />

              <p className="pt-0.5 text-center text-[10px] text-muted">
                NDPR Compliant · SSL Secured
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
