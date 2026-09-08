'use client';

import { motion } from 'framer-motion';
import { useSite } from '@/context/SiteContext';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { hero, brand } = useSite();
  const stats = hero.stats || [];

  return (
    <div className="relative w-full min-h-svh flex flex-col">
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-4 sm:px-6 pt-44 pb-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="label"
        >
          <span className="idx">●</span> Online coaching — {brand.address}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
          className="font-display uppercase text-white leading-[0.9] mt-5 max-w-5xl text-[15vw] sm:text-7xl md:text-8xl lg:text-[7.5rem] text-balance break-words"
        >
          {hero.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-7 flex flex-col md:flex-row md:items-end gap-7 md:gap-12"
        >
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 w-full sm:w-auto">
            <a href="/register" className="btn-primary justify-center sm:justify-start">
              {hero.primaryCtaText || 'Start coaching'}
            </a>
            <a href="/transformations" className="btn-quiet justify-center sm:justify-start">
              {hero.secondaryCtaText || 'See client results'}
            </a>
          </div>
        </motion.div>

        {stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 pt-7 border-t border-white/[0.12]"
          >
            <dl className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl">
              {stats.map((stat, i) => (
                <div key={i} className="min-w-0">
                  <dt className="order-2 mt-1.5 block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 leading-snug">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white tnum truncate">
                    {stat.number}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </div>
    </div>
  );
}
