import PageBanner from "@/components/PageBanner";
import ClaimsSection from "@/components/ClaimsSection";

export const metadata = { title: "File a Claim | Insuro Africa" };

const steps = [
  {
    title: "Choose your policy type",
    desc: "Pick the claim that matches your cover, from health and motor to marine and agricultural.",
  },
  {
    title: "Tell us what happened",
    desc: "Fill in a short form with your policy number, the date, and a brief description. No login needed.",
  },
  {
    title: "We confirm and follow up",
    desc: "Our claims team verifies your policy and contacts you directly, usually within 24 hours.",
  },
];

const ready = [
  "Your policy number",
  "The date of the incident or event",
  "A short description of what happened",
  "Photos, receipts or reports, if you have them. Our team may ask for these.",
];

export default function ClaimsPage() {
  return (
    <div className="bg-canvas">
      <PageBanner
        eyebrow="Claims"
        title="File a claim in minutes"
        sub="No login required to start. Choose your policy type and we'll take it from there."
      />

      <div className="mx-auto max-w-6xl px-5 py-16">
        <ol className="grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-brand pt-5">
              <span className="text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-2 text-xl font-extrabold tracking-tight text-ink">
                {s.title}
              </h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-6 border-y border-line py-10 md:grid-cols-[18rem_1fr]">
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            What to have ready
          </h2>
          <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {ready.map((r) => (
              <li
                key={r}
                className="flex gap-3 text-[13.5px] leading-relaxed text-muted"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <ClaimsSection />
        </div>
      </div>
    </div>
  );
}
