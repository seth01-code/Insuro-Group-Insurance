"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CreditCard,
  HeartPulse,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Smartphone,
  Tag,
  User,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import { formatNaira, type Plan } from "@/lib/plans";

// Sample company details. Replace with data from your backend later.
const MOCK_COMPANY = {
  name: "ShipAfrica Ltd",
  contact: "Kimberly A.",
  role: "HR Admin",
  email: "hr@shipafrica.com",
  phone: "+234 801 234 5678",
  address: "22 Marina Road, Lagos Island, Lagos",
  startDate: "2026-11-01",
};

type Company = typeof MOCK_COMPANY;

// Test promo codes. Replace with a backend lookup later.
const PROMO_CODES: Record<string, number> = {
  INSURO10: 0.1, // 10% off
};

const payTabs: {
  key: "card" | "bank" | "ussd";
  label: string;
  Icon: LucideIcon;
}[] = [
  { key: "card", label: "Debit / Credit Card", Icon: CreditCard },
  { key: "bank", label: "Bank Transfer", Icon: Landmark },
  { key: "ussd", label: "USSD", Icon: Smartphone },
];

const steps = ["Plan selected", "Company details", "Payment", "Confirmation"];

const companyFields: {
  name: keyof Company;
  label: string;
  Icon: LucideIcon;
  type?: string;
  full?: boolean;
  placeholder?: string;
}[] = [
  {
    name: "name",
    label: "Company name",
    Icon: Building2,
    full: true,
    placeholder: "e.g. ShipAfrica Ltd",
  },
  {
    name: "contact",
    label: "Contact person",
    Icon: User,
    placeholder: "Full name",
  },
  {
    name: "role",
    label: "Role",
    Icon: Briefcase,
    placeholder: "e.g. HR Admin",
  },
  {
    name: "email",
    label: "Work email",
    Icon: Mail,
    type: "email",
    placeholder: "hr@company.com",
  },
  {
    name: "phone",
    label: "Phone number",
    Icon: Phone,
    type: "tel",
    placeholder: "+234 800 000 0000",
  },
  {
    name: "address",
    label: "Company address",
    Icon: MapPin,
    full: true,
    placeholder: "Street, city, state",
  },
  {
    name: "startDate",
    label: "Coverage start date",
    Icon: Calendar,
    type: "date",
  },
];

const inputClass =
  "w-full rounded-2xl border border-line bg-[#f8faff] py-3.5 pl-11 pr-4 text-[14px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10";

function Field({
  label,
  Icon,
  children,
}: {
  label: string;
  Icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[12.5px] font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        {children}
      </div>
    </div>
  );
}

