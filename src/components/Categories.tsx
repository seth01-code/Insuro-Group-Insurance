"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bandage,
  Briefcase,
  Car,
  Home,
  HeartPulse,
  Plane,
  ShieldAlert,
  ShieldCheck,
  Ship,
  Smartphone,
  Sprout,
} from "lucide-react";
import clsx from "clsx";

const AUTOPLAY_MS = 3500;
const RESUME_AFTER_TOUCH_MS = 3000;

const categories = [
  {
    title: "Health Insurance",
    desc: "Compare HMO plans for your employees. Filter by budget, coverage, and hospital network.",
    meta: "8 HMO Partners",
    href: "/plans?type=health",
    image: "/images/cat-health.jpg",
    gradient: "linear-gradient(160deg, #dbeafe 0%, #60a5fa 100%)",
    Icon: HeartPulse,
  },
  {
    title: "Life Assurance",
    desc: "Group life and individual assurance plans. Protect your team and their families.",
    meta: "6 Providers",
    href: "/plans?type=life",
    image: "/images/cat-life.jpg",
    gradient: "linear-gradient(160deg, #e0f2fe 0%, #38bdf8 100%)",
    Icon: ShieldCheck,
  },
  {
    title: "Motor Insurance",
    desc: "Third-party, comprehensive, commercial vehicle, and fleet insurance.",
    meta: "2 Providers",
    href: "/plans?type=motor",
    image: "/images/cat-motor.jpg",
    gradient: "linear-gradient(160deg, #e0e7ff 0%, #818cf8 100%)",
    Icon: Car,
  },
  {
    title: "Electronic Device Insurance",
    desc: "Cover for phones, laptops, TVs, digital watches, POS machines, cameras, and projectors.",
    meta: "2 Providers",
    href: "/plans?type=electronics",
    image: "/images/cat-electronics.jpg",
    gradient: "linear-gradient(160deg, #cffafe 0%, #22d3ee 100%)",
    Icon: Smartphone,
  },
  {
    title: "Travel Insurance",
    desc: "International, Schengen, business, and family travel cover.",
    meta: "2 Providers",
    href: "/plans?type=travel",
    image: "/images/cat-travel.jpg",
    gradient: "linear-gradient(160deg, #e0f2fe 0%, #7dd3fc 100%)",
    Icon: Plane,
  },
  {
    title: "Home & Property Insurance",
    desc: "Homeowners’, household contents, fire and special perils, and commercial property cover.",
    meta: "2 Providers",
    href: "/plans?type=property",
    image: "/images/cat-property.jpg",
    gradient: "linear-gradient(160deg, #ede9fe 0%, #a78bfa 100%)",
    Icon: Home,
  },
  {
    title: "Business & SME Insurance",
    desc: "Business packages, public liability, employers’ liability, professional indemnity, and equipment cover.",
    meta: "2 Providers",
    href: "/plans?type=business",
    image: "/images/cat-business.jpg",
    gradient: "linear-gradient(160deg, #dbeafe 0%, #93c5fd 100%)",
    Icon: Briefcase,
  },
  {
    title: "Marine & Goods-in-Transit",
    desc: "Marine cargo, inland transit, and import/export cargo cover.",
    meta: "2 Providers",
    href: "/plans?type=marine",
    image: "/images/cat-marine.jpg",
    gradient: "linear-gradient(160deg, #cffafe 0%, #38bdf8 100%)",
    Icon: Ship,
  },
  {
    title: "Personal Accident Insurance",
    desc: "Individual, family, and group accident cover.",
    meta: "2 Providers",
    href: "/plans?type=accident",
    image: "/images/cat-accident.jpg",
    gradient: "linear-gradient(160deg, #e0e7ff 0%, #6366f1 100%)",
    Icon: Bandage,
  },
  {
    title: "Agricultural Insurance",
    desc: "Crop, livestock, and agricultural equipment cover.",
    meta: "2 Providers",
    href: "/plans?type=agriculture",
    image: "/images/cat-agriculture.jpg",
    gradient: "linear-gradient(160deg, #dcfce7 0%, #4ade80 100%)",
    Icon: Sprout,
  },
  {
    title: "Specialised Commercial",
    desc: "Cyber, directors’ and officers’ liability, contractors’ all risks, and other specialist covers.",
    meta: "2 Providers",
    href: "/plans?type=specialised",
    image: "/images/cat-specialised.jpg",
    gradient: "linear-gradient(160deg, #e0e7ff 0%, #818cf8 100%)",
    Icon: ShieldAlert,
  },
];

