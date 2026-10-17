"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import clsx from "clsx";
import { initialsFor, type AuthUser } from "@/lib/auth";
import { useAuth } from "./AuthProvider";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import insuro from "@/assets/insuro.png";

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/plans", label: "Insurance" },
];

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

  const isHome = pathname === "/";
  const links = user
    ? [...baseLinks, { href: "/dashboard", label: "Dashboard" }]
    : baseLinks;
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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={insuro}
              alt="Insuro Africa Logo"
              width={160}
              height={80}
              className="h-20 w-auto object-contain brightness-0 invert"
              priority
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
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpenAt(pathname)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink md:hidden"
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      {/* Full-width drawer, slides in from the left. Sits outside <header> so
          the header's backdrop-blur can't trap its fixed positioning. */}
      <div
        aria-hidden={!open}
        inert={!open}
        className={clsx(
          "fixed inset-0 z-90 flex flex-col overflow-hidden bg-surface transition-[transform,visibility] duration-300 ease-out md:hidden",
          open ? "visible translate-x-0" : "invisible -translate-x-full",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full border border-brand/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-48 -right-48 h-136 w-136 rounded-full border border-brand/10"
        />

        <div className="relative flex h-20 shrink-0 items-center justify-between border-b border-line px-5">
          <Link
            href="/"
            onClick={() => setOpenAt(null)}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
              <ShieldCheck size={18} strokeWidth={2.5} />
            </span>
            <span className="text-[13px] font-extrabold tracking-wide text-ink">
              INSURO<span className="text-brand">.AFRICA</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpenAt(null)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-5 py-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpenAt(null)}
              className={clsx(
                "flex items-center justify-between border-b border-line py-5 text-2xl font-extrabold tracking-tight transition",
                isActive(l.href) ? "text-brand" : "text-ink",
              )}
            >
              {l.label}
              <ArrowRight
                size={20}
                className={isActive(l.href) ? "text-brand" : "text-muted"}
              />
            </Link>
          ))}
        </nav>

        <div className="relative shrink-0 space-y-3 border-t border-line p-5">
          {ready && user ? (
            <>
              <div className="flex items-center gap-3 rounded-2xl bg-canvas p-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-brand text-[12px] font-extrabold text-white">
                  {initialsFor(user.name)}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-bold text-ink">
                    {user.name}
                  </div>
                  <div className="truncate text-[12px] text-muted">
                    {user.company}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpenAt(null);
                  logout();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand/20 py-3.5 text-[14px] font-semibold text-brand transition hover:bg-brand-soft"
              >
                <LogOut size={16} /> Log out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setOpenAt(null);
                  openAuth("signup");
                }}
                className="w-full rounded-full bg-brand py-4 text-[15px] font-bold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark"
              >
                Get Started
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpenAt(null);
                  openAuth("login");
                }}
                className="w-full rounded-full border-2 border-brand/20 py-3.5 text-[14px] font-semibold text-brand transition hover:bg-brand-soft"
              >
                Sign in
              </button>
            </>
          )}
          <ThemeToggle variant="switch" className="border border-line" />
        </div>
      </div>
    </>
  );
}