export default function CheckoutView({
  plan,
  employees: initialEmployees,
}: {
  plan: Plan | null;
  employees: number;
}) {
  const [step, setStep] = useState<"details" | "payment" | "confirmed">(
    "details",
  );
  const [company, setCompany] = useState<Company>(MOCK_COMPANY);
  const [employees, setEmployees] = useState(initialEmployees);

  const [tab, setTab] = useState<"card" | "bank" | "ussd">("card");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [processing, setProcessing] = useState(false);

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [applied, setApplied] = useState<{ code: string; pct: number } | null>(
    null,
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Scroll to the top whenever the step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // No plan or an unknown plan id
  if (!plan) {
    return (
      <div className="bg-canvas px-5 py-28">
        <div className="mx-auto flex max-w-md flex-col items-center rounded-4xl bg-white px-8 py-14 text-center shadow-[0_20px_50px_-25px_rgba(15,58,140,0.3)]">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
            <ShieldCheck size={26} />
          </span>
          <h1 className="mt-5 text-xl font-extrabold text-ink">
            No plan selected
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            Pick a plan first and we&apos;ll bring you back here to complete
            your enrollment.
          </p>
          <Link
            href="/plans"
            className="mt-6 rounded-full bg-brand px-7 py-3 text-[13px] font-semibold text-white transition hover:bg-brand-dark"
          >
            Browse Plans
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = plan.price * employees;
  const discount = applied ? Math.round(subtotal * applied.pct) : 0;
  const total = subtotal - discount;

  const isHealth = plan.type === "health";
  const typeLabel = isHealth ? "Health" : "Life";
  const PlanIcon = isHealth ? HeartPulse : ShieldCheck;

  const stepIndex = step === "details" ? 1 : step === "payment" ? 2 : 3;
  const confirmed = step === "confirmed";
  const stepState = (i: number) =>
    confirmed || i < stepIndex ? "done" : i === stepIndex ? "active" : "todo";

  function updateCompany(name: keyof Company, value: string) {
    setCompany((c) => ({ ...c, [name]: value }));
  }

  function updateEmployees(v: number) {
    setEmployees(Number.isNaN(v) ? 1 : Math.min(5000, Math.max(1, v)));
  }

  function formatCard(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    setCard(digits.replace(/(.{4})/g, "$1 ").trim());
  }

  function formatExpiry(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    setExpiry(
      digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits,
    );
  }

  function handleDetails(e: React.FormEvent) {
    e.preventDefault();
    // Mock: save company details to your backend here
    setStep("payment");
  }

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (processing) return;
    // Mock: call your payment provider here
    setProcessing(true);
    timer.current = setTimeout(() => {
      setProcessing(false);
      setStep("confirmed");
    }, 1200);
  }

  function handleApplyPromo(e: React.FormEvent) {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    const pct = PROMO_CODES[code];
    if (pct) {
      setApplied({ code, pct });
      setPromoInput("");
      setPromoError("");
    } else {
      setPromoError("That code isn't valid.");
    }
  }

  return (
    <div className="bg-canvas">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-b-[3.5rem] bg-linear-to-br from-brand via-brand to-brand-dark pb-32 pt-12">
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
            href={`/plans?type=${plan.type}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur transition hover:bg-white/25"
          >
            <ArrowLeft size={14} /> Back
          </Link>

          <div className="reveal mt-8">
            <div className="text-[12px] font-medium text-white/65">
              Insurance / {typeLabel} / Checkout
            </div>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Complete your enrollment
            </h1>
          </div>

          {/* Stepper */}
          <ol className="mt-10 flex max-w-2xl items-center">
            {steps.map((label, i) => {
              const s = stepState(i);
              return (
                <li
                  key={label}
                  className={clsx("flex items-center", i < 3 && "flex-1")}
                >
                  <span
                    className={clsx(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition",
                      s === "done" && "bg-white text-brand",
                      s === "active" &&
                        "bg-white/20 text-white ring-2 ring-white",
                      s === "todo" && "bg-white/10 text-white/50",
                    )}
                  >
                    {s === "done" ? <Check size={15} strokeWidth={3} /> : i + 1}
                  </span>
                  <span
                    className={clsx(
                      "ml-2.5 hidden whitespace-nowrap text-[12px] font-semibold sm:inline",
                      s === "todo" ? "text-white/50" : "text-white",
                    )}
                  >
                    {label}
                  </span>
                  {i < 3 && (
                    <span
                      className={clsx(
                        "mx-3 h-0.5 flex-1 rounded-full",
                        stepState(i + 1) === "todo"
                          ? "bg-white/20"
                          : "bg-white/70",
                      )}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Content, overlapping the banner */}
      <div className="relative z-10 mx-auto -mt-20 grid max-w-6xl items-start gap-6 px-5 pb-20 lg:grid-cols-[1.4fr_1fr]">
        {/* Main panel */}
        <div className="rounded-4xl bg-white p-7 shadow-[0_25px_60px_-25px_rgba(15,58,140,0.35)] sm:p-9">
          {/* ── Step 2: company details ── */}
          {step === "details" && (
            <form onSubmit={handleDetails}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-[17px] font-extrabold tracking-tight text-ink">
                    Company details
                  </h2>
                  <p className="mt-1 text-[13px] text-muted">
                    Tell us who we&apos;re enrolling. Edit anything that
                    isn&apos;t right.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {companyFields.map((f) => (
                  <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                    <Field label={f.label} Icon={f.Icon}>
                      <input
                        required
                        type={f.type ?? "text"}
                        value={company[f.name]}
                        onChange={(e) => updateCompany(f.name, e.target.value)}
                        placeholder={f.placeholder}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <Field label="Number of employees to cover" Icon={Users}>
                    <input
                      required
                      type="number"
                      min={1}
                      max={5000}
                      value={employees}
                      onChange={(e) =>
                        updateEmployees(parseInt(e.target.value, 10))
                      }
                      className={inputClass}
                    />
                  </Field>
                  <p className="mt-2 pl-1 text-[12px] text-muted">
                    Your total updates as you change this.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-[15px] font-bold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark"
              >
                Continue to payment <ArrowRight size={17} />
              </button>
            </form>
          )}

          {/* ── Step 3: payment ── */}
          {step === "payment" && (
            <form onSubmit={handlePay}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-[17px] font-extrabold tracking-tight text-ink">
                  Payment method
                </h2>
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="flex items-center gap-1.5 rounded-full border-2 border-brand/20 px-4 py-2 text-[12px] font-semibold text-brand transition hover:bg-brand-soft"
                >
                  <Pencil size={13} /> Edit details
                </button>
              </div>

              {/* Tabs */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {payTabs.map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTab(key)}
                    className={clsx(
                      "flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 text-center transition",
                      tab === key
                        ? "border-brand bg-brand-soft text-brand"
                        : "border-line text-muted hover:border-brand/40 hover:text-ink",
                    )}
                  >
                    <Icon size={22} />
                    <span className="text-[12px] font-semibold leading-tight">
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Card */}
              {tab === "card" && (
                <div className="mt-7 space-y-4">
                  <Field label="Card number" Icon={CreditCard}>
                    <input
                      required
                      inputMode="numeric"
                      autoComplete="cc-number"
                      value={card}
                      onChange={(e) => formatCard(e.target.value)}
                      placeholder="1234  5678  9012  3456"
                      className={inputClass}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry date" Icon={Calendar}>
                      <input
                        required
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        value={expiry}
                        onChange={(e) => formatExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="CVV" Icon={Lock}>
                      <input
                        required
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        maxLength={4}
                        placeholder="•••"
                        className={inputClass}
                      />
                    </Field>
                  </div>
                  <Field label="Name on card" Icon={User}>
                    <input
                      required
                      autoComplete="cc-name"
                      defaultValue={company.contact}
                      placeholder="e.g. Kimberly A."
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Billing email" Icon={Mail}>
                    <input
                      required
                      type="email"
                      defaultValue={company.email}
                      placeholder="finance@shipafrica.com"
                      className={inputClass}
                    />
                  </Field>
                </div>
              )}

              {/* Bank transfer */}
              {tab === "bank" && (
                <div className="mt-7">
                  <p className="text-[13px] leading-relaxed text-muted">
                    Transfer {formatNaira(total)} to the account below, then
                    confirm your payment.
                  </p>
                  <div className="mt-4 divide-y divide-line rounded-2xl border border-dashed border-brand/30 bg-canvas px-5">
                    {[
                      ["Account Name", "Insuro Africa Group Ltd"],
                      ["Account Number", "0123456789"],
                      ["Bank", "GTBank"],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-center justify-between py-4 text-[13px]"
                      >
                        <span className="text-muted">{k}</span>
                        <span className="font-bold text-ink">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* USSD */}
              {tab === "ussd" && (
                <div className="mt-7 flex flex-col items-center rounded-2xl border border-dashed border-brand/30 bg-canvas px-6 py-12 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                    <Smartphone size={26} />
                  </span>
                  <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
                    Pay with your bank&apos;s USSD code. Your code and
                    instructions will appear here once USSD is connected.
                  </p>
                </div>
              )}

              <div className="mt-6 flex items-center gap-2.5 text-[12px] text-muted">
                <Lock size={14} className="shrink-0 text-emerald-500" />
                Payments are encrypted and processed securely. Insuro Africa
                never stores your card details.
              </div>

              <button
                type="submit"
                disabled={processing}
                className="mt-6 w-full rounded-full bg-brand py-4 text-[15px] font-bold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark disabled:cursor-wait disabled:opacity-80"
              >
                {processing
                  ? "Processing..."
                  : tab === "card"
                    ? `Pay ${formatNaira(total)} →`
                    : `I've paid ${formatNaira(total)} →`}
              </button>
            </form>
          )}

          {/* ── Step 4: confirmation ── */}
          {step === "confirmed" && (
            <div className="flex min-h-104 flex-col items-center justify-center text-center">
              <span className="relative flex h-24 w-24 items-center justify-center">
                <span className="animate-ring absolute inset-0 rounded-full bg-emerald-200" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                  <Check size={38} strokeWidth={3} />
                </span>
              </span>
              <h2 className="mt-7 text-2xl font-extrabold tracking-tight text-ink">
                Payment Confirmed!
              </h2>
              <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-muted">
                {formatNaira(total)} paid for {plan.name}. {company.name}&apos;s{" "}
                {employees} employees will be enrolled and covered within 48
                hours.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-brand px-7 py-3 text-[13px] font-semibold text-white transition hover:bg-brand-dark"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/plans"
                  className="rounded-full border-2 border-brand/20 px-7 py-3 text-[13px] font-semibold text-brand transition hover:bg-brand-soft"
                >
                  Browse more plans
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <aside className="rounded-4xl bg-white p-7 shadow-[0_25px_60px_-25px_rgba(15,58,140,0.35)] lg:sticky lg:top-28">
          <h2 className="text-[17px] font-extrabold tracking-tight text-ink">
            Order summary
          </h2>

          <div className="relative mt-5 flex items-center gap-4 overflow-hidden rounded-2xl bg-linear-to-br from-brand to-brand-dark p-4 text-white">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30">
              <PlanIcon size={21} />
            </span>
            <div className="relative min-w-0">
              <div className="truncate text-[14px] font-bold">{plan.name}</div>
              <div className="mt-0.5 text-[11px] text-white/70">
                {isHealth ? "Health Insurance" : "Life Assurance"} · {employees}{" "}
                employees
              </div>
            </div>
          </div>

          <dl className="mt-5 text-[13px]">
            {[
              ...(step !== "details" ? [["Billed to", company.name]] : []),
              ["Plan rate", `${formatNaira(plan.price)} / staff`],
              ["Employees covered", String(employees)],
              ["Subtotal", formatNaira(subtotal)],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between gap-4 border-b border-line py-3.5"
              >
                <dt className="text-muted">{k}</dt>
                <dd className="truncate text-right font-semibold text-ink">
                  {v}
                </dd>
              </div>
            ))}

            {applied && (
              <div className="flex items-center justify-between border-b border-line py-3.5">
                <dt className="text-emerald-600">
                  Discount ({Math.round(applied.pct * 100)}%)
                </dt>
                <dd className="font-semibold text-emerald-600">
                  −{formatNaira(discount)}
                </dd>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-line py-3.5">
              <dt className="text-muted">Processing fee</dt>
              <dd className="font-semibold text-ink">₦0</dd>
            </div>

            <div className="flex items-center justify-between pt-5">
              <dt className="text-[15px] font-extrabold text-ink">Due today</dt>
              <dd className="text-[22px] font-extrabold text-brand">
                {formatNaira(total)}
              </dd>
            </div>
          </dl>

          {/* Promo (hidden once paid) */}
          {!confirmed && (
            <div className="mt-6">
              {applied ? (
                <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Tag size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-bold text-emerald-800">
                      {applied.code} applied
                    </div>
                    <div className="text-[11px] text-emerald-700">
                      You saved {formatNaira(discount)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setApplied(null)}
                    aria-label="Remove promo code"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-emerald-700 transition hover:bg-emerald-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo}>
                  <div className="flex gap-2">
                    <input
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError("");
                      }}
                      placeholder="Promo code"
                      className="min-w-0 flex-1 rounded-full border border-line bg-canvas px-5 py-3 text-[13px] uppercase text-ink outline-none transition placeholder:normal-case placeholder:text-ink/35 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
                    />
                    <button
                      type="submit"
                      className="rounded-full border-2 border-brand/20 px-6 py-3 text-[13px] font-semibold text-brand transition hover:bg-brand-soft"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="mt-2 pl-2 text-[12px] text-red-600">
                      {promoError}
                    </p>
                  )}
                </form>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <Lock size={13} className="text-emerald-500" /> SSL Secured
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-500" /> NDPR
              Compliant
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
