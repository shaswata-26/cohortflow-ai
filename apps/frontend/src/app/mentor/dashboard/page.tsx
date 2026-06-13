import { DashboardShell } from '@/components/dashboard-shell';
import { StatCard } from '@/components/stat-card';

export default function MentorDashboardPage() {
  return (
    <DashboardShell title="Mentor Dashboard">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Assigned Cohorts" value="3" />
        <StatCard label="Students" value="76" />
        <StatCard label="Pending Submissions" value="18" />
        <StatCard label="At Risk Students" value="5" />
      </div>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold text-slate-950">Mentor Flow</h2>
        <p className="mt-2 text-slate-600">Publish lessons, create assignments, mark attendance and review submissions.</p>
      </div>
    </DashboardShell>
  );
}
