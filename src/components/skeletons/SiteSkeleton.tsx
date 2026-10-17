import Skeleton from "./Skeleton";

function CardSkeleton() {
  return (
    <div className="rounded-4xl border border-line bg-surface p-7 shadow-[0_10px_40px_-20px_rgba(15,58,140,0.2)]">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="mt-6 h-9 w-2/5" />
      <Skeleton className="mt-2 h-3 w-1/3" />
      <div className="my-6 h-px bg-line" />
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
            <Skeleton className="h-3 flex-1" />
          </div>
        ))}
      </div>
      <Skeleton className="mt-8 h-12 w-full rounded-full" />
    </div>
  );
}

// Loading state for the main site pages: banner, filter bar, card grid.
export default function SiteSkeleton() {
  return (
    <div role="status" aria-busy="true" className="min-h-[70vh] bg-canvas">
      <span className="sr-only">Loading…</span>

      {/* Banner */}
      <div className="rounded-b-[3.5rem] bg-brand-soft pb-28 pt-28">
        <div className="mx-auto max-w-6xl px-5">
          <Skeleton className="h-9 w-24 rounded-full bg-brand/15" />
          <Skeleton className="mt-8 h-10 w-64 max-w-full bg-brand/15 sm:h-12 sm:w-96" />
          <Skeleton className="mt-4 h-4 w-80 max-w-full bg-brand/10" />
        </div>
      </div>

      {/* Floating filter bar */}
      <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-5">
        <div className="flex flex-wrap items-center gap-2.5 rounded-3xl bg-surface p-4 shadow-[0_20px_50px_-20px_rgba(15,58,140,0.35)]">
          <Skeleton className="mr-2 h-4 w-40" />
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full" />
          ))}
        </div>
      </div>

      {/* Provider header + cards */}
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-14">
        <div className="flex items-center gap-5 rounded-4xl bg-surface p-5 shadow-[0_10px_40px_-20px_rgba(15,58,140,0.25)]">
          <Skeleton className="h-16 w-16 shrink-0 rounded-2xl" />
          <div className="flex-1 space-y-2.5">
            <Skeleton className="h-5 w-48 max-w-full" />
            <Skeleton className="h-3 w-64 max-w-full" />
          </div>
          <Skeleton className="hidden h-8 w-32 rounded-full sm:block" />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <div className="hidden sm:block">
            <CardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
