'use client';

import Hero from '@/components/Hero';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ProgramCard from '@/components/ProgramCard';
import TestimonialCard from '@/components/TestimonialCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { Reveal, SectionHead } from '@/components/ui';

function ClientCard({ client, index }: { client: any; index: number }) {
  const delta = client.beforeWeight - client.afterWeight;
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <Link href={`/transformations/${client.id}`} className="card group block overflow-hidden">
        <div className="relative h-72 overflow-hidden">
          {client.photos[0] && (
            <img
              src={client.photos[0].url}
              alt={`${client.name} — before and after`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          )}
          <div className="absolute inset-0 img-fade" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {client.verified && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-black/65 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-zinc-200">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d7f542]" /> Verified
              </span>
            )}
          </div>
          <div className="absolute bottom-4 left-5 right-5">
            <p className="text-white font-bold text-lg leading-tight">{client.name}</p>
            <p className="mt-0.5 text-[13px] text-zinc-400">
              {client.goal} · {client.duration} months
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 flex-wrap px-5 py-4 border-t border-white/[0.08]">
          <p className="text-sm tnum text-zinc-400 min-w-0">
            <span className="text-zinc-200 font-semibold">{client.beforeWeight}kg</span>
            <span className="mx-2 text-zinc-600">→</span>
            <span className="text-white font-semibold">{client.afterWeight}kg</span>
            <span className="ml-2 text-[12px] text-zinc-500">−{delta}kg</span>
          </p>
          <ArrowRight size={16} className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    </Reveal>
  );
}

export default function Home() {
  const { clients, programs, testimonials } = useSite();

  return (
    <main>
      <Hero />

      {/* 01 — Clients */}
      <section className="bg-[#0a0a0b]/85 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <SectionHead
            index="01"
            label="Client results"
            title="Documented transformations, not stock photos."
            copy="Every client below trained under us and agreed to share their numbers."
            link={{ href: '/transformations', text: 'View all clients' }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {clients.slice(0, 3).map((client, i) => (
              <ClientCard key={client.id} client={client} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Programs */}
      <section className="bg-black/55 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <SectionHead
            index="02"
            label="Coaching"
            title="One coach, one plan, weekly check-ins."
            copy="Training and nutrition built around your schedule, equipment and food habits."
            link={{ href: '/programs', text: 'Compare programs' }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((program, i) => (
              <Reveal key={program.id} delay={(i % 3) * 0.08}>
                <ProgramCard program={program} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Notes */}
      <section className="bg-[#0a0a0b]/85 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <SectionHead
            index="03"
            label="Client notes"
            title="What it's like to work with us."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
