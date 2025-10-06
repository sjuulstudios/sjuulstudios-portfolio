export function StatCard({ label, value }: { label: string; value: string }){
  return (
    <div className="rounded-xl border border-border bg-surface p-4 text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-white/70">{label}</div>
    </div>
  );
}
