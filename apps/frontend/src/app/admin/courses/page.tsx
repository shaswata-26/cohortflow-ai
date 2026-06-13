'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCourses, useCreateCourse, useDeleteCourse } from '@/hooks/use-courses';

export default function AdminCoursesPage() {
  const { data: courses, isLoading } = useCourses();
  const createCourse = useCreateCourse();
  const deleteCourse = useDeleteCourse();
  const [title, setTitle] = useState('Advanced Next.js Cohort');

  const addCourse = () => {
    createCourse.mutate({
      title,
      slug: title.toLowerCase().replaceAll(' ', '-'),
      description: 'A practical cohort for building production-ready Next.js applications.',
      category: 'Web Development',
      duration: '8 weeks',
      status: 'PUBLISHED',
    });
  };

  return (
    <DashboardShell title="Course Management">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold text-slate-950">Create Course</h2>
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <input className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-600" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button loading={createCourse.isPending} onClick={addCourse}>Add Course</Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {isLoading ? (
          <>
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
          </>
        ) : (
          courses?.map((course) => (
            <div key={course.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-brand-600">{course.category}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{course.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{course.description}</p>
                  <p className="mt-3 text-sm font-medium text-slate-600">{course.duration} · {course.status}</p>
                </div>
                <Button variant="secondary" loading={deleteCourse.isPending} onClick={() => deleteCourse.mutate(course.id)}>Delete</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardShell>
  );
}
