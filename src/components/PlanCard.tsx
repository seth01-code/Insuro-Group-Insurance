import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import clsx from "clsx";
import { formatNaira, type Plan } from "@/lib/plans";

export default function PlanCard({ plan }: { plan: Plan }) {
  const featured = Boolean(plan.tag);

  return (
    <div
      className={clsx(
        "group relative flex flex-col overflow-hidden rounded-4xl p-7 transition duration-300 hover:-translate-y-1.5",
        featured
          ? "bg-linear-to-br from-brand via-brand to-brand-dark text-white shadow-[0_30px_60px_-20px_rgba(26,86,219,0.6)]"
          : "border border-line bg-white shadow-[0_10px_40px_-20px_rgba(15,58,140,0.25)] hover:border-brand/30 hover:shadow-[0_25px_50px_-20px_rgba(26,86,219,0.35)]",
      )}
    >
      {/* Corner accent */}
      <div
        aria-hidden
        className={clsx(
          "absolute -right-12 -top-12 h-36 w-36 rounded-full transition duration-500 group-hover:scale-125",
          featured ? "bg-white/10" : "bg-brand-soft",
        )}
      />
      {featured && (
        <div
          aria-hidden
          className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full border border-white/15"
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <h4
          className={clsx(
            "text-[15px] font-bold",
            featured ? "text-white" : "text-ink",
          )}
        >
          {plan.name}
        </h4>
        {plan.tag && (
          <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-brand">
            {plan.tag}
          </span>
        )}
      </div>

      <div className="relative mt-6">
        <div
          className={clsx(
            "text-[34px] font-extrabold leading-none tracking-tight",
            featured ? "text-white" : "text-brand",
          )}
        >
          {formatNaira(plan.price)}
        </div>
        <div
          className={clsx(
            "mt-1.5 text-[12px]",
            featured ? "text-white/70" : "text-muted",
          )}
        >
          per staff / month
        </div>
      </div>

      <div
        className={clsx(
          "relative my-6 h-px",
          featured ? "bg-white/20" : "bg-line",
        )}
      />

      <ul className="relative flex-1 space-y-3">
        {plan.features.map((f) => (
          <li
            key={f}
            className={clsx(
              "flex items-start gap-3 text-[13px]",
              featured ? "text-white/90" : "text-ink",
            )}
          >
            <span
              className={clsx(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                featured
                  ? "bg-white/20 text-white"
                  : "bg-brand-soft text-brand",
              )}
            >
              <Check size={11} strokeWidth={3.5} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={`/checkout?plan=${plan.id}`}
        className={clsx(
          "relative mt-8 flex items-center justify-between rounded-full py-2 pl-6 pr-2 text-[13px] font-semibold transition",
          featured
            ? "bg-white text-brand hover:bg-brand-soft"
            : "bg-brand-soft text-brand hover:bg-brand hover:text-white",
        )}
      >
        Select Plan
        <span
          className={clsx(
            "flex h-9 w-9 items-center justify-center rounded-full transition group-hover:translate-x-0.5",
            featured ? "bg-brand text-white" : "bg-white text-brand",
          )}
        >
          <ArrowRight size={16} />
        </span>
      </Link>
    </div>
  );
}
