const reasons = [
  {
    title: "Compare side by side",
    desc: "Transparent pricing and real ratings for every plan, with budget filters to narrow it down fast.",
  },
  {
    title: "Pre-negotiated rates",
    desc: "We negotiate with providers up front, so the price you see is the rate you get.",
  },
  {
    title: "Covered in 48 hours",
    desc: "Pick a plan and your team is enrolled and covered within 48 hours.",
  },
  {
    title: "Claims in minutes",
    desc: "Start any claim online with no login. Our claims team confirms your policy and replies within 24 hours on average.",
  },
  {
    title: "Eleven covers, one place",
    desc: "Health, life, motor, travel, property, business and more, managed from a single platform.",
  },
  {
    title: "Your data stays protected",
    desc: "We handle personal and medical information in line with the NDPR.",
  },
];

export default function WhyInsuro() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-12 lg:grid-cols-[18rem_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand">
            Why Insuro
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Everything your cover needs, in one place
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            Buying insurance shouldn&apos;t mean chasing quotes from ten
            different providers. We bring them together.
          </p>
        </div>

        <ol className="divide-y divide-line border-y border-line">
          {reasons.map((r, i) => (
            <li
              key={r.title}
              className="group grid items-baseline gap-x-6 gap-y-2 py-8 sm:grid-cols-[3rem_1fr_1.3fr]"
            >
              <span className="text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-extrabold tracking-tight text-ink transition group-hover:text-brand">
                {r.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-muted">
                {r.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
