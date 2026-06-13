import Link from 'next/link';

const nav = [
  { href: '/admin/dashboard', label: 'Admin' },
  { href: '/mentor/dashboard', label: 'Mentor' },
  { href: '/student/dashboard', label: 'Student' },
  { href: '/admin/courses', label: 'Courses' },
  { href: '/student/assignments', label: 'Assignments' },
];

export function DashboardShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-black text-slate-950">
            CohortFlow<span className="text-brand-600">AI</span>
          </Link>
          <nav className="hidden gap-2 md:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-6 text-3xl font-black tracking-tight text-slate-950">{title}</h1>
        {children}
      </section>
    </main>
  );
}
