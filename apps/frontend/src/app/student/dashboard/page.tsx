import { DashboardShell } from '@/components/dashboard-shell';
import { StatCard } from '@/components/stat-card';

export default function StudentDashboardPage() {
  return (
    <DashboardShell title="Student Dashboard">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Course Progress" value="42%" />
        <StatCard label="Attendance" value="86%" />
        <StatCard label="Pending Work" value="2" />
        <StatCard label="Latest Score" value="82/100" />
      </div>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold text-slate-950">Student Flow</h2>
        <p className="mt-2 text-slate-600">View lessons, submit assignments, track attendance and read mentor feedback.</p>
      </div>
    </DashboardShell>
  );
}
