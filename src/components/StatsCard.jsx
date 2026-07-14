export default function StatsCard({ label, value, detail }) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{label}</p>
      <p className="mt-4 text-4xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{detail}</p>
    </div>
  )
}
