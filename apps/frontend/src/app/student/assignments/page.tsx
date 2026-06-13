'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAssignments, useSubmitAssignment } from '@/hooks/use-assignments';

export default function StudentAssignmentsPage() {
  const { data: assignments, isLoading } = useAssignments();
  const [answerText, setAnswerText] = useState('Here is my assignment solution link and explanation.');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const submitAssignment = useSubmitAssignment(setProgress);

  return (
    <DashboardShell title="My Assignments">
      <div className="grid gap-4">
        {isLoading ? (
          <Skeleton className="h-52" />
        ) : (
          assignments?.map((assignment) => (
            <div key={assignment.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-bold text-slate-950">{assignment.title}</h2>
              <p className="mt-2 text-slate-600">{assignment.instructions}</p>
              <p className="mt-2 text-sm text-slate-500">Due: {new Date(assignment.dueDate).toLocaleDateString()} · Max Marks: {assignment.maxMarks}</p>

              <textarea className="mt-5 min-h-28 w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-brand-600" value={answerText} onChange={(e) => setAnswerText(e.target.value)} />
              <input className="mt-4 block w-full rounded-xl border border-slate-200 p-3 text-sm" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

              {progress > 0 ? <div className="mt-4"><ProgressBar value={progress} /></div> : null}

              <Button className="mt-5" loading={submitAssignment.isPending} onClick={() => submitAssignment.mutate({ assignmentId: assignment.id, answerText, file })}>
                Submit Assignment
              </Button>
            </div>
          ))
        )}
      </div>
    </DashboardShell>
  );
}
