export default function PageBanner({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-b-[3.5rem] bg-linear-to-br from-brand via-brand to-brand-dark pb-20 pt-16">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.2) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          maskImage:
            "linear-gradient(to bottom left, black 0%, transparent 65%)",
          WebkitMaskImage:
            "linear-gradient(to bottom left, black 0%, transparent 65%)",
        }}
      />
      <div className="animate-ring absolute -right-20 -top-28 h-96 w-96 rounded-full border border-white/15" />
      <div className="animate-ring absolute -right-44 -top-52 h-136 w-136 rounded-full border border-white/10 [animation-delay:1.5s]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="reveal">
          {eyebrow && (
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/70">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/70">
            {sub}
          </p>
        </div>
      </div>
    </div>
  );
}
