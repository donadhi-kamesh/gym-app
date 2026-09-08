'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSite } from '@/context/SiteContext';
import { Label } from '@/components/ui';

export default function TransformationsPage() {
  const { clients } = useSite();

  return (
    <main className="min-h-screen">
      <div className="pt-40 pb-12 border-b border-white/[0.08] bg-black/45 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Label index={`${String(clients.length).padStart(2, '0')}`}>Client archive</Label>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-[-0.025em] text-white leading-[1.02] text-balance max-w-3xl">
              Every result, accounted for.
            </h1>
            <p className="mt-4 text-zinc-400 max-w-xl leading-relaxed">
              Names, timelines and weigh-ins. Click any client for photos and the full breakdown.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-14 md:py-16 bg-[#0a0a0b]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clients.map((client, index) => {
              const delta = client.beforeWeight - client.afterWeight;
              return (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: (index % 3) * 0.07, duration: 0.55 }}
                >
                  <Link href={`/transformations/${client.id}`} className="card group flex flex-col h-full overflow-hidden">
                    <div className="relative h-72 overflow-hidden">
                      {client.photos?.[0] && (
                        <>
                          <img
                            src={client.photos[0].url}
                            alt={client.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 img-fade" />
                        </>
                      )}
                      <div className="absolute bottom-4 left-5 right-5">
                        <p className="text-white font-bold text-lg leading-tight">{client.name}</p>
                        <p className="mt-0.5 text-[13px] text-zinc-400">
                          {client.goal} · {client.duration} months
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 flex-wrap px-5 py-4 border-t border-white/[0.08] mt-auto">
                      <p className="text-sm tnum text-zinc-400 min-w-0">
                        <span className="text-zinc-200 font-semibold">{client.beforeWeight}kg</span>
                        <span className="mx-2 text-zinc-600">→</span>
                        <span className="text-white font-semibold">{client.afterWeight}kg</span>
                        <span className="ml-2 text-[12px] text-zinc-500">−{delta}kg</span>
                      </p>
                      <ArrowRight size={16} className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-black/60 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <Label index="+1">Next slot</Label>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-white">
              This time next year, that could be you.
            </h2>
          </div>
          <Link href="/register" className="btn-primary shrink-0">
            Apply for coaching <ArrowRight size={16} strokeWidth={2.25} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
