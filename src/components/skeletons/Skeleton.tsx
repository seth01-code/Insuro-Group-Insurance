import clsx from "clsx";

// One shimmering block. Size and shape come from className.
export default function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={clsx("skeleton rounded-xl", className)} />;
}
