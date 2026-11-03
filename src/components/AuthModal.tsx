"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import { loginUser, registerUser } from "@/lib/auth";
import Image from "next/image";
import insuro from "@/assets/insuro.png";

export type AuthMode = "signup" | "login";

const COVER_MS = 700; // blue panel sweeps across the whole modal
const RETRACT_MS = 700; // then slides out to the other side
const SUCCESS_MS = 1600;
const EASE = "cubic-bezier(0.77, 0, 0.18, 1)";

const copy = {
  signup: {
    title: "Get Started with Insuro",
    desc: "Create your company account and start comparing plans in minutes.",
    prompt: "Already have an account?",
    switchLabel: "Sign in",
  },
  login: {
    title: "Welcome back",
    desc: "Sign in to manage your plans, employees and claims.",
    prompt: "New to Insuro?",
    switchLabel: "Create account",
  },
} as const;

const perks = [
  "Pre-negotiated rates already locked in",
  "Transparent pricing, zero hassle",
  "Employees covered within 48 hours",
];

const inputClass =
  "w-full rounded-2xl border border-line bg-canvas py-3.5 pl-11 pr-4 text-[14px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:bg-surface focus:ring-4 focus:ring-brand/10";
const errClass = "!border-red-400 focus:!border-red-500 focus:!ring-red-500/10";

