import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Is Insuro Africa licensed?",
    a: "Yes. We are licensed by the National Insurance Commission (NAICOM), which regulates insurance in Nigeria. The insurers we list are NAICOM licensed, and our HMO partners are NHIA accredited.",
  },
  {
    q: "What kinds of insurance can I get?",
    a: "Health, life, motor, electronic devices, travel, home and property, business and SME, marine and goods-in-transit, personal accident, agricultural, and specialised commercial cover such as cyber and directors' and officers' liability.",
  },
  {
    q: "How quickly will my team be covered?",
    a: "Once you pick a plan, your employees are enrolled and covered within 48 hours on average.",
  },
  {
    q: "How do I compare prices?",
    a: "Open any product on the plans page to see plans from each provider side by side, with transparent pricing and a budget filter. Rates are pre-negotiated, so what you see is what you pay.",
  },
  {
    q: "Do I need an account to file a claim?",
    a: "No. You can start any claim without logging in. Our claims team confirms your policy and follows up directly, with an average response time of 24 hours.",
  },
  {
    q: "Is my personal information safe?",
    a: "We handle personal and medical information in line with the NDPR and only share what's needed to arrange your cover.",
  },
];

export default function Faq() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-12 lg:grid-cols-[18rem_1fr]">
        <div>
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Questions, answered
          </h2>
        </div>

        <div className="border-t border-line">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group border-b border-line py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-bold text-ink transition hover:text-brand [&::-webkit-details-marker]:hidden">
                {q}
                <Plus
                  size={20}
                  className="shrink-0 text-brand transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
