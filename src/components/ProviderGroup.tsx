import { BadgeCheck } from "lucide-react";
import type { Plan } from "@/lib/plans";
import type { Provider } from "@/lib/providers";
import PlanCard from "./PlanCard";

export default function ProviderGroup({
  provider,
  plans,
}: {
  provider: Provider;
  plans: Plan[];
}) {
  const full = Math.round(provider.rating);

  return (
    <div className="mb-16">
      <div className="flex flex-wrap items-center gap-5 rounded-4xl bg-white p-5 shadow-[0_10px_40px_-20px_rgba(15,58,140,0.25)]">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-[14px] font-extrabold tracking-wide text-white shadow-[0_10px_25px_-8px_rgba(15,58,140,0.5)]"
          style={{ background: provider.gradient }}
        >
          {provider.code}
        </div>
        <div className="min-w-0">
          <div className="text-[18px] font-extrabold tracking-tight text-ink">
            {provider.name}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-muted">
            <span className="text-[13px] tracking-tight text-amber-400">
              {"★".repeat(full)}
              <span className="text-line">{"★".repeat(5 - full)}</span>
            </span>
            <span className="font-bold text-ink">{provider.rating}</span>
            <span>·</span>
            <span>{provider.blurb}</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-[12px] font-semibold text-muted sm:inline">
            {plans.length} plan{plans.length === 1 ? "" : "s"}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-[11px] font-semibold text-emerald-700">
            <BadgeCheck size={14} />
            {provider.accreditation}
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} />
        ))}
      </div>
    </div>
  );
}
