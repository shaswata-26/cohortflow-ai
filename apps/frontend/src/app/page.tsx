import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { getLandingStats } from '@/lib/server-data';
import { StatCard } from '@/components/stat-card';

export default async function HomePage() {
  const stats = await getLandingStats();

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            Full-stack EdTech SaaS Assignment
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
            Manage cohorts, mentors, students and learning outcomes in one platform.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            CohortFlow AI helps online course teams create batches, publish lessons, assign work, track attendance, review submissions and improve student progress.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">
              Login Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/admin/dashboard" className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-50">
              View Dashboard
            </Link>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            {['Role based access', 'Swagger API docs', 'React Query caching', 'Upload progress'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-600" /> {item}
              </span>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-[3rem] bg-brand-100 blur-3xl" />
          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft">
            <Image
              src="/hero-education.svg"
              alt="Cohort dashboard preview"
              width={900}
              height={650}
              priority
              className="rounded-[1.5rem]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-20 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} helper="Cached server-side landing metric" />
        ))}
      </section>
    </main>
  );
}
