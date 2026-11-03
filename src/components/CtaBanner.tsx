"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useModal } from "./ModalProvider";

export default function CtaBanner() {
  const { openModal } = useModal();

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-10 border-t border-line pt-14">
        <h2 className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-6xl">
          Ready to cover <span className="text-brand">your team?</span>
        </h2>

        <div className="flex flex-col items-start gap-4">
          <p className="max-w-xs text-[14px] leading-relaxed text-muted">
            Create your company account and start comparing plans in minutes.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => openModal("get-started")}
              className="group flex items-center gap-3 rounded-full bg-brand py-2 pl-7 pr-2 text-[13px] font-semibold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark"
            >
              Get Started
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand transition group-hover:translate-x-0.5">
                <ArrowRight size={16} />
              </span>
            </button>
            <Link
              href="/plans"
              className="text-[13px] font-semibold text-brand underline decoration-brand/30 underline-offset-4 transition hover:decoration-brand"
            >
              Browse all plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
