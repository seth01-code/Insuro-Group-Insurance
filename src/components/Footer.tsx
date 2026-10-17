/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import insuro from "@/assets/insuro.png";


const columns = [
  {
    title: "Explore",
    links: [
      { label: "Health Insurance", href: "/plans?type=health" },
      { label: "Life Assurance", href: "/plans?type=life" },
      { label: "General Insurance", href: "/plans?type=general" },
    ],
  },
  {
    title: "Claims",
    links: [
      { label: "Car Insurance Claim", href: "/plans#claims" },
      { label: "Life Insurance Claim", href: "/plans#claims" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Insurance", href: "/plans" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
];

const contacts = [
  { Icon: MapPin, text: "14 Adeola Odeku Street, Victoria Island, Lagos" },
  { Icon: Phone, text: "+234 800 123 4567" },
  { Icon: Mail, text: "hello@insuro.africa" },
  { Icon: Clock, text: "Mon – Fri, 8:00 AM – 6:00 PM (WAT)" },
];

const socials = [
  {
    label: "X",
    href: "#",
    icon: (
      <path d="M18.9 3h3.1l-6.8 7.7L23 21h-6.2l-4.9-6.3L6.3 21H3.2l7.3-8.3L1 3h6.4l4.4 5.8zm-1.1 16.2h1.7L6.3 4.7H4.5z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.75 9.75h3.83v1.54h.06c.53-.96 1.84-1.97 3.78-1.97 4.04 0 4.78 2.55 4.78 5.87V21h-4v-5.1c0-1.22-.02-2.78-1.74-2.78-1.74 0-2 1.33-2 2.69V21h-4z" />
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5h1.65V3.7c-.3 0-1.25-.1-2.4-.1-2.4 0-4 1.45-4 4.1v2.2H7.6V13h2.7v8z" />
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <>
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.2" cy="6.8" r="1.2" />
      </>
    ),
  },
];

const legal = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  // Fixed value for prerender, then updated on the client
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    // Mock: wire to your newsletter service later
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  }

  return (
    <footer className="mt-10 bg-[#0a0f1e] text-white">
      <div className="mx-auto max-w-6xl px-5 pt-16">
        {/* Newsletter band */}
        <div className="flex flex-col gap-6 rounded-3xl bg-brand px-7 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-extrabold leading-tight">
              Stay in the loop
            </h3>
            <p className="mt-1 text-[13px] text-white/70">
              Plan updates, new HMO partners, and renewal reminders. No spam.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-md items-center gap-2 rounded-full bg-white p-1.5 md:w-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hr@company.com"
              className="min-w-0 flex-1 bg-transparent px-4 text-[13px] text-ink outline-none placeholder:text-ink/40"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-dark"
            >
              {subscribed ? "Subscribed ✓" : "Subscribe"}
              {!subscribed && <ArrowRight size={14} />}
            </button>
          </form>
        </div>

        {/* Main grid */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          {/* Brand + contact */}
          <div>
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
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-white/60">
              Compare plans from Nigeria&apos;s top HMOs and insurance
              providers. Pre-negotiated rates, transparent pricing, zero hassle.
            </p>

            <ul className="mt-6 space-y-3">
              {contacts.map(({ Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 text-[13px] text-white/70"
                >
                  <Icon size={15} className="mt-0.5 shrink-0 text-sky-400" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-brand hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-white/70 transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Regulatory note */}
        <p className="mt-12 border-t border-white/10 pt-6 text-[11px] leading-relaxed text-white/40">
          Insuro Africa Group Ltd (RC 1234567) is an insurance marketplace. All
          plans are underwritten by NAICOM-licensed insurers and NHIA-accredited
          HMOs. Plan prices shown are per staff, per month, and may vary by
          group size and underwriting.
        </p>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 py-6 text-[12px] text-white/40 md:flex-row md:items-center md:justify-between">
          <span>© {year} Insuro Africa Group. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="transition hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <span>NDPR Compliant · SSL Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
