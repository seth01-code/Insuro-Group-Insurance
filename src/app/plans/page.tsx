import { Suspense } from "react";
import PlansView, { type ViewType } from "@/components/PlansView";

export const metadata = { title: "Insurance Plans | Insuro Africa" };

type SearchParams = Promise<{ type?: string }>;

// Reads searchParams inside Suspense so the rest of the route can prerender
async function PlansContent({ searchParams }: { searchParams: SearchParams }) {
  const { type } = await searchParams;
  const initial: ViewType =
    type === "life" || type === "general" ? type : "health";

  // key remounts the view when the URL's type changes
  return <PlansView key={initial} initialType={initial} />;
}

// Shown for a split second while the search params resolve
function PlansFallback() {
  return (
    <div className="bg-[#f8faff]">
      <div className="h-80 rounded-b-[3.5rem] bg-linear-to-br from-brand via-brand to-brand-dark" />
    </div>
  );
}

export default function PlansPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Suspense fallback={<PlansFallback />}>
      <PlansContent searchParams={searchParams} />
    </Suspense>
  );
}
