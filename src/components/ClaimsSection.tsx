"use client";

import {
  ArrowRight,
  Bandage,
  Briefcase,
  Car,
  HeartPulse,
  Home,
  MessageCircle,
  Plane,
  ShieldAlert,
  ShieldCheck,
  Ship,
  Smartphone,
  Sprout,
} from "lucide-react";
import type { ModalType } from "@/lib/modals";
import { useModal } from "./ModalProvider";

const claims: {
  title: string;
  desc: string;
  cta: string;
  modal: ModalType;
  Icon: typeof Car;
  tile: string;
  glow: string;
  hover: string;
  btn: string;
}[] = [
  {
    title: "Car Insurance Claim",
    desc: "Accident, theft, or damage to a company or personal vehicle covered under an Insuro Africa motor policy.",
    cta: "Start a Car Claim",
    modal: "claim-car",
    Icon: Car,
    tile: "from-red-500 to-red-700",
    glow: "bg-red-50",
    hover:
      "hover:border-red-200 hover:shadow-[0_25px_50px_-20px_rgba(220,38,38,0.35)]",
    btn: "group-hover:bg-red-600",
  },
  {
    title: "Life Insurance Claim",
    desc: "Death benefit, critical illness, or disability claim under a group or individual life assurance plan.",
    cta: "Start a Life Claim",
    modal: "claim-life",
    Icon: ShieldCheck,
    tile: "from-emerald-400 to-emerald-600",
    glow: "bg-emerald-50",
    hover:
      "hover:border-emerald-200 hover:shadow-[0_25px_50px_-20px_rgba(5,150,105,0.35)]",
    btn: "group-hover:bg-emerald-600",
  },
  {
    title: "Health Insurance Claim",
    desc: "Reimbursement or authorisation issues for treatment under a corporate, group, individual, or family health plan.",
    cta: "Start a Health Claim",
    modal: "claim-health",
    Icon: HeartPulse,
    tile: "from-sky-400 to-sky-600",
    glow: "bg-sky-50",
    hover:
      "hover:border-sky-200 hover:shadow-[0_25px_50px_-20px_rgba(2,132,199,0.35)]",
    btn: "group-hover:bg-sky-600",
  },
  {
    title: "Device Insurance Claim",
    desc: "Theft, accidental damage, or breakdown of a covered phone, laptop, TV, POS machine, camera, or projector.",
    cta: "Start a Device Claim",
    modal: "claim-electronics",
    Icon: Smartphone,
    tile: "from-cyan-400 to-cyan-600",
    glow: "bg-cyan-50",
    hover:
      "hover:border-cyan-200 hover:shadow-[0_25px_50px_-20px_rgba(8,145,178,0.35)]",
    btn: "group-hover:bg-cyan-600",
  },
  {
    title: "Travel Insurance Claim",
    desc: "Medical emergencies, trip cancellation, delays, or lost baggage on an international, Schengen, business, or family trip.",
    cta: "Start a Travel Claim",
    modal: "claim-travel",
    Icon: Plane,
    tile: "from-blue-400 to-blue-600",
    glow: "bg-blue-50",
    hover:
      "hover:border-blue-200 hover:shadow-[0_25px_50px_-20px_rgba(37,99,235,0.35)]",
    btn: "group-hover:bg-blue-600",
  },
  {
    title: "Home & Property Claim",
    desc: "Fire, flooding, theft, or damage to a home, household contents, or commercial property.",
    cta: "Start a Property Claim",
    modal: "claim-property",
    Icon: Home,
    tile: "from-violet-400 to-violet-600",
    glow: "bg-violet-50",
    hover:
      "hover:border-violet-200 hover:shadow-[0_25px_50px_-20px_rgba(124,58,237,0.35)]",
    btn: "group-hover:bg-violet-600",
  },
  {
    title: "Business & SME Claim",
    desc: "Liability, professional indemnity, or equipment losses under a business package or SME policy.",
    cta: "Start a Business Claim",
    modal: "claim-business",
    Icon: Briefcase,
    tile: "from-indigo-400 to-indigo-600",
    glow: "bg-indigo-50",
    hover:
      "hover:border-indigo-200 hover:shadow-[0_25px_50px_-20px_rgba(79,70,229,0.35)]",
    btn: "group-hover:bg-indigo-600",
  },
  {
    title: "Marine & Transit Claim",
    desc: "Loss or damage to cargo on marine, inland, or import/export shipments.",
    cta: "Start a Marine Claim",
    modal: "claim-marine",
    Icon: Ship,
    tile: "from-teal-400 to-teal-600",
    glow: "bg-teal-50",
    hover:
      "hover:border-teal-200 hover:shadow-[0_25px_50px_-20px_rgba(13,148,136,0.35)]",
    btn: "group-hover:bg-teal-600",
  },
  {
    title: "Personal Accident Claim",
    desc: "Injury, disability, or death benefit claims under an individual, family, or group accident policy.",
    cta: "Start an Accident Claim",
    modal: "claim-accident",
    Icon: Bandage,
    tile: "from-orange-400 to-orange-600",
    glow: "bg-orange-50",
    hover:
      "hover:border-orange-200 hover:shadow-[0_25px_50px_-20px_rgba(234,88,12,0.35)]",
    btn: "group-hover:bg-orange-600",
  },
  {
    title: "Agricultural Claim",
    desc: "Crop failure, livestock loss, or damage to covered agricultural equipment.",
    cta: "Start an Agric Claim",
    modal: "claim-agriculture",
    Icon: Sprout,
    tile: "from-lime-400 to-lime-600",
    glow: "bg-lime-50",
    hover:
      "hover:border-lime-200 hover:shadow-[0_25px_50px_-20px_rgba(101,163,13,0.35)]",
    btn: "group-hover:bg-lime-600",
  },
  {
    title: "Specialised Commercial Claim",
    desc: "Cyber incidents, directors’ and officers’ liability, contractors’ all risks, and other specialist covers.",
    cta: "Start a Specialised Claim",
    modal: "claim-specialised",
    Icon: ShieldAlert,
    tile: "from-slate-500 to-slate-700",
    glow: "bg-slate-100",
    hover:
      "hover:border-slate-300 hover:shadow-[0_25px_50px_-20px_rgba(51,65,85,0.35)]",
    btn: "group-hover:bg-slate-700",
  },
];

