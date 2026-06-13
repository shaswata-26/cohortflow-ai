'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        classNames: {
          toast: 'rounded-2xl border border-slate-200 bg-white shadow-soft',
          title: 'text-slate-950 font-semibold',
          description: 'text-slate-500',
          actionButton: 'bg-brand-600',
        },
      }}
    />
  );
}
