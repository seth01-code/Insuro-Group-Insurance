import { ScanSearch, ClipboardCheck, UsersRound } from "lucide-react";

const steps = [
  {
    no: "01",
    title: "Browse & Compare",
    desc: "View all plans with transparent pricing and real ratings side by side.",
    Icon: ScanSearch,
  },
  {
    no: "02",
    title: "Pick a Plan",
    desc: "Select the right plan for your team. Pre-negotiated rates already locked in.",
    Icon: ClipboardCheck,
  },
  {
    no: "03",
    title: "Get Onboarded",
    desc: "Your employees are enrolled and covered within 48 hours.",
    Icon: UsersRound,
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand px-6 py-14 sm:px-12">
        {/* Soft decorative circles */}
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/5"
        />

        <div className="relative">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/70">
            How it works
          </span>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            We handle the hassle.
            <br />
            Your team just picks a plan.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.no}
                className="rounded-2xl bg-white p-6 shadow-[0_20px_50px_-20px_rgba(15,58,140,0.5)]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-brand text-white shadow-[0_10px_25px_-8px_rgba(26,86,219,0.7)]">
                    <s.Icon size={28} strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-semibold text-muted/70">
                    {s.no}
                  </span>
                </div>
                <h3 className="mt-6 text-[16px] font-bold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
