import PageBanner from "@/components/PageBanner";
import NaicomTrust from "@/components/NaicomTrust";
import CtaBanner from "@/components/CtaBanner";

export const metadata = { title: "About | Insuro Africa" };

// TODO: add your real story (founding, team, milestones) where marked below.

const steps = [
  {
    title: "Discover",
    desc: "See the types of insurance available and understand which ones fit your situation.",
  },
  {
    title: "Compare",
    desc: "Put plans from multiple providers side by side, with clear pricing and ratings.",
  },
  {
    title: "Purchase",
    desc: "Choose a plan and get covered without chasing providers one by one.",
  },
  {
    title: "Manage",
    desc: "Keep your policies, renewals and claims in one place.",
  },
];

const beyond = [
  {
    title: "Policy renewals",
    desc: "Stay on top of expiring policies and renew without starting from scratch.",
  },
  {
    title: "Claims assistance",
    desc: "File a claim online and get help from our team through the process.",
  },
  {
    title: "A central dashboard",
    desc: "Your policies, employees and requests in a single customer dashboard.",
  },
  {
    title: "Health and occupational medical services",
    desc: "Annual medicals, pre-employment checks and fitness-to-work assessments.",
  },
];

const values = [
  {
    title: "Transparency",
    desc: "Clear prices and plain-language cover, with nothing buried.",
  },
  {
    title: "Speed",
    desc: "Quick onboarding and claims that get a response fast.",
  },
  {
    title: "Accountability",
    desc: "We stay involved after you buy, not just at checkout.",
  },
  {
    title: "Built for Africa",
    desc: "Designed around how Nigerian businesses and families buy cover.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-canvas">
      <PageBanner
        eyebrow="About us"
        title="Insurance, all in one place"
        sub="A digital platform where individuals and businesses can discover, compare, purchase and manage insurance from multiple providers."
      />

      {/* The problem we solve */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand">
              The problem we solve
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-4xl">
              Many people don&apos;t know what cover they need, what it costs,
              or who to call.
            </h2>
          </div>
          <div className="space-y-4 text-[14.5px] leading-relaxed text-muted">
            <p>
              Across Nigeria, individuals and businesses struggle to work out
              which insurance they need, how much it should cost, and who to
              contact to get it.
            </p>
            <p>
              Insuro Africa makes insurance options more visible,
              understandable, accessible and easy to purchase, and helps
              customers manage their policies and reach the support they need,
              all in one place.
            </p>
            {/* TODO: add your story here */}
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <ol className="divide-y divide-line border-y border-line">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="grid items-baseline gap-x-6 gap-y-2 py-8 sm:grid-cols-[3rem_14rem_1fr]"
            >
              <span className="text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-extrabold tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Beyond buying cover */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink">
              More than a marketplace
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              Buying is only the start. We also help you look after your cover.
            </p>
          </div>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {beyond.map((b) => (
              <div key={b.title} className="border-t-2 border-brand pt-5">
                <dt className="text-[16px] font-extrabold text-ink">
                  {b.title}
                </dt>
                <dd className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  {b.desc}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <NaicomTrust />

      {/* Values */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          What we care about
        </h2>
        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="border-t-2 border-brand pt-5">
              <h3 className="text-[16px] font-extrabold text-ink">{v.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
