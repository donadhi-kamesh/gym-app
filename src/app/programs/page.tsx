'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import ProgramCard from '@/components/ProgramCard';
import CTASection from '@/components/CTASection';
import { useSite } from '@/context/SiteContext';
import { Label, Reveal, SectionHead } from '@/components/ui';

const FEATURES = [
  { title: 'Training blocks', description: 'Periodised programs adjusted every week based on your logs.' },
  { title: 'Nutrition targets', description: 'Calories and protein set for your goal, adapted to foods you eat.' },
  { title: 'Form reviews', description: 'Send lifting videos. Get line-by-line feedback from your coach.' },
  { title: 'Weekly check-ins', description: 'Weight, photos, adherence — reviewed together, every week.' },
  { title: 'Direct access', description: 'Message your coach on WhatsApp when life gets in the way.' },
  { title: 'Habit systems', description: 'Sleep, steps and routines tracked alongside training.' },
];

const FAQS = [
  { q: 'How fast will I see changes?', a: 'Most clients notice visible differences in 4–6 weeks. Larger recompositions take 3–6 months of consistent work.' },
  { q: 'I\u2019m a complete beginner. Is this for me?', a: 'Yes. Around half our clients start with no lifting experience. Your first block assumes zero baseline.' },
  { q: 'Can I train at home?', a: 'Yes. Every program has gym and home variants, including minimal-equipment options.' },
  { q: 'What does the nutrition side involve?', a: 'Calorie and protein targets plus a meal structure built from foods you already eat. No crash diets.' },
  { q: 'What if I travel or miss a week?', a: 'Your coach rebuilds the week around it. Consistency over months matters more than any single week.' },
  { q: 'Is there a guarantee?', a: 'A 30-day satisfaction guarantee from your start date. Details are shared before you pay anything.' },
];

export default function ProgramsPage() {
  const { programs } = useSite();

  return (
    <main>
      <div className="pt-40 pb-12 border-b border-white/[0.08] bg-black/45 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Label index="02">Coaching programs</Label>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-[-0.025em] text-white leading-[1.02] max-w-3xl text-balance">
              Pick the goal. We\u2019ll build the plan.
            </h1>
            <p className="mt-4 text-zinc-400 max-w-xl leading-relaxed">
              Fat loss, muscle gain or a full recomposition — each with training, nutrition and accountability included.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-14 md:py-16 bg-[#0a0a0b]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((program, i) => (
              <Reveal key={program.id} delay={(i % 3) * 0.07}>
                <ProgramCard program={program} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-black/55 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead index="02a" label="Included" title="Everything in every plan." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <div className="py-5 border-t border-white/[0.08]">
                  <p className="text-white font-semibold text-[15px]">{f.title}</p>
                  <p className="mt-1 text-sm text-zinc-500 leading-relaxed">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#0a0a0b]/80 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHead index="02b" label="Questions" title="Asked often, answered honestly." />
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-5">
                <h3 className="text-white font-semibold text-[15px]">{faq.q}</h3>
                <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
