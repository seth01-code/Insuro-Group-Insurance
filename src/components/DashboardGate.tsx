"use client";

import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { useAuth } from "./AuthProvider";

// Shown instead of the dashboard when nobody is signed in.
export default function DashboardGate() {
  const { openAuth } = useAuth();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-5 py-16">
      <div
        aria-hidden
        className="animate-ring pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-brand/15"
      />
      <div
        aria-hidden
        className="animate-ring pointer-events-none absolute -bottom-40 -left-32 h-128 w-lg rounded-full border border-brand/10 [animation-delay:1.5s]"
      />

      <div className="relative w-full max-w-sm text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
            <ShieldCheck size={18} strokeWidth={2.5} />
          </span>
          <span className="text-[13px] font-extrabold tracking-wide text-ink">
            INSURO<span className="text-brand">.AFRICA</span>
          </span>
        </Link>

        <span className="mx-auto mt-12 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-brand text-white shadow-lg">
          <Lock size={28} strokeWidth={1.75} />
        </span>
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-ink">
          Sign in to view your dashboard
        </h1>
        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          Your plans, employees, payments and claims live here once you&apos;re
          signed in.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => openAuth("login")}
            className="rounded-full bg-brand py-3.5 text-[14px] font-bold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => openAuth("signup")}
            className="rounded-full border-2 border-brand/20 py-3.5 text-[14px] font-semibold text-brand transition hover:bg-brand-soft"
          >
            Create account
          </button>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted transition hover:text-ink"
        >
          <ArrowLeft size={14} /> Back to site
        </Link>
      </div>
    </div>
  );
}
