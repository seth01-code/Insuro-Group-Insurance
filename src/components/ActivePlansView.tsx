"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  Check,
  ClipboardList,
  HeartPulse,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import { formatNaira, getPlanById } from "@/lib/plans";
import { providers } from "@/lib/providers";
import { activePlanRecords, getUpgrade } from "@/lib/active-plans";
import { useModal } from "./ModalProvider";

export default function ActivePlansView() {
  const { openModal } = useModal();

  const records = activePlanRecords
    .map((r) => ({ record: r, plan: getPlanById(r.planId) }))
    .filter(
      (
        x,
      ): x is {
        record: (typeof activePlanRecords)[number];
        plan: NonNullable<ReturnType<typeof getPlanById>>;
      } => !!x.plan,
    );

  const monthlyTotal = records.reduce(
    (sum, { record, plan }) => sum + plan.price * record.employees,
    0,
  );
  const covered = Math.max(0, ...records.map((x) => x.record.employees));
  const nextRenewal = records[0]?.record.renewal ?? "—";

  const summary: {
    label: string;
    value: string;
    Icon: LucideIcon;
    tone: string;
  }[] = [
    {
      label: "Active plans",
      value: String(records.length),
      Icon: ClipboardList,
      tone: "bg-brand-soft text-brand",
    },
    {
      label: "Employees covered",
      value: String(covered),
      Icon: UsersRound,
      tone: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Monthly cost",
      value: formatNaira(monthlyTotal),
      Icon: Wallet,
      tone: "bg-violet-100 text-violet-700",
    },
    {
      label: "Next renewal",
      value: nextRenewal,
      Icon: CalendarClock,
      tone: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <div className="px-5 py-8 sm:px-8 lg:py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Active Plans
          </h1>
          <p className="mt-2 text-[14px] text-muted">
            Everything your company is currently covered under
          </p>
        </div>
        <Link
          href="/plans"
          className="flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13px] font-semibold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark"
        >
          Browse more plans <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* Summary */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map(({ label, value, Icon, tone }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-3xl border border-line bg-surface p-5 shadow-[0_10px_40px_-20px_rgba(15,58,140,0.2)]"
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tone}`}
            >
              <Icon size={22} />
            </span>
            <div className="min-w-0">
              <div className="text-[12px] font-medium text-muted">{label}</div>
              <div className="truncate text-[20px] font-extrabold leading-tight tracking-tight text-ink">
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div className="mt-6 space-y-6">
        {records.map(({ record, plan }) => {
          const isHealth = plan.type === "health";
          const Icon = isHealth ? HeartPulse : ShieldCheck;
          const provider = providers.find((p) => p.name === plan.provider);
          const upgrade = getUpgrade(plan);
          const monthly = plan.price * record.employees;

          const facts = [
            { label: "Rate", value: `${formatNaira(plan.price)} / staff` },
            { label: "Employees", value: String(record.employees) },
            { label: "Monthly cost", value: formatNaira(monthly) },
            { label: "Policy number", value: record.policyNo },
          ];

          return (
            <section
              key={plan.id}
              className="overflow-hidden rounded-4xl border border-line bg-surface shadow-[0_10px_40px_-20px_rgba(15,58,140,0.2)]"
            >
              {/* Band */}
              <div
                className={clsx(
                  "relative overflow-hidden bg-linear-to-br p-7 text-white sm:p-8",
                  isHealth
                    ? "from-brand via-brand to-brand-dark"
                    : "from-emerald-500 to-emerald-700",
                )}
              >
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.2) 1.5px, transparent 1.5px)",
                    backgroundSize: "22px 22px",
                    maskImage:
                      "linear-gradient(to bottom left, black 0%, transparent 65%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom left, black 0%, transparent 65%)",
                  }}
                />
                <div className="animate-ring absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/20" />
                <div className="animate-ring absolute -right-36 -top-40 h-104 w-104 rounded-full border border-white/10 [animation-delay:1.5s]" />

                <div className="relative flex flex-wrap items-center gap-5">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
                    <Icon size={30} strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-extrabold tracking-tight">
                      {plan.name}
                    </h2>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-white/75">
                      <span>{plan.provider}</span>
                      {provider && (
                        <span className="flex items-center gap-1.5">
                          <BadgeCheck size={14} />
                          {provider.accreditation}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                    Active
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-8">
                {/* Facts */}
                <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {facts.map((f) => (
                    <div
                      key={f.label}
                      className="rounded-2xl border border-line bg-canvas px-5 py-4"
                    >
                      <dt className="text-[12px] text-muted">{f.label}</dt>
                      <dd className="mt-1 truncate text-[15px] font-bold text-ink">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Period */}
                <div className="mt-7">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-muted">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-brand" />
                      Plan period · {record.start} → {record.renewal}
                    </span>
                    <span className="font-semibold text-ink">
                      {record.periodPct}% complete
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-brand to-sky-400"
                      style={{ width: `${record.periodPct}%` }}
                    />
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-7">
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted">
                    What&apos;s covered
                  </h3>
                  <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-[13px] text-ink"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                          <Check size={11} strokeWidth={3.5} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Upgrade */}
                {upgrade && (
                  <div className="relative mt-7 flex flex-wrap items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-brand/30 bg-brand-soft p-5">
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] font-semibold text-brand">
                        Upgrade available
                      </div>
                      <div className="mt-0.5 text-[14px] font-bold text-ink">
                        {upgrade.name}
                      </div>
                      <div className="mt-0.5 text-[12px] text-muted">
                        {formatNaira(upgrade.price)} / staff · +
                        {formatNaira(upgrade.price - plan.price)} per staff
                      </div>
                    </div>
                    <Link
                      href={`/checkout?plan=${upgrade.id}&staff=${record.employees}`}
                      className="group flex items-center gap-2 rounded-full bg-brand py-2 pl-5 pr-2 text-[13px] font-semibold text-white transition hover:bg-brand-dark"
                    >
                      Upgrade
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand transition group-hover:translate-x-0.5">
                        <ArrowRight size={15} />
                      </span>
                    </Link>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={`/checkout?plan=${plan.id}&staff=${record.employees}`}
                    className="flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13px] font-semibold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark"
                  >
                    <RefreshCw size={15} /> Renew plan
                  </Link>
                  <button
                    type="button"
                    onClick={() => openModal("add-employee")}
                    className="flex items-center gap-2 rounded-full border-2 border-brand/20 px-6 py-3 text-[13px] font-semibold text-brand transition hover:bg-brand-soft"
                  >
                    <UserPlus size={15} /> Add employees
                  </button>
                  <Link
                    href={`/plans?type=${plan.type}`}
                    className="flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold text-muted transition hover:bg-brand-soft hover:text-ink"
                  >
                    Compare other {isHealth ? "health" : "life"} plans
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
