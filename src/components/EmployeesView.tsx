"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Search,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import {
  colorFor,
  defaultPlan,
  emailFor,
  employees as seed,
  initialsOf,
  type Employee,
} from "@/lib/dashboard-data";
import { useModal, type ModalSubmitData } from "./ModalProvider";

const PAGE_SIZE = 8;

type Filter = "All" | "Active" | "Pending";

const inputClass =
  "w-full rounded-2xl border border-line bg-canvas py-3 pl-11 pr-4 text-[14px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:bg-surface focus:ring-4 focus:ring-brand/10";

export default function EmployeesView() {
  const { openModal } = useModal();

  const [list, setList] = useState<Employee[]>(seed);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [page, setPage] = useState(1);

  const total = list.length;
  const activeCount = list.filter((e) => e.status === "Active").length;
  const pendingCount = total - activeCount;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return list.filter((e) => {
      if (filter !== "All" && e.status !== filter) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q)
      );
    });
  }, [list, query, filter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  // Called by the "add-employee" modal when it's submitted
  function addEmployee(data: ModalSubmitData) {
    const name = data.fullName?.trim();
    if (!name) return;

    // Mock: save the new employee to your backend here
    setList((l) => [
      {
        id: `emp-${Date.now()}`,
        name,
        initials: initialsOf(name),
        color: colorFor(l.length),
        email: data.email?.trim() || emailFor(name),
        department: data.department || "Operations",
        plan: defaultPlan,
        status: "Pending",
        joined: "Just now",
      },
      ...l,
    ]);
    setFilter("All");
    setQuery("");
    setPage(1);
  }

  const summary: {
    label: string;
    value: number;
    Icon: LucideIcon;
    tone: string;
  }[] = [
    {
      label: "Total employees",
      value: total,
      Icon: Users,
      tone: "bg-brand-soft text-brand",
    },
    {
      label: "Active",
      value: activeCount,
      Icon: UserCheck,
      tone: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Pending",
      value: pendingCount,
      Icon: Clock,
      tone: "bg-amber-100 text-amber-700",
    },
  ];

  const filters: Filter[] = ["All", "Active", "Pending"];
  const countFor = (f: Filter) =>
    f === "All" ? total : f === "Active" ? activeCount : pendingCount;

  return (
    <div className="px-5 py-8 sm:px-8 lg:py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Employees
          </h1>
          <p className="mt-2 text-[14px] text-muted">
            Manage who&apos;s covered under your plans
          </p>
        </div>
        <button
          type="button"
          onClick={() => openModal("add-employee", { onSubmit: addEmployee })}
          className="flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13px] font-semibold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark"
        >
          <Plus size={16} />
          Add employee
        </button>
      </div>

      {/* Summary */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
            <div>
              <div className="text-[12px] font-medium text-muted">{label}</div>
              <div className="text-[28px] font-extrabold leading-none tracking-tight text-ink">
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* List */}
      <section className="mt-6 overflow-hidden rounded-4xl border border-line bg-surface shadow-[0_10px_40px_-20px_rgba(15,58,140,0.2)]">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line p-5 sm:px-7">
          <div className="relative w-full max-w-sm">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, email or department"
              className={inputClass}
            />
          </div>

          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
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
        <div className="hidden grid-cols-[2.2fr_1.2fr_1.6fr_1fr_auto] gap-4 border-b border-line bg-canvas px-7 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted md:grid">
          <span>Employee</span>
          <span>Department</span>
          <span>Plan</span>
          <span>Joined</span>
          <span className="w-20 text-right">Status</span>
        </div>

        {rows.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <Search size={24} />
            </span>
            <h3 className="mt-4 text-[16px] font-bold text-ink">
              No employees found
            </h3>
            <p className="mt-1 text-[13px] text-muted">
              Try a different search or filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
              className="mt-5 rounded-full bg-brand-soft px-6 py-2.5 text-[13px] font-semibold text-brand transition hover:bg-brand hover:text-white"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {rows.map((e) => (
              <li
                key={e.id}
                className="grid items-center gap-3 px-5 py-4 transition hover:bg-canvas sm:px-7 md:grid-cols-[2.2fr_1.2fr_1.6fr_1fr_auto] md:gap-4"
              >
                <div className="flex min-w-0 items-center gap-4">
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
                    <div className="truncate text-[12px] text-muted">
                      {e.email}
                    </div>
                  </div>
                  {/* Status chip on phones sits beside the name */}
                  <span
                    className={clsx(
                      "rounded-full px-3 py-1 text-[11px] font-semibold md:hidden",
                      e.status === "Active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800",
                    )}
                  >
                    {e.status}
                  </span>
                </div>

                <span className="hidden text-[13px] text-ink md:block">
                  {e.department}
                </span>
                <span className="hidden text-[13px] text-muted md:block">
                  {e.plan}
                </span>
                <span className="hidden text-[13px] text-muted md:block">
                  {e.joined}
                </span>
                <span className="hidden w-20 justify-self-end md:block">
                  <span
                    className={clsx(
                      "inline-block rounded-full px-3 py-1 text-[11px] font-semibold",
                      e.status === "Active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800",
                    )}
                  >
                    {e.status}
                  </span>
                </span>

                {/* Compact details on phones */}
                <p className="pl-15 text-[12px] text-muted md:hidden">
                  {e.department} · {e.plan} · {e.joined}
                </p>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 sm:px-7">
            <p className="text-[12px] text-muted">
              Showing{" "}
              <span className="font-semibold text-ink">
                {start + 1}–{start + rows.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-ink">{filtered.length}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage(current - 1)}
                disabled={current === 1}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-2 text-[12px] font-semibold text-ink">
                {current} / {pageCount}
              </span>
              <button
                type="button"
                onClick={() => setPage(current + 1)}
                disabled={current === pageCount}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
