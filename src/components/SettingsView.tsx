"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  Bell,
  Briefcase,
  Building2,
  Check,
  ImagePlus,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Monitor,
  Moon,
  Palette,
  Phone,
  ShieldCheck,
  Smartphone,
  Sun,
  Trash2,
  User,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import { applyPref, getPref, subscribePref, type ThemePref } from "@/lib/theme";

/* ───────── Sample data (replace with backend data later) ───────── */

const MOCK_PROFILE = {
  name: "ShipAfrica Ltd",
  contact: "Kimberly A.",
  role: "HR Admin",
  email: "hr@shipafrica.com",
  phone: "+234 801 234 5678",
  address: "22 Marina Road, Lagos Island, Lagos",
};
type Profile = typeof MOCK_PROFILE;

const profileFields: {
  name: keyof Profile;
  label: string;
  Icon: LucideIcon;
  type?: string;
  full?: boolean;
}[] = [
  { name: "name", label: "Company name", Icon: Building2, full: true },
  { name: "contact", label: "Contact person", Icon: User },
  { name: "role", label: "Role", Icon: Briefcase },
  { name: "email", label: "Work email", Icon: Mail, type: "email" },
  { name: "phone", label: "Phone number", Icon: Phone, type: "tel" },
  { name: "address", label: "Company address", Icon: MapPin, full: true },
];

const notificationOptions = [
  {
    key: "payments",
    label: "Payment confirmations",
    desc: "A receipt whenever a payment goes through",
  },
  {
    key: "renewals",
    label: "Renewal reminders",
    desc: "A heads-up before your plans renew",
  },
  {
    key: "claims",
    label: "Claim updates",
    desc: "Status changes on any claim you've filed",
  },
  {
    key: "plans",
    label: "New plans in your budget",
    desc: "When a provider adds a plan that fits",
  },
  {
    key: "news",
    label: "Product news",
    desc: "Occasional updates from Insuro Africa",
  },
] as const;
type NotifKey = (typeof notificationOptions)[number]["key"];

const sections: { id: string; label: string; Icon: LucideIcon }[] = [
  { id: "profile", label: "Profile", Icon: Building2 },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "appearance", label: "Appearance", Icon: Palette },
  { id: "security", label: "Security", Icon: ShieldCheck },
];

const inputClass =
  "w-full rounded-2xl border border-line bg-canvas py-3.5 pl-11 pr-4 text-[14px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:bg-surface focus:ring-4 focus:ring-brand/10";

/* ───────── Small pieces ───────── */

