"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ClipboardList,
  HeartPulse,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import clsx from "clsx";
import {
  budgetRanges,
  matchesBudget,
  plans,
  type BudgetKey,
} from "@/lib/plans";
import { providers } from "@/lib/providers";
import ProviderGroup from "./ProviderGroup";
import ClaimsSection from "./ClaimsSection";

export type ViewType = "health" | "life" | "general";

const tabs = [
  { key: "health", label: "Health", Icon: HeartPulse },
  { key: "life", label: "Life", Icon: ShieldCheck },
] as const;

const copy: Record<ViewType, { title: string; sub: string }> = {
  health: {
    title: "Health Insurance",
    sub: "Compare plans from our HMO partners",
  },
  life: {
    title: "Life Assurance",
    sub: "Protect your team with group life and assurance plans",
  },
  general: {
    title: "General Insurance",
    sub: "Motor, property, travel, and business insurance — all in one place",
  },
};

export default function PlansView({ initialType }: { initialType: ViewType }) {
  const [type, setType] = useState<ViewType>(initialType);
  const [budget, setBudget] = useState<BudgetKey>("all");

  const groups = useMemo(() => {
    if (type === "general") return [];
    return providers
      .filter((p) => p.type === type)
      .map((provider) => ({
        provider,
        plans: plans.filter(
          (pl) =>
            pl.provider === provider.name &&
            pl.type === type &&
            matchesBudget(pl.price, budget),
        ),
      }))
      .filter((g) => g.plans.length > 0);
  }, [type, budget]);

  return (
    <div className="bg-canvas">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-b-[3.5rem] bg-linear-to-br from-brand via-brand to-brand-dark pb-28 pt-12">
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
        <div className="animate-ring absolute -right-20 -top-28 h-96 w-96 rounded-full border border-white/15" />
        <div className="animate-ring absolute -right-44 -top-52 h-136 w-136 rounded-full border border-white/10 [animation-delay:1.5s]" />

        <div className="relative mx-auto max-w-6xl px-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur transition hover:bg-white/25"
          >
            <ArrowLeft size={14} /> Back
          </Link>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div className="reveal" key={type}>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {copy[type].title}
              </h1>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/70">
                {copy[type].sub}
              </p>
            </div>

            {/* Segmented switch */}
            <div className="flex gap-1 rounded-full bg-white/15 p-1 backdrop-blur">
              {tabs.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setType(key)}
                  className={clsx(
                    "flex items-center gap-2 rounded-full px-6 py-2.5 text-[13px] font-semibold transition",
                    type === key
                      ? "bg-white text-brand shadow-sm"
                      : "text-white/80 hover:text-white",
                  )}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating budget filter */}
      {type !== "general" && (
        <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-5">
          <div className="flex flex-wrap items-center gap-2.5 rounded-3xl bg-white p-4 shadow-[0_20px_50px_-20px_rgba(15,58,140,0.35)]">
            <span className="mr-2 flex items-center gap-2 pl-2 text-[12px] font-semibold text-muted">
              <SlidersHorizontal size={14} className="text-brand" />
              Budget per staff/month
            </span>
            {budgetRanges.map((b) => (
              <button
                key={b.value}
                type="button"
                onClick={() => setBudget(b.value)}
                className={clsx(
                  "rounded-full px-4 py-2 text-[12px] font-semibold transition",
                  budget === b.value
                    ? "bg-brand text-white shadow-sm"
                    : "bg-brand-soft text-brand hover:bg-brand/15",
                )}
              >
                {b.value === "all" ? "All Plans" : b.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Plans */}
      <div
        className={clsx(
          "mx-auto max-w-6xl px-5 pb-6",
          type === "general" ? "pt-14" : "pt-14",
        )}
      >
        {type === "general" && (
          <div className="relative mb-14 flex flex-col items-center overflow-hidden rounded-[2.5rem] bg-white px-6 py-20 text-center shadow-[0_20px_50px_-25px_rgba(15,58,140,0.3)]">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand-soft" />
            <div className="absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-brand-soft/70" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 to-amber-500 text-white shadow-lg">
              <ClipboardList size={28} />
            </span>
            <h2 className="relative mt-6 text-2xl font-extrabold text-ink">
              Coming Soon
            </h2>
            <p className="relative mt-2 max-w-sm text-[13px] leading-relaxed text-muted">
              Motor, property, travel, and business insurance are on the way. In
              the meantime, browse our health and life plans.
            </p>
            <div className="relative mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => setType("health")}
                className="rounded-full bg-brand px-7 py-3 text-[13px] font-semibold text-white transition hover:bg-brand-dark"
              >
                Health Plans
              </button>
              <button
                type="button"
                onClick={() => setType("life")}
                className="rounded-full border-2 border-brand/20 bg-white px-7 py-3 text-[13px] font-semibold text-brand transition hover:bg-brand-soft"
              >
                Life Plans
              </button>
            </div>
          </div>
        )}

        {type !== "general" && groups.length === 0 && (
          <div className="mb-14 rounded-4xl border border-dashed border-brand/30 bg-white px-6 py-16 text-center text-[13px] text-muted">
            No plans in that budget range.{" "}
            <button
              type="button"
              onClick={() => setBudget("all")}
              className="font-semibold text-brand"
            >
              Show all plans
            </button>
          </div>
        )}

        {groups.map(({ provider, plans: groupPlans }) => (
          <ProviderGroup
            key={provider.name}
            provider={provider}
            plans={groupPlans}
          />
        ))}

        <ClaimsSection />
      </div>
    </div>
  );
}
