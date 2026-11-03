import { Suspense } from "react";
import PlansView, { type ViewType } from "@/components/PlansView";
import SiteSkeleton from "@/components/skeletons/SiteSkeleton";
import { isProductKey } from "@/lib/products";

export const metadata = { title: "Insurance Plans | Insuro Africa" };

type SearchParams = Promise<{ type?: string }>;

// Reads searchParams inside Suspense so the rest of the route can prerender
async function PlansContent({ searchParams }: { searchParams: SearchParams }) {
  const { type } = await searchParams;
  const initial: ViewType = isProductKey(type) ? type : "health";

  // key remounts the view when the URL's type changes
  return <PlansView key={initial} initialType={initial} />;
}

export default function PlansPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Suspense fallback={<SiteSkeleton />}>
      <PlansContent searchParams={searchParams} />
    </Suspense>
  );
}