// Title + description on the left, controls on the right. No card.
function Section({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="grid scroll-mt-40 gap-8 border-t border-line py-12 first:border-t-0 first:pt-8 lg:grid-cols-[15rem_1fr] lg:gap-14 md:scroll-mt-24"
    >
      <div>
        <h2 className="text-[18px] font-extrabold tracking-tight text-ink">
          {title}
        </h2>
        <p className="mt-2 max-w-60 text-[13px] leading-relaxed text-muted">
          {desc}
        </p>
      </div>
      <div className="min-w-0 max-w-2xl">{children}</div>
    </section>
  );
}

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

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={clsx(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors",
        checked ? "bg-brand" : "bg-line",
      )}
    >
      <span
        className={clsx(
          "absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}

/* ───────── Page ───────── */

export default function SettingsView() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);
  function flash(setter: (v: boolean) => void) {
    setter(true);
    timers.current.push(setTimeout(() => setter(false), 2200));
  }

  /* Section nav + scroll-spy */
  const [active, setActive] = useState("profile");
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Profile */
  const [saved, setSaved] = useState<Profile>(MOCK_PROFILE);
  const [profile, setProfile] = useState<Profile>(MOCK_PROFILE);
  const [justSaved, setJustSaved] = useState(false);
  const dirty = JSON.stringify(profile) !== JSON.stringify(saved);

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    // Mock: save the company profile to your backend here
    setSaved(profile);
    flash(setJustSaved);
  }

  /* Logo (mock preview) */
  const [logo, setLogo] = useState<string | null>(null);
  useEffect(() => {
    return () => {
      if (logo) URL.revokeObjectURL(logo);
    };
  }, [logo]);

  function pickLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Mock: upload the file to your backend here
    setLogo(URL.createObjectURL(file));
    e.target.value = "";
  }

  /* Notifications (autosave) */
  const [notifs, setNotifs] = useState<Record<NotifKey, boolean>>({
    payments: true,
    renewals: true,
    claims: true,
    plans: true,
    news: false,
  });
  const [notifSaved, setNotifSaved] = useState(false);

  function toggleNotif(key: NotifKey, value: boolean) {
    setNotifs((n) => ({ ...n, [key]: value }));
    // Mock: save the notification preference to your backend here
    flash(setNotifSaved);
  }

  /* Appearance */
  const pref = useSyncExternalStore<ThemePref>(
    subscribePref,
    getPref,
    () => "system",
  );
  const themeOptions: {
    key: ThemePref;
    label: string;
    Icon: LucideIcon;
    preview: string;
  }[] = [
    { key: "light", label: "Light", Icon: Sun, preview: "bg-[#f8faff]" },
    { key: "dark", label: "Dark", Icon: Moon, preview: "bg-[#080c17]" },
    {
      key: "system",
      label: "System",
      Icon: Monitor,
      preview: "bg-gradient-to-r from-[#f8faff] from-50% to-[#080c17] to-50%",
    },
  ];

  /* Security */
  const [twoFactor, setTwoFactor] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (pw.next.length < 8) {
      setPwError("Your new password needs at least 8 characters.");
      return;
    }
    if (pw.next !== pw.confirm) {
      setPwError("The new passwords don't match.");
      return;
    }
    if (pw.next === pw.current) {
      setPwError("Choose a password you haven't used before.");
      return;
    }
    // Mock: send the password change to your backend here
    setPwError("");
    setPw({ current: "", next: "", confirm: "" });
    flash(setPwSaved);
  }

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div className="px-5 pt-8 sm:px-8 lg:pt-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Settings
        </h1>
        <p className="mt-2 text-[14px] text-muted">
          Manage your company profile, alerts and account security
        </p>

        {/* Sticky section nav */}
        <nav
          aria-label="Settings sections"
          className="sticky top-17 z-30 -mx-5 mt-8 flex gap-2 overflow-x-auto border-b border-line bg-canvas/90 px-5 py-3 backdrop-blur [-ms-overflow-style:none] scrollbar-none sm:-mx-8 sm:px-8 md:top-0 [&::-webkit-scrollbar]:hidden"
        >
          {sections.map(({ id, label, Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setActive(id)}
              className={clsx(
                "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition",
                active === id
                  ? "bg-brand text-white shadow-sm"
                  : "text-muted hover:bg-brand-soft hover:text-ink",
              )}
            >
              <Icon size={15} />
              {label}
            </a>
          ))}
        </nav>

        {/* ───── Profile ───── */}
        <Section
          id="profile"
          title="Company profile"
          desc="The details we use on invoices and policy documents."
        >
          {/* Logo */}
          <div className="flex flex-wrap items-center gap-5">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-sky-400 to-brand text-[22px] font-extrabold text-white shadow-lg">
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt="" className="h-full w-full object-cover" />
              ) : (
                initials || "—"
              )}
            </span>
            <div>
              <div className="flex flex-wrap gap-2">
                <label className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-brand/20 px-5 py-2.5 text-[13px] font-semibold text-brand transition hover:bg-brand-soft">
                  <ImagePlus size={15} />
                  {logo ? "Change logo" : "Upload logo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={pickLogo}
                    className="sr-only"
                  />
                </label>
                {logo && (
                  <button
                    type="button"
                    onClick={() => setLogo(null)}
                    className="flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold text-muted transition hover:bg-brand-soft hover:text-ink"
                  >
                    <Trash2 size={15} /> Remove
                  </button>
                )}
              </div>
              <p className="mt-2 text-[12px] text-muted">
                PNG or JPG, square works best.
              </p>
            </div>
          </div>

          <form
            id="profile-form"
            onSubmit={saveProfile}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {profileFields.map((f) => (
              <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                <Field label={f.label} Icon={f.Icon}>
                  <input
                    required
                    type={f.type ?? "text"}
                    value={profile[f.name]}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, [f.name]: e.target.value }))
                    }
                    className={inputClass}
                  />
                </Field>
              </div>
            ))}
          </form>

          <p
            className={clsx(
              "mt-5 flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600 transition-opacity",
              justSaved ? "opacity-100" : "opacity-0",
            )}
            aria-live="polite"
          >
            <Check size={14} strokeWidth={3} /> Changes saved
          </p>
        </Section>

        {/* ───── Notifications ───── */}
        <Section
          id="notifications"
          title="Notifications"
          desc="Choose what we email to your work address."
        >
          <ul className="divide-y divide-line">
            {notificationOptions.map((o) => (
              <li
                key={o.key}
                className="flex items-center justify-between gap-6 py-5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-ink">
                    {o.label}
                  </div>
                  <div className="mt-0.5 text-[12px] text-muted">{o.desc}</div>
                </div>
                <Switch
                  checked={notifs[o.key]}
                  onChange={(v) => toggleNotif(o.key, v)}
                  label={o.label}
                />
              </li>
            ))}
          </ul>
          <p
            className={clsx(
              "mt-5 flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600 transition-opacity",
              notifSaved ? "opacity-100" : "opacity-0",
            )}
            aria-live="polite"
          >
            <Check size={14} strokeWidth={3} /> Preference saved
          </p>
        </Section>

        {/* ───── Appearance ───── */}
        <Section
          id="appearance"
          title="Appearance"
          desc="Pick how Insuro Africa looks on this device."
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {themeOptions.map(({ key, label, Icon, preview }) => {
              const selected = pref === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => applyPref(key)}
                  aria-pressed={selected}
                  className={clsx(
                    "rounded-2xl border-2 p-3 text-left transition",
                    selected
                      ? "border-brand bg-brand-soft"
                      : "border-line hover:border-brand/40",
                  )}
                >
                  <span
                    className={clsx(
                      "block h-16 rounded-xl border border-line",
                      preview,
                    )}
                  />
                  <span className="mt-3 flex items-center gap-2 px-1">
                    <Icon
                      size={16}
                      className={selected ? "text-brand" : "text-muted"}
                    />
                    <span
                      className={clsx(
                        "flex-1 text-[13px] font-semibold",
                        selected ? "text-brand" : "text-ink",
                      )}
                    >
                      {label}
                    </span>
                    {selected && (
                      <Check size={15} strokeWidth={3} className="text-brand" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-[12px] text-muted">
            System follows your device&apos;s light or dark setting.
          </p>
        </Section>

        {/* ───── Security ───── */}
        <Section
          id="security"
          title="Security"
          desc="Keep your company's account protected."
        >
          {/* Two-factor */}
          <div className="flex items-center justify-between gap-6 border-b border-line pb-7">
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Smartphone size={20} />
              </span>
              <div className="min-w-0">
                <div className="text-[14px] font-semibold text-ink">
                  Two-factor authentication
                </div>
                <div className="mt-0.5 text-[12px] text-muted">
                  {twoFactor
                    ? "On. We'll ask for a code when you sign in."
                    : "Add a one-time code to your sign-in."}
                </div>
              </div>
            </div>
            {/* Mock: enable 2FA with your backend here */}
            <Switch
              checked={twoFactor}
              onChange={setTwoFactor}
              label="Two-factor authentication"
            />
          </div>

          {/* Change password */}
          <form onSubmit={changePassword} className="pt-7">
            <h3 className="text-[14px] font-bold text-ink">Change password</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Current password" Icon={Lock}>
                  <input
                    required
                    type="password"
                    autoComplete="current-password"
                    value={pw.current}
                    onChange={(e) => setPw({ ...pw, current: e.target.value })}
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="New password" Icon={KeyRound}>
                <input
                  required
                  type="password"
                  autoComplete="new-password"
                  value={pw.next}
                  onChange={(e) => {
                    setPw({ ...pw, next: e.target.value });
                    setPwError("");
                  }}
                  placeholder="At least 8 characters"
                  className={inputClass}
                />
              </Field>
              <Field label="Confirm new password" Icon={KeyRound}>
                <input
                  required
                  type="password"
                  autoComplete="new-password"
                  value={pw.confirm}
                  onChange={(e) => {
                    setPw({ ...pw, confirm: e.target.value });
                    setPwError("");
                  }}
                  className={inputClass}
                />
              </Field>
            </div>

            {pwError && (
              <p className="mt-3 pl-1 text-[12px] text-red-600" role="alert">
                {pwError}
              </p>
            )}

            <div className="mt-6">
              <button
                type="submit"
                className={clsx(
                  "flex items-center gap-2 rounded-full px-7 py-3 text-[13px] font-semibold text-white transition",
                  pwSaved
                    ? "bg-emerald-600"
                    : "bg-brand shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] hover:bg-brand-dark",
                )}
              >
                {pwSaved ? (
                  <>
                    <Check size={16} strokeWidth={3} /> Password updated
                  </>
                ) : (
                  "Update password"
                )}
              </button>
            </div>
          </form>
        </Section>

        {/* ───── Unsaved changes bar (profile) ───── */}
        {dirty && (
          <div className="modal-in sticky bottom-4 z-30 mt-2 flex flex-wrap items-center justify-between gap-3 rounded-full border border-line bg-surface px-5 py-3 shadow-[0_20px_50px_-15px_rgba(15,58,140,0.45)]">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              You have unsaved changes
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setProfile(saved)}
                className="rounded-full px-5 py-2.5 text-[13px] font-semibold text-muted transition hover:bg-brand-soft hover:text-ink"
              >
                Discard
              </button>
              <button
                type="submit"
                form="profile-form"
                className="rounded-full bg-brand px-6 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-dark"
              >
                Save changes
              </button>
            </div>
          </div>
        )}

        <div className="h-16" />
      </div>
    </div>
  );
}
