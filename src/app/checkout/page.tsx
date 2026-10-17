import { Suspense } from "react";
import CheckoutView from "@/components/CheckoutView";
import SiteSkeleton from "@/components/skeletons/SiteSkeleton";
import { getPlanById } from "@/lib/plans";

export const metadata = { title: "Checkout | Insuro Africa" };

type SearchParams = Promise<{ plan?: string; staff?: string }>;

// Reads searchParams inside Suspense so the rest of the route can prerender
async function CheckoutContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { plan: planId, staff } = await searchParams;
  const plan = planId ? getPlanById(planId) : undefined;

  // Employees default to 24, like the original dashboard
  const parsed = parseInt(staff ?? "", 10);
  const employees = Number.isNaN(parsed)
    ? 24
    : Math.min(5000, Math.max(1, parsed));

  return (
    <CheckoutView
      key={`${planId}-${employees}`}
      plan={plan ?? null}
      employees={employees}
    />
  );
}

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Suspense fallback={<SiteSkeleton />}>
      <CheckoutContent searchParams={searchParams} />
    </Suspense>
  );
}
