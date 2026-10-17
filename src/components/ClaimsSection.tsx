"use client";

import { ArrowRight, Car, MessageCircle, ShieldCheck } from "lucide-react";
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

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {claims.map(
          ({ title, desc, cta, modal, Icon, tile, glow, hover, btn }) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-4xl border border-line bg-white p-8 shadow-[0_10px_40px_-20px_rgba(15,58,140,0.25)] transition duration-300 hover:-translate-y-1.5 ${hover}`}
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
                className={`relative mt-6 flex w-full items-center justify-between rounded-full bg-[#0a0f1e] py-2 pl-7 pr-2 text-[13px] font-semibold text-white transition ${btn}`}
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
