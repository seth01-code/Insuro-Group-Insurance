"use client";

import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import clsx from "clsx";
import {
  activePlans,
  activity,
  employees,
  quickActions,
  stats,
} from "@/lib/dashboard-data";
import { useAuth } from "./AuthProvider";
import { useModal } from "./ModalProvider";

const card =
  "rounded-[2rem] border border-line bg-surface p-7 shadow-[0_10px_40px_-20px_rgba(15,58,140,0.2)]";

export default function DashboardView() {
  const { openModal } = useModal();
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] ?? "there";

  return (
    <div className="px-5 py-8 sm:px-8 lg:py-10">
      {/* Greeting banner */}
      <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-brand via-brand to-brand-dark p-8 sm:p-10">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.2) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
            maskImage:
              "linear-gradient(to bottom left, black 0%, transparent 65%)",
            WebkitMaskImage:
              "linear-gradient(to bottom left, black 0%, transparent 65%)",
          }}
        />
        <div className="animate-ring absolute -right-16 -top-24 h-80 w-80 rounded-full border border-white/15" />
        <div className="animate-ring absolute -right-40 -top-48 h-120 w-120 rounded-full border border-white/10 [animation-delay:1.5s]" />
        <div className="reveal relative">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-2 max-w-md text-[14px] text-white/70">
            Here&apos;s a summary of your company&apos;s insurance coverage
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={clsx(
              "relative overflow-hidden rounded-3xl p-6",
              s.featured
                ? "bg-linear-to-br from-brand to-brand-dark text-white shadow-[0_25px_50px_-20px_rgba(26,86,219,0.6)]"
                : "border border-line bg-surface shadow-[0_10px_40px_-20px_rgba(15,58,140,0.2)]",
            )}
          >
            <div
              aria-hidden
              className={clsx(
                "absolute -right-8 -top-8 h-28 w-28 rounded-full",
                s.featured ? "bg-white/10" : "bg-brand-soft",
              )}
            />
            <span
              className={clsx(
                "relative flex h-11 w-11 items-center justify-center rounded-2xl",
                s.featured
                  ? "bg-white/15 ring-1 ring-white/30"
                  : "bg-brand-soft text-brand",
              )}
            >
              <s.Icon size={20} />
            </span>
            <div
              className={clsx(
                "relative mt-5 text-[12px] font-medium",
                s.featured ? "text-white/70" : "text-muted",
              )}
            >
              {s.label}
            </div>
            <div
              className={clsx(
                "relative mt-1 text-[32px] font-extrabold leading-none tracking-tight",
                s.featured ? "text-white" : "text-ink",
              )}
            >
              {s.value}
            </div>
            <div
              className={clsx(
                "relative mt-2 text-[12px] font-semibold",
                s.featured ? "text-white/80" : "text-emerald-600",
              )}
            >
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <section className={clsx(card, "mt-6")}>
        <h2 className="text-[16px] font-extrabold tracking-tight text-ink">
          Quick Actions
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {quickActions.map(({ label, sub, modal, Icon, tile }) => (
            <button
              key={label}
              type="button"
              onClick={() => openModal(modal)}
              className="group flex flex-col items-center rounded-2xl border border-line bg-canvas px-3 py-6 text-center transition hover:-translate-y-1 hover:border-brand/40 hover:bg-surface hover:shadow-[0_20px_40px_-20px_rgba(26,86,219,0.4)]"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg ${tile}`}
              >
                <Icon size={24} strokeWidth={1.75} />
              </span>
              <span className="mt-4 text-[13px] font-bold text-ink">
                {label}
              </span>
              <span className="mt-0.5 text-[11px] text-muted">{sub}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Plans + activity */}
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className={card}>
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold tracking-tight text-ink">
              Active Plans
            </h2>
            <Link
              href="/dashboard/plans"
              className="flex items-center gap-1 text-[12px] font-semibold text-brand transition hover:text-brand-dark"
            >
              View all <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {activePlans.map((p) => (
              <div
                key={p.name}
                className={clsx(
                  "flex items-center gap-4 rounded-2xl p-4",
                  p.tone === "blue" ? "bg-brand-soft" : "bg-emerald-50",
                )}
              >
                <span
                  className={clsx(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md",
                    p.tone === "blue"
                      ? "bg-linear-to-br from-sky-400 to-brand"
                      : "bg-linear-to-br from-emerald-400 to-emerald-600",
                  )}
                >
                  <p.Icon size={21} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-bold text-ink">
                    {p.name}
                  </div>
                  <div className="mt-0.5 text-[12px] text-muted">
                    {p.detail}
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase text-emerald-800">
                  Active
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-[12px] text-muted">
              <span className="flex items-center gap-1.5">
                <TrendingUp size={14} className="text-brand" /> Plan period
              </span>
              <span className="font-semibold text-ink">65% complete</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-line">
              <div className="h-full w-[65%] rounded-full bg-linear-to-r from-brand to-sky-400" />
            </div>
          </div>
        </section>

        <section className={card}>
          <h2 className="text-[16px] font-extrabold tracking-tight text-ink">
            Recent Activity
          </h2>
          <ul className="relative mt-5">
            <span
              aria-hidden
              className="absolute bottom-2 left-1.25 top-2 w-px bg-line"
            />
            {activity.map((a) => (
              <li key={a.text} className="relative flex gap-4 pb-5 last:pb-0">
                <span
                  className={`relative mt-1.5 h-2.75 w-2.75 shrink-0 rounded-full ring-4 ring-surface ${a.dot}`}
                />
                <div>
                  <p className="text-[13px] leading-snug text-ink">{a.text}</p>
                  <p className="mt-1 text-[11px] text-muted">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Employee coverage (first five) */}
      <section className={clsx(card, "mt-6")}>
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-extrabold tracking-tight text-ink">
            Employee Coverage
          </h2>
          <Link
            href="/dashboard/employees"
            className="flex items-center gap-1 text-[12px] font-semibold text-brand transition hover:text-brand-dark"
          >
            Manage all <ArrowUpRight size={14} />
          </Link>
        </div>

        <ul className="mt-4 divide-y divide-line">
          {employees.slice(0, 5).map((e) => (
            <li key={e.id} className="flex items-center gap-4 py-4">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                style={{ background: e.color }}
              >
                {e.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14px] font-semibold text-ink">
                  {e.name}
                </div>
                <div className="text-[12px] text-muted">{e.plan}</div>
              </div>
              <span
                className={clsx(
                  "rounded-full px-3 py-1 text-[11px] font-semibold",
                  e.status === "Active"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800",
                )}
              >
                {e.status}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 text-center">
          <Link
            href="/dashboard/employees"
            className="inline-block rounded-full bg-brand-soft px-6 py-3 text-[13px] font-semibold text-brand transition hover:bg-brand hover:text-white"
          >
            View all {employees.length} employees
          </Link>
        </div>
      </section>
    </div>
  );
}
