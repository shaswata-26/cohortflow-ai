'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/hooks/use-auth';

export default function LoginPage() {
  const router = useRouter();
  const login = useLogin();
  const [email, setEmail] = useState('admin@cohortflow.ai');
  const [password, setPassword] = useState('Password@123');

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await login.mutateAsync({ email, password });
    if (result.user.role === 'ADMIN') router.push('/admin/dashboard');
    if (result.user.role === 'MENTOR') router.push('/mentor/dashboard');
    if (result.user.role === 'STUDENT') router.push('/student/dashboard');
  };

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-black text-slate-950">Login</h1>
        <p className="mt-2 text-slate-500">Use seed accounts to test role-based dashboard flow.</p>

        <label className="mt-6 block text-sm font-semibold text-slate-700">Email</label>
        <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-600" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="mt-4 block text-sm font-semibold text-slate-700">Password</label>
        <input type="password" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-600" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button className="mt-6 w-full" loading={login.isPending}>Login</Button>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          Admin: admin@cohortflow.ai<br />
          Mentor: mentor@cohortflow.ai<br />
          Student: student@cohortflow.ai
        </div>
      </form>
    </main>
  );
}
