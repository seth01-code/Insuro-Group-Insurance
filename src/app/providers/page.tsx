import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { products } from "@/lib/products";
import { providers } from "@/lib/providers";

export const metadata = { title: "Our Partners | Insuro Africa" };

export default function ProvidersPage() {
  return (
    <div className="bg-canvas">
      <PageBanner
        eyebrow="Partners"
        title="Insurers and HMOs we work with"
        sub="Every provider is NAICOM licensed, and our HMO partners are NHIA accredited."
      />

      <div className="mx-auto max-w-6xl px-5 py-16">
        {products.map(({ key, title, Icon }) => {
          const list = providers.filter((p) => p.type === key);
          if (list.length === 0) return null;

          return (
            <section
              key={key}
              className="grid gap-6 border-t border-line py-10 first:border-t-0 first:pt-0 lg:grid-cols-[18rem_1fr]"
            >
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon size={20} />
                </span>
                <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink">
                  {title}
                </h2>
                <Link
                  href={`/plans?type=${key}`}
                  className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-brand underline decoration-brand/30 underline-offset-4 transition hover:decoration-brand"
                >
                  View plans <ArrowUpRight size={14} />
                </Link>
              </div>

              <ul className="divide-y divide-line">
                {list.map((p) => (
                  <li
                    key={p.name}
                    className="flex flex-wrap items-center gap-x-6 gap-y-2 py-5 first:pt-0"
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[11px] font-extrabold tracking-wide text-white"
                      style={{ background: p.gradient }}
                    >
                      {p.code}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[16px] font-bold text-ink">
                        {p.name}
                      </div>
                      <div className="text-[12.5px] text-muted">{p.blurb}</div>
                    </div>
                    <span className="text-[13px] font-bold text-ink">
                      <span className="text-amber-400">★</span> {p.rating}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-[11px] font-semibold text-emerald-700">
                      <BadgeCheck size={14} />
                      {p.accreditation}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
