import { DashboardShell } from '@/components/dashboard-shell';
import { StatCard } from '@/components/stat-card';

export default function AdminDashboardPage() {
  return (
    <DashboardShell title="Admin Dashboard">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Students" value="120" helper="Across all active cohorts" />
        <StatCard label="Active Cohorts" value="8" helper="Currently running" />
        <StatCard label="Pending Reviews" value="34" helper="Assignments waiting" />
        <StatCard label="Avg Attendance" value="82%" helper="Last 30 days" />
      </div>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold text-slate-950">Admin Flow</h2>
        <p className="mt-2 text-slate-600">Create courses, create cohorts, add mentors/students, and monitor platform performance.</p>
      </div>
    </DashboardShell>
  );
}