export default function ClaimsSection() {
  const { openModal } = useModal();

  return (
    <section id="claims" className="scroll-mt-24 pb-4 pt-6">
      <div className="max-w-xl">
        <span className="inline-block rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-red-700">
          Claims
        </span>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          Already covered? File a claim in minutes
        </h2>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted">
          No login required to start. Our claims team will confirm your policy
          and follow up directly.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {claims.map(
          ({ title, desc, cta, modal, Icon, tile, glow, hover, btn }) => (
            <div
              key={modal}
              className={`group relative flex flex-col overflow-hidden rounded-4xl border border-line bg-white p-8 shadow-[0_10px_40px_-20px_rgba(15,58,140,0.25)] transition duration-300 hover:-translate-y-1.5 ${hover}`}
            >
              <div
                aria-hidden
                className={`absolute -right-14 -top-14 h-44 w-44 rounded-full ${glow} transition duration-500 group-hover:scale-125`}
              />
              <span
                className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg ${tile}`}
              >
                <Icon size={28} strokeWidth={1.75} />
              </span>
              <h3 className="relative mt-6 text-[20px] font-extrabold tracking-tight text-ink">
                {title}
              </h3>
              <p className="relative mt-2 max-w-sm text-[13px] leading-relaxed text-muted">
                {desc}
              </p>
              <div className="relative mt-6 flex items-center gap-2 text-[12px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Avg. response time: 24 hours
              </div>
              <button
                type="button"
                onClick={() => openModal(modal)}
                className={`relative mt-auto flex w-full items-center justify-between rounded-full bg-[#0a0f1e] py-2 pl-7 pr-2 text-[13px] font-semibold text-white transition ${btn}`}
              >
                {cta}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink">
                  <ArrowRight size={16} />
                </span>
              </button>
            </div>
          ),
        )}
      </div>

      <div className="relative mt-8 flex flex-wrap items-center gap-4 overflow-hidden rounded-4xl bg-[#0a0f1e] px-7 py-6">
        <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full border border-white/10" />
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/5" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300">
          <MessageCircle size={20} />
        </span>
        <p className="relative text-[13px] text-white/80">
          <strong className="text-white">Not sure which policy applies?</strong>{" "}
          Talk to a claims specialist before you start.
        </p>
        <button
          type="button"
          className="relative ml-auto rounded-full border border-white/25 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-white/10"
        >
          Chat with us
        </button>
      </div>
    </section>
  );
}
