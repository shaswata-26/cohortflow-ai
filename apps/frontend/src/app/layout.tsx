import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/providers/query-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'CohortFlow AI',
  description: 'Online cohort management platform for courses, mentors and students.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
        <SiteFooter />
        <ToastProvider />
      </body>
    </html>
  );
}
