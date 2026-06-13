'use client';

import { motion } from 'framer-motion';

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
      <motion.div
        className="h-full rounded-full bg-brand-600"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}
