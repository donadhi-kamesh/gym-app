'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { useSite } from '@/context/SiteContext';
import { Label, Reveal, SectionHead } from '@/components/ui';

export default function AboutPage() {
  const { about, brand, hero } = useSite();

  return (
    <main>
      <div className="pt-40 pb-12 border-b border-white/[0.08] bg-black/45 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Label index="03">About</Label>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-[-0.025em] text-white leading-[1.02] max-w-3xl text-balance">
              {about.title || `About ${brand.brandName}`}
            </h1>
            <p className="mt-4 text-zinc-400 max-w-xl leading-relaxed">
              {about.subtitle || 'Coaching for people who want proof, not motivation quotes.'}
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 md:py-20 bg-[#0a0a0b]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal>
            <Label index="03a">Why we exist</Label>
            <p className="mt-4 text-xl md:text-2xl text-zinc-100 font-medium tracking-[-0.01em] leading-snug text-balance">
              {about.mission}
            </p>
            <p className="mt-5 text-zinc-400 leading-relaxed">{about.story}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card overflow-hidden">
              <img src="/placeholders/image-2.svg" alt="Training" className="w-full h-80 object-cover" />
              <p className="px-5 py-4 text-sm text-zinc-400 border-t border-white/[0.08]">
                {about.vision || 'A coaching practice measured in kept promises.'}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-black/55 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead index="03b" label="Principles" title="How we coach." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10">
            {about.values.map((value, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="py-6 border-t border-white/[0.08]">
                  <p className="tnum text-[13px] font-semibold text-zinc-500">0{i + 1}</p>
                  <h3 className="mt-2 text-white font-semibold">{value.title}</h3>
                  <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#0a0a0b]/80 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-3 gap-6 max-w-2xl">
            {hero.stats.map((stat, i) => (
              <div key={i}>
                <dd className="text-3xl md:text-4xl font-bold tracking-tight text-white tnum">{stat.number}</dd>
                <dt className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-black/55 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead index="03c" label="Coaches" title={`The people behind ${brand.brandName}.`} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {about.team.map((member, i) => (
              <Reveal key={member.id || i} delay={(i % 3) * 0.07}>
                <div className="card overflow-hidden">
                  <img src={member.photo} alt={member.name} loading="lazy" className="w-full h-64 object-cover" />
                  <div className="p-5 border-t border-white/[0.08]">
                    <h3 className="text-white font-semibold">{member.name}</h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">{member.role}</p>
                    <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
