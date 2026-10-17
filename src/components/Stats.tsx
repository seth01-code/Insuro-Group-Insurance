const stats = [
  { num: "12+", label: "HMO Partners" },
  { num: "80+", label: "Insurance Plans" },
  { num: "500+", label: "Companies Onboarded" },
  { num: "48hrs", label: "Average Onboarding Time" },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-10">
      <div className="grid grid-cols-2 gap-6 rounded-3xl bg-white px-6 py-8 shadow-[0_10px_40px_-15px_rgba(15,58,140,0.2)] md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-extrabold text-brand">{s.num}</div>
            <div className="mt-1 text-[12px] text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
