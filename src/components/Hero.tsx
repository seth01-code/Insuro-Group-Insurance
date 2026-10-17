import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const avatars = [
  { initials: "AO", bg: "from-sky-400 to-blue-600" },
  { initials: "CN", bg: "from-indigo-400 to-blue-700" },
  { initials: "FA", bg: "from-cyan-400 to-blue-500" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-28 lg:pt-36">
      {/* Soft background glow behind the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-136 w-136 rounded-full bg-brand-soft opacity-80 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: photo wrapper. The blue panel is anchored to this, not the viewport. */}
        <div className="relative order-2 w-full max-w-104 lg:order-1">
          {/* Blue panel */}
          <div
            aria-hidden
            className="absolute -bottom-16 -top-36 right-[34%] hidden w-screen overflow-hidden rounded-br-[7rem] bg-linear-to-br from-brand via-brand to-brand-dark lg:block"
          >
            {/* Dot grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.22) 1.5px, transparent 1.5px)",
                backgroundSize: "24px 24px",
                maskImage:
                  "linear-gradient(to bottom right, transparent 10%, black 60%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom right, transparent 10%, black 60%)",
              }}
            />
            {/* Faint rings */}
            <div className="animate-ring absolute -bottom-24 right-0 h-72 w-72 rounded-full border border-white/20" />
            <div className="animate-ring absolute -bottom-40 -right-16 h-96 w-96 rounded-full border border-white/10 [animation-delay:1.5s]" />
          </div>

          {/* Offset arch outlines behind the photo */}
          <div
            aria-hidden
            className="animate-drift absolute inset-0 rounded-t-[13rem] border-2 border-brand/25"
          />
          <div
            aria-hidden
            className="animate-drift-far absolute inset-0 rounded-t-[13rem] border border-brand/15"
          />

          {/* Arched photo card */}
          <div className="relative overflow-hidden rounded-t-[13rem] bg-brand-soft shadow-[0_30px_70px_-20px_rgba(15,58,140,0.45)]">
            {/* Put your photo at public/images/hero-family.jpg. Gradient shows until then. */}
            <div
              className="h-120 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(/images/hero-family.jpg), linear-gradient(160deg, #dbeafe 0%, #93c5fd 100%)",
              }}
            />
            <div className="flex items-stretch bg-white">
              <p className="flex-1 px-4 py-3.5 text-[12px] leading-snug text-ink">
                Pre-negotiated rates already locked in. Your employees are
                enrolled and covered within 48 hours.
              </p>
              <Link
                href="/plans"
                aria-label="Browse plans"
                className="flex w-16 items-center justify-center bg-sky-400 text-white transition hover:bg-sky-500"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white">
                  <Play size={12} fill="currentColor" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: copy from the Insuro artifact. Only this content animates in. */}
        <div className="order-1 lg:order-2">
          <h1 className="reveal text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            The{" "}
            <span className="relative inline-block text-brand">
              smartest way
              <svg
                aria-hidden
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full"
              >
                {/* pathLength="1" lets the draw animation use 0 to 1 at any width */}
                <path
                  d="M2 9 C 60 2, 120 2, 180 7 S 270 12, 298 4"
                  pathLength="1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="draw-line text-sky-400"
                />
              </svg>
            </span>{" "}
            to buy
            <br />
            insurance coverage
          </h1>

          <p className="reveal mt-7 max-w-md text-[14px] leading-relaxed text-muted [animation-delay:200ms]">
            Compare plans from Nigeria&apos;s top HMOs and insurance providers.
            Pre-negotiated rates, transparent pricing, zero hassle.
          </p>

          <div className="reveal mt-9 flex flex-wrap gap-3 [animation-delay:400ms]">
            <Link
              href="/plans?type=health"
              className="group flex items-center gap-3 rounded-full bg-brand py-2 pl-7 pr-2 text-[13px] font-semibold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark"
            >
              Browse Health Plans
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand transition group-hover:translate-x-0.5">
                <ArrowRight size={16} />
              </span>
            </Link>
            <Link
              href="/plans?type=life"
              className="flex items-center rounded-full border-2 border-brand/20 bg-white/70 px-7 py-3.5 text-[13px] font-semibold text-brand backdrop-blur transition hover:border-brand hover:bg-brand-soft"
            >
              Explore Life Insurance
            </Link>
          </div>

          <div className="reveal mt-10 flex items-center gap-3 [animation-delay:600ms]">
            <div className="flex -space-x-2">
              {avatars.map((a) => (
                <span
                  key={a.initials}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-linear-to-br ${a.bg} text-[10px] font-bold text-white`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <p className="text-[12px] leading-tight text-muted">
              <span className="font-bold text-ink">500+ companies</span>
              <br />
              onboarded
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
