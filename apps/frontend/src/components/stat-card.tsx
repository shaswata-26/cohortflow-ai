import { AnimatedCard } from './animated-card';

export function StatCard({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <AnimatedCard className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
      {helper ? <p className="mt-2 text-sm text-slate-500">{helper}</p> : null}
    </AnimatedCard>
  );
}
