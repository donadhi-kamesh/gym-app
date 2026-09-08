'use client';

import { motion } from 'framer-motion';
import { ClientTransformation } from '@/types';
import StatsCard from './StatsCard';

export default function ClientProfile({ client }: { client: ClientTransformation }) {
  const delta = client.beforeWeight - client.afterWeight;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="space-y-5">
      <div className="card flex flex-col sm:flex-row sm:items-center gap-5 p-6">
        {client.profilePhoto && (
          <img src={client.profilePhoto} alt={client.name} className="w-16 h-16 rounded-full object-cover" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-xl tracking-tight">{client.name}</p>
          <p className="text-sm text-zinc-500 mt-0.5">{client.goal} · {client.currentPhase}</p>
        </div>
        <div className="tnum text-left sm:text-right">
          <p className="text-2xl font-bold tracking-tight text-white">−{delta}<span className="text-sm font-semibold text-zinc-500 ml-1">kg</span></p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 mt-1">Total change</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard label="Before" value={client.beforeWeight} unit="kg" />
        <StatsCard label="After" value={client.afterWeight} unit="kg" highlight />
        <StatsCard label="Duration" value={client.duration} unit="mo" />
        <StatsCard label="Adherence" value={client.trainingConsistency} unit="%" />
      </div>

      <div className="card p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">In their words</p>
        <p className="mt-3 text-zinc-200 leading-relaxed">&ldquo;{client.journeyDescription}&rdquo;</p>
        {client.testimonial && (
          <p className="mt-4 pt-4 border-t border-white/[0.08] text-sm text-zinc-400 leading-relaxed">
            &ldquo;{client.testimonial}&rdquo;
          </p>
        )}
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-baseline">
          <p className="text-sm font-semibold text-zinc-300">Progress to goal</p>
          <p className="text-xl font-bold text-white tnum">{client.progressPercentage}%</p>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${client.progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-white"
          />
        </div>
      </div>
    </motion.div>
  );
}