export default function Categories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState(0);

  /** Distance between one card's left edge and the next (card width + gap). */
  const getStep = useCallback(() => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    const second = track?.children[1] as HTMLElement | undefined;
    if (!first) return 300;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  }, []);

  const atEnd = useCallback(() => {
    const t = trackRef.current;
    return !!t && t.scrollLeft + t.clientWidth >= t.scrollWidth - 4;
  }, []);

  const goNext = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    if (atEnd()) t.scrollTo({ left: 0, behavior: "smooth" });
    else t.scrollBy({ left: getStep(), behavior: "smooth" });
  }, [atEnd, getStep]);

  const goPrev = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    if (t.scrollLeft <= 4)
      t.scrollTo({ left: t.scrollWidth, behavior: "smooth" });
    else t.scrollBy({ left: -getStep(), behavior: "smooth" });
  }, [getStep]);

  function goTo(i: number) {
    trackRef.current?.scrollTo({ left: i * getStep(), behavior: "smooth" });
  }

  // Keep the dots in sync with wherever the track is scrolled to
  function handleScroll() {
    const t = trackRef.current;
    if (!t) return;
    const idx = atEnd()
      ? categories.length - 1
      : Math.round(t.scrollLeft / getStep());
    setActive(Math.min(categories.length - 1, Math.max(0, idx)));
  }

  // Autoplay (skipped for people who prefer reduced motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!pausedRef.current) goNext();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [goNext]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  function pause() {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    pausedRef.current = true;
  }

  function resume(delay = 0) {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    if (delay === 0) {
      pausedRef.current = false;
      return;
    }
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, delay);
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid items-center gap-10 lg:grid-cols-[18rem_1fr]">
        {/* Left: heading */}
        <div>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink">
            What are you
            <br />
            <span className="text-brand">looking for?</span>
          </h2>
          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            Select a category to browse plans and compare providers.
          </p>
          <div className="mt-8 flex items-center gap-4 text-brand">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="transition hover:text-brand-dark"
            >
              <ArrowLeft size={22} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="transition hover:text-brand-dark"
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </div>

        {/* Right: slider */}
        <div
          className="min-w-0"
          onMouseEnter={pause}
          onMouseLeave={() => resume()}
          onFocus={pause}
          onBlur={() => resume()}
          onTouchStart={pause}
          onTouchEnd={() => resume(RESUME_AFTER_TOUCH_MS)}
        >
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-6 scrollbar-none lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((c, i) => (
              <Link
                key={c.href}
                href={c.href}
                className="group w-[18rem] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-15px_rgba(15,58,140,0.25)] transition hover:-translate-y-1 sm:w-[20rem]"
              >
                {/* Image area. Drop a photo at the path above; gradient shows until then. */}
                <div
                  className="relative h-52 bg-cover bg-center"
                  style={{ backgroundImage: `url(${c.image}), ${c.gradient}` }}
                >
                  <span className="absolute left-4 top-3 text-sm font-semibold text-white/90">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <c.Icon
                    size={56}
                    strokeWidth={1.25}
                    className="absolute inset-0 m-auto text-white/70"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[15px] font-bold text-ink">
                      {c.title}
                    </h3>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-muted">
                    {c.desc}
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-brand-soft px-3 py-1 text-[11px] font-semibold text-brand">
                    {c.meta}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {categories.map((c, i) => (
              <button
                key={c.href}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${c.title}`}
                aria-current={active === i}
                className={clsx(
                  "h-2 rounded-full transition-all duration-300",
                  active === i
                    ? "w-8 bg-brand"
                    : "w-2 bg-brand/25 hover:bg-brand/50",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
