"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarClock,
  CircleAlert,
  CircleCheck,
  CreditCard,
  Download,
  Landmark,
  Receipt,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import { formatNaira } from "@/lib/plans";
import { company } from "@/lib/dashboard-data";
import {
  payments,
  receiptText,
  type Payment,
  type PaymentStatus,
} from "@/lib/payments";

type Filter = "All" | PaymentStatus;

const statusStyle: Record<PaymentStatus, string> = {
  Paid: "bg-emerald-100 text-emerald-800",
  Pending: "bg-amber-100 text-amber-800",
  Failed: "bg-red-100 text-red-700",
};

function downloadReceipt(p: Payment) {
  const blob = new Blob([receiptText(p, company.name)], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${p.invoice}-receipt.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function PaymentsView() {
  const [filter, setFilter] = useState<Filter>("All");

  const paid = payments.filter((p) => p.status === "Paid");
  const totalPaid = paid.reduce((s, p) => s + p.amount, 0);
  const last = paid[0];
  const next = payments.find((p) => p.status === "Pending");
  const failedCount = payments.filter((p) => p.status === "Failed").length;

  const rows = useMemo(
    () =>
      filter === "All" ? payments : payments.filter((p) => p.status === filter),
    [filter],
  );

  const countFor = (f: Filter) =>
    f === "All"
      ? payments.length
      : payments.filter((p) => p.status === f).length;

  const summary: {
    label: string;
    value: string;
    sub: string;
    Icon: LucideIcon;
    tone: string;
  }[] = [
    {
      label: "Total paid",
      value: formatNaira(totalPaid),
      sub: `${paid.length} payments`,
      Icon: Wallet,
      tone: "bg-brand-soft text-brand",
    },
    {
      label: "Last payment",
      value: last ? formatNaira(last.amount) : "—",
      sub: last ? last.date : "",
      Icon: CircleCheck,
      tone: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Next payment due",
      value: next ? formatNaira(next.amount) : "—",
      sub: next ? next.date : "Nothing due",
      Icon: CalendarClock,
      tone: "bg-amber-100 text-amber-700",
    },
    {
      label: "Needs attention",
      value: String(failedCount),
      sub: failedCount ? "Failed payment" : "All clear",
      Icon: CircleAlert,
      tone: "bg-red-100 text-red-700",
    },
  ];

  const filters: Filter[] = ["All", "Paid", "Pending", "Failed"];

  return (
    <div className="px-5 py-8 sm:px-8 lg:py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Payments
          </h1>
          <p className="mt-2 text-[14px] text-muted">
            Your billing history and upcoming payments
          </p>
        </div>
        {next && (
          <Link
            href="/checkout?plan=hygeia-plus&staff=24"
            className="flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13px] font-semibold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark"
          >
            Pay now <ArrowUpRight size={16} />
          </Link>
        )}
      </div>

      {/* Summary */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map(({ label, value, sub, Icon, tone }) => (
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
              <div className="truncate text-[11px] text-muted">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* History */}
      <section className="mt-6 overflow-hidden rounded-4xl border border-line bg-surface shadow-[0_10px_40px_-20px_rgba(15,58,140,0.2)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line p-5 sm:px-7">
          <h2 className="flex items-center gap-2 text-[16px] font-extrabold tracking-tight text-ink">
            <Receipt size={18} className="text-brand" /> Payment history
          </h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={clsx(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold transition",
                  filter === f
                    ? "bg-brand text-white shadow-sm"
                    : "bg-brand-soft text-brand hover:bg-brand/15",
                )}
              >
                {f}
                <span
                  className={clsx(
                    "rounded-full px-1.5 text-[10px] font-bold",
                    filter === f ? "bg-white/25" : "bg-brand/15",
                  )}
                >
                  {countFor(f)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Column headings (desktop) */}
        <div className="hidden grid-cols-[1.2fr_1fr_2fr_1fr_1fr_auto] gap-4 border-b border-line bg-canvas px-7 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted lg:grid">
          <span>Invoice</span>
          <span>Date</span>
          <span>Plans</span>
          <span>Method</span>
          <span>Amount</span>
          <span className="w-44 text-right">Status</span>
        </div>

        {rows.length === 0 ? (
          <div className="px-6 py-16 text-center text-[13px] text-muted">
            No {filter.toLowerCase()} payments.
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {rows.map((p) => {
              const MethodIcon = p.method === "Card" ? CreditCard : Landmark;
              return (
                <li
                  key={p.id}
                  className="grid items-center gap-3 px-5 py-4 transition hover:bg-canvas sm:px-7 lg:grid-cols-[1.2fr_1fr_2fr_1fr_1fr_auto] lg:gap-4"
                >
                  {/* Invoice + status (status sits beside invoice on small screens) */}
                  <div className="flex items-center justify-between gap-3 lg:block">
                    <div>
                      <div className="text-[14px] font-semibold text-ink">
                        {p.invoice}
                      </div>
                      <div className="text-[12px] text-muted lg:hidden">
                        {p.date}
                      </div>
                    </div>
                    <span
                      className={clsx(
                        "rounded-full px-3 py-1 text-[11px] font-semibold lg:hidden",
                        statusStyle[p.status],
                      )}
                    >
                      {p.status}
                    </span>
                  </div>

                  <span className="hidden text-[13px] text-ink lg:block">
                    {p.date}
                  </span>
                  <div className="hidden min-w-0 lg:block">
                    <div className="truncate text-[13px] text-ink">
                      {p.description}
                    </div>
                    <div className="text-[11px] text-muted">
                      {p.employees} employees
                    </div>
                  </div>
                  <span className="hidden items-center gap-2 text-[13px] text-muted lg:flex">
                    <MethodIcon size={15} /> {p.method}
                  </span>

                  <div className="flex items-center justify-between gap-3 lg:contents">
                    <span className="text-[15px] font-extrabold text-ink">
                      {formatNaira(p.amount)}
                    </span>

                    <div className="flex items-center justify-end gap-2 lg:w-44">
                      <span
                        className={clsx(
                          "hidden rounded-full px-3 py-1 text-[11px] font-semibold lg:inline-block",
                          statusStyle[p.status],
                        )}
                      >
                        {p.status}
                      </span>
                      {p.status === "Paid" ? (
                        <button
                          type="button"
                          onClick={() => downloadReceipt(p)}
                          aria-label={`Download receipt for ${p.invoice}`}
                          title="Download receipt"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-brand hover:text-brand"
                        >
                          <Download size={15} />
                        </button>
                      ) : (
                        <Link
                          href="/checkout?plan=hygeia-plus&staff=24"
                          className="rounded-full bg-brand px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-brand-dark"
                        >
                          {p.status === "Failed" ? "Retry" : "Pay now"}
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
