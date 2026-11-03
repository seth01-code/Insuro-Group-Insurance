import { providers } from "@/lib/providers";

// One entry per insurer, even if it appears under several products.
const partners = Array.from(
  new Map(providers.map((p) => [p.name, p])).values(),
);

function Name({ name, gradient }: (typeof partners)[number]) {
  return (
    <span className="flex shrink-0 items-center gap-3 whitespace-nowrap text-xl font-extrabold tracking-tight text-ink/35 transition hover:text-ink sm:text-2xl">
      <span
        aria-hidden
        className="h-2 w-2 rounded-full"
        style={{ background: gradient }}
      />
      {name}
    </span>
  );
}

export default function PartnersMarquee() {
  return (
    <section className="py-10">
      <p className="mx-auto max-w-6xl px-5 text-center text-[12px] font-bold uppercase tracking-[0.2em] text-muted">
        Insurers and HMOs we work with
      </p>

      <div
        className="mt-6 overflow-hidden border-y border-line py-6"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* Two identical halves; the animation slides by exactly one half. */}
        <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
          <div className="flex shrink-0 gap-14 pr-14">
            {partners.map((p) => (
              <Name key={p.name} {...p} />
            ))}
          </div>
          <div aria-hidden className="flex shrink-0 gap-14 pr-14">
            {partners.map((p) => (
              <Name key={p.name} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