function AuthField({
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

export default function AuthModal({
  initialMode,
  onClose,
  onDone,
}: {
  initialMode: AuthMode;
  onClose: () => void;
  onDone: () => void;
}) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [covering, setCovering] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<{
    message: string;
    field?: "email" | "password";
  } | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [notice, setNotice] = useState("");
  const [done, setDone] = useState<{ title: string; note: string } | null>(
    null,
  );

  const busy = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };
  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  // Escape to close + lock page scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  /* ───── Switch sign up <-> sign in ───── */
  function switchMode() {
    if (busy.current || submitting || done) return;
    const next: AuthMode = mode === "signup" ? "login" : "signup";

    setError(null);
    setNotice("");
    setShowPw(false);

    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!desktop || reduce) {
      setMode(next);
      return;
    }

    busy.current = true;
    setCovering(true); // 1. blue sweeps over everything
    later(() => {
      setMode(next); // 2. swap the state while it's fully covered
      setCovering(false); // 3. blue slides out to the other side
    }, COVER_MS + 50);
    later(
      () => {
        busy.current = false;
      },
      COVER_MS + 50 + RETRACT_MS,
    );
  }

  /* ───── Submit ───── */
  function finish(title: string, note: string) {
    setDone({ title, note });
    later(onDone, SUCCESS_MS);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || busy.current) return;

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    setError(null);

    if (mode === "signup") {
      const password = get("password");
      if (password.length < 8) {
        setError({
          message: "Your password needs at least 8 characters.",
          field: "password",
        });
        return;
      }
      setSubmitting(true);
      const res = await registerUser({
        company: get("company"),
        name: get("name"),
        email: get("email"),
        size: get("size"),
        password,
      });
      setSubmitting(false);
      if (!res.ok) {
        setError({ message: res.error, field: res.field });
        return;
      }
      finish("Account created!", "Taking you to your dashboard…");
    } else {
      setSubmitting(true);
      const res = await loginUser(get("email"), get("password"));
      setSubmitting(false);
      if (!res.ok) {
        setError({ message: res.error, field: res.field });
        return;
      }
      finish(
        `Welcome back, ${res.user.name.split(" ")[0]}!`,
        "Taking you to your dashboard…",
      );
    }
  }

  /* ───── Derived ───── */
  const c = copy[mode];
  const panelStyle = covering
    ? { left: "0%", width: "100%" }
    : mode === "signup"
      ? { left: "0%", width: "42%" }
      : { left: "58%", width: "42%" };
  const closeLight = mode === "login" || covering;
  const emailErr = error?.field === "email";
  const pwErr = error?.field === "password";

  const passwordInput = (
    <AuthField label="Password" Icon={Lock}>
      <input
        name="password"
        type={showPw ? "text" : "password"}
        required
        autoComplete={mode === "signup" ? "new-password" : "current-password"}
        placeholder={
          mode === "signup" ? "At least 8 characters" : "Your password"
        }
        className={clsx(inputClass, "pr-12", pwErr && errClass)}
      />
      <button
        type="button"
        onClick={() => setShowPw((s) => !s)}
        aria-label={showPw ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:text-ink"
      >
        {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </AuthField>
  );

  return (
    <div
      className="fixed inset-0 z-100 overflow-y-auto bg-[#0a0f1e]/65 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-title"
          className="modal-in relative w-full max-w-4xl overflow-hidden rounded-4xl bg-surface shadow-[0_50px_100px_-20px_rgba(10,15,30,0.6)] md:min-h-160"
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={clsx(
              "absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30",
              !closeLight &&
                "md:bg-line/60 md:text-muted md:hover:bg-line md:hover:text-ink",
            )}
          >
            <X size={18} />
          </button>

          {/* Phones: blue header strip */}
          <div className="relative overflow-hidden bg-linear-to-br from-brand via-brand to-brand-dark px-7 pb-8 pt-7 text-white md:hidden">
            <div className="animate-ring absolute -bottom-20 -right-16 h-56 w-56 rounded-full border border-white/20" />
            <div className="relative flex items-center gap-2.5">
              <Image
                src={insuro}
                alt="Insuro Africa Logo"
                width={160}
                height={80}
                className="h-20 w-auto object-contain brightness-0 invert dark:brightness-100 dark:invert-0"
                priority
              />
            </div>
            <p className="relative mt-6 pr-10 text-2xl font-extrabold leading-tight tracking-tight">
              {c.title}
            </p>
            <p className="relative mt-2 text-[13px] leading-relaxed text-white/75">
              {c.desc}
            </p>
          </div>

          {/* Form side */}
          <div
            className={clsx(
              "relative z-0 flex flex-col justify-center p-7 sm:p-10 md:min-h-160 md:w-[58%] md:p-12",
              mode === "signup" ? "md:ml-[42%]" : "md:mr-[42%]",
            )}
          >
            {done ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="relative flex h-20 w-20 items-center justify-center">
                  <span className="animate-ring absolute inset-0 rounded-full bg-emerald-200" />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                    <Check size={30} strokeWidth={3} />
                  </span>
                </span>
                <h2
                  id="auth-title"
                  className="mt-6 text-2xl font-extrabold tracking-tight text-ink"
                >
                  {done.title}
                </h2>
                <p className="mt-2 text-[13px] text-muted">{done.note}</p>
                <Loader2 size={22} className="mt-6 animate-spin text-brand" />
              </div>
            ) : (
              <form key={mode} onSubmit={handleSubmit} className="space-y-4">
                <div className="pb-1">
                  <h2
                    id="auth-title"
                    className="text-[26px] font-extrabold tracking-tight text-ink"
                  >
                    {mode === "signup" ? "Create your account" : "Sign in"}
                  </h2>
                  <p className="mt-1.5 text-[13px] text-muted">
                    {mode === "signup"
                      ? "Tell us a little about your company."
                      : "Enter your details to continue."}
                  </p>
                </div>

                {mode === "signup" ? (
                  <>
                    <AuthField label="Company name" Icon={Building2}>
                      <input
                        name="company"
                        required
                        autoComplete="organization"
                        placeholder="e.g. ShipAfrica Ltd"
                        className={inputClass}
                      />
                    </AuthField>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <AuthField label="Your name" Icon={User}>
                        <input
                          name="name"
                          required
                          autoComplete="name"
                          placeholder="Full name"
                          className={inputClass}
                        />
                      </AuthField>
                      <AuthField label="Work email" Icon={Mail}>
                        <input
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="hr@company.com"
                          className={clsx(inputClass, emailErr && errClass)}
                        />
                      </AuthField>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <AuthField label="Number of employees" Icon={Users}>
                        <select
                          name="size"
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          {["1 – 10", "11 – 50", "51 – 200", "200+"].map(
                            (o) => (
                              <option key={o}>{o}</option>
                            ),
                          )}
                        </select>
                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                        />
                      </AuthField>
                      {passwordInput}
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 pt-1 text-[12px] leading-relaxed text-muted">
                      <input
                        type="checkbox"
                        name="terms"
                        required
                        className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
                      />
                      <span>
                        I agree to the{" "}
                        <a href="#" className="font-semibold text-brand">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="font-semibold text-brand">
                          Privacy Policy
                        </a>
                        .
                      </span>
                    </label>
                  </>
                ) : (
                  <>
                    <AuthField label="Work email" Icon={Mail}>
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="hr@company.com"
                        className={clsx(inputClass, emailErr && errClass)}
                      />
                    </AuthField>

                    <div>
                      {passwordInput}
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <p
                          className="text-[12px] text-muted"
                          aria-live="polite"
                        >
                          {notice}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setNotice("Password reset isn't set up yet.")
                          }
                          className="shrink-0 text-[12px] font-semibold text-brand transition hover:text-brand-dark"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {error && (
                  <p
                    role="alert"
                    className="rounded-2xl bg-red-50 px-4 py-3 text-[13px] leading-relaxed text-red-700"
                  >
                    {error.message}
                    {error.field === "email" && (
                      <>
                        {" "}
                        <button
                          type="button"
                          onClick={switchMode}
                          className="font-bold underline"
                        >
                          {mode === "signup"
                            ? "Sign in instead"
                            : "Create an account"}
                        </button>
                      </>
                    )}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-[14px] font-bold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark disabled:cursor-wait disabled:opacity-80"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      {mode === "signup" ? "Creating account…" : "Signing in…"}
                    </>
                  ) : (
                    <>
                      {mode === "signup" ? "Create account" : "Sign in"}
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                {/* Phones: the switch lives under the form */}
                <p className="pt-1 text-center text-[13px] text-muted md:hidden">
                  {c.prompt}{" "}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="font-bold text-brand"
                  >
                    {c.switchLabel}
                  </button>
                </p>
              </form>
            )}
          </div>

          {/* Desktop: the sliding blue panel (sweeps over the whole modal on switch) */}
          <div
            aria-hidden
            className="absolute inset-y-0 z-10 hidden overflow-hidden rounded-4xl bg-linear-to-br from-brand via-brand to-brand-dark md:block"
            style={{
              ...panelStyle,
              transition: `left ${COVER_MS}ms ${EASE}, width ${COVER_MS}ms ${EASE}`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.22) 1.5px, transparent 1.5px)",
                backgroundSize: "22px 22px",
                maskImage:
                  "linear-gradient(to bottom right, black 0%, transparent 70%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom right, black 0%, transparent 70%)",
              }}
            />
            <div className="animate-ring absolute -bottom-24 -right-20 h-72 w-72 rounded-full border border-white/20" />
            <div className="animate-ring absolute -bottom-40 -right-36 h-112 w-md rounded-full border border-white/10 [animation-delay:1.5s]" />
          </div>

          {/* Desktop: panel text (fades out while covering, back in after) */}
          <div
            aria-hidden={covering}
            className={clsx(
              "absolute inset-y-0 z-20 hidden w-[42%] flex-col justify-between p-10 text-white md:flex",
              mode === "signup" ? "left-0" : "left-[58%]",
            )}
            style={{
              opacity: covering ? 0 : 1,
              pointerEvents: covering ? "none" : "auto",
              transition: "opacity 250ms ease",
              transitionDelay: covering ? "0ms" : "400ms",
            }}
          >
            <div className="flex items-center gap-2.5">
              <Image
                src={insuro}
                alt="Insuro Africa Logo"
                width={160}
                height={80}
                className="h-20 w-auto object-contain brightness-0 invert dark:brightness-100 dark:invert-0"
                priority
              />
            </div>

            <div>
              <p className="text-[28px] font-extrabold leading-tight tracking-tight">
                {c.title}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-white/75">
                {c.desc}
              </p>
              <ul className="mt-6 space-y-3">
                {perks.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-[13px] text-white/90"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                      <Check size={11} strokeWidth={3.5} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[13px] text-white/75">{c.prompt}</p>
              <button
                type="button"
                onClick={switchMode}
                disabled={covering || submitting || !!done}
                className="mt-3 rounded-full border-2 border-white/60 px-7 py-2.5 text-[13px] font-semibold text-white transition hover:bg-white hover:text-brand disabled:opacity-60"
              >
                {c.switchLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
