import Skeleton from "./Skeleton";

const panel =
  "rounded-4xl border border-line bg-surface p-7 shadow-[0_10px_40px_-20px_rgba(15,58,140,0.2)]";

// Loading state for the dashboard content area (the sidebar stays on screen).
export default function DashboardSkeleton() {
  return (
    <div role="status" aria-busy="true" className="px-5 py-8 sm:px-8 lg:py-10">
      <span className="sr-only">Loading…</span>

      {/* Greeting banner */}
      <div className="rounded-4xl bg-brand-soft p-8 sm:p-10">
        <Skeleton className="h-9 w-72 max-w-full bg-brand/15 sm:h-10" />
        <Skeleton className="mt-3 h-4 w-96 max-w-full bg-brand/10" />
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-line bg-surface p-6 shadow-[0_10px_40px_-20px_rgba(15,58,140,0.2)]"
          >
            <Skeleton className="h-11 w-11 rounded-2xl" />
            <Skeleton className="mt-5 h-3 w-28" />
            <Skeleton className="mt-3 h-8 w-20" />
            <Skeleton className="mt-3 h-3 w-24" />
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <section className={`${panel} mt-6`}>
        <Skeleton className="h-5 w-32" />
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl border border-line bg-canvas px-3 py-6"
            >
              <Skeleton className="h-14 w-14 rounded-2xl" />
              <Skeleton className="mt-4 h-3 w-20" />
              <Skeleton className="mt-2 h-2.5 w-16" />
            </div>
          ))}
        </div>
      </section>

      {/* Plans + activity */}
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className={panel}>
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="mt-5 space-y-3">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl bg-canvas p-4"
              >
                <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-2.5">
                  <Skeleton className="h-4 w-40 max-w-full" />
                  <Skeleton className="h-3 w-48 max-w-full" />
                </div>
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            ))}
          </div>
          <Skeleton className="mt-6 h-2.5 w-full rounded-full" />
        </section>

        <section className={panel}>
          <Skeleton className="h-5 w-36" />
          <div className="mt-5 space-y-5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="mt-1.5 h-3 w-3 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-2.5 w-24" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* List */}
      <section className={`${panel} mt-6`}>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="mt-4 divide-y divide-line">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 py-4">
              <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2.5">
                <Skeleton className="h-3.5 w-40 max-w-full" />
                <Skeleton className="h-3 w-52 max-w-full" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Full dashboard frame (sidebar + top bar + content). Shown while the
// session is being read, before we know who's signed in.
export function DashboardShellSkeleton() {
  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[18rem] shrink-0 self-start p-3 md:block">
        <div className="flex h-full flex-col rounded-4xl border border-line bg-surface p-5 shadow-[0_20px_50px_-25px_rgba(15,58,140,0.35)]">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-10" />
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-canvas p-3">
            <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-2.5 w-1/2" />
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-10 w-full rounded-full" />
            ))}
          </div>

          <div className="mt-auto space-y-2.5">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-10 w-full rounded-full" />
            ))}
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-line bg-surface px-5 py-2.5 md:hidden">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-11 w-11 rounded-2xl" />
        </div>

        <DashboardSkeleton />
      </div>
    </div>
  );
}
