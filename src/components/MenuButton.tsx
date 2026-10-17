"use client";

import clsx from "clsx";

// The hamburger button used by the site navbar and the dashboard top bar.
export default function MenuButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label="Open menu"
      onClick={onClick}
      className={clsx(
        "group flex h-11 w-11 shrink-0 flex-col items-end justify-center gap-1.25 rounded-2xl bg-brand-soft pr-3.25 text-brand transition hover:bg-brand hover:text-white",
        className,
      )}
    >
      <span className="h-0.5 w-5 rounded-full bg-current transition-all duration-300 group-hover:w-3" />
      <span className="h-0.5 w-3 rounded-full bg-current transition-all duration-300 group-hover:w-5" />
    </button>
  );
}
