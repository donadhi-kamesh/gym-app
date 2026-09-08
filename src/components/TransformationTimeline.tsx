'use client';

import { motion } from 'framer-motion';
import { Label } from './ui';

interface Phase {
  label: string;
  description?: string;
  completed: boolean;
}

export default function TransformationTimeline({ phases }: { phases: Phase[] }) {
  return (
    <div className="w-full py-8">
      <Label index="TL">Timeline</Label>
      <h3 className="mt-3 text-xl font-bold tracking-tight text-white">How the result was built.</h3>

      <div className="mt-8 hidden md:grid grid-cols-5 relative">
        <div className="absolute top-[17px] left-[10%] right-[10%] h-px bg-white/10" />
        {phases.map((phase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="relative flex flex-col items-center text-center px-3"
          >
            <span className={`relative z-10 w-[35px] h-[35px] rounded-full border flex items-center justify-center text-[13px] font-bold tnum ${phase.completed ? 'bg-white border-white text-zinc-950' : 'border-white/15 text-zinc-600'}`}>
              {i + 1}
            </span>
            <p className="mt-3 text-[13px] font-semibold text-zinc-200">{phase.label}</p>
            {phase.description && <p className="mt-1 text-xs text-zinc-500">{phase.description}</p>}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 md:hidden">
        {phases.map((phase, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold tnum shrink-0 ${phase.completed ? 'bg-white border-white text-zinc-950' : 'border-white/15 text-zinc-600'}`}>
                {i + 1}
              </span>
              {i < phases.length - 1 && <span className="w-px flex-1 min-h-8 bg-white/10" />}
            </div>
            <div className="pb-6 pt-1">
              <p className="text-sm font-semibold text-zinc-200">{phase.label}</p>
              {phase.description && <p className="text-xs text-zinc-500 mt-0.5">{phase.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
