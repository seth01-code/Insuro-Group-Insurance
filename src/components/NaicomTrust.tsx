// TODO: add your licence number / licence type once confirmed.
// It only renders when it's set.
const LICENSE_NO = "";

// Hotlinked from NAICOM. For reliability, download it into public/images/
// and switch this to "/images/naicom-logo.png".
const NAICOM_LOGO =
  "https://naicom.gov.ng/wp-content/uploads/2020/07/NAICOM-Small-Size-Logo.png";

const points = [
  {
    label: "Licensed",
    desc: "Insuro Africa operates under a licence from the National Insurance Commission, the regulator of insurance in Nigeria.",
  },
  {
    label: "Regulated partners",
    desc: "Every insurer we list is NAICOM licensed, and our HMO partners are NHIA accredited.",
  },
  {
    label: "Protected",
    desc: "Claims are confirmed against your policy, and personal data is handled in line with the NDPR.",
  },
];

export default function NaicomTrust() {
  return (
    <section className="relative my-16 overflow-hidden bg-[#0a0f1e] py-20">
      <div
        aria-hidden
        className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/10"
      />
      <div
        aria-hidden
        className="absolute -right-44 -top-48 h-128 w-lg rounded-full border border-white/5"
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-center justify-between gap-10">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-emerald-300">
              Licensed &amp; regulated
            </span>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Licensed by the National Insurance Commission.
            </h2>
            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/65">
              Your premiums and your people&apos;s cover matter. We work within
              Nigeria&apos;s insurance regulations and only partner with
              licensed providers.
            </p>
          </div>

          {/* Seal */}
          <div className="flex h-44 w-44 shrink-0 flex-col items-center justify-center rounded-full border-2 border-dashed border-white/25 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={NAICOM_LOGO}
              alt="National Insurance Commission (NAICOM)"
              className="h-12 w-auto object-contain"
            />
            <span className="mt-2 text-[13px] font-extrabold uppercase tracking-[0.18em] text-white">
              NAICOM
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Licensed
            </span>
            {LICENSE_NO && (
              <span className="mt-1 text-[10px] text-white/55">
                No. {LICENSE_NO}
              </span>
            )}
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.label} className="border-l border-white/20 pl-6">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.15em] text-sky-300">
                {p.label}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/70">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
