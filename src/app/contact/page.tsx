import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact | Insuro Africa" };

// TODO: fill these in. Only the ones that are set are shown.
const details = [
  { label: "Email", value: "" },
  { label: "Phone", value: "" },
  { label: "Office", value: "" },
  { label: "Hours", value: "" },
].filter((d) => d.value);

export default function ContactPage() {
  return (
    <div className="bg-canvas">
      <PageBanner
        eyebrow="Contact"
        title="Talk to our team"
        sub="Questions about a plan, a quote or a claim? Send us a message."
      />

      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 lg:grid-cols-[18rem_1fr]">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-ink">
            Get in touch
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
            Tell us what you need and the right person will get back to you. For
            an existing claim, you can also{" "}
            <a
              href="/claims"
              className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
            >
              file it directly
            </a>
            .
          </p>

          {details.length > 0 && (
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {details.map((d) => (
                <div key={d.label} className="py-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
                    {d.label}
                  </dt>
                  <dd className="mt-1 text-[14px] font-semibold text-ink">
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="rounded-4xl border border-line bg-surface p-7 shadow-[0_10px_40px_-25px_rgba(15,58,140,0.3)] sm:p-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
