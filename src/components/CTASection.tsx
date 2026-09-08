'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { Label } from './ui';

export default function CTASection({
  title = 'Start when you\u2019re ready.',
  description = 'Tell us where you are. We\u2019ll map out training, nutrition and check-ins around your life.',
  showContacts = true,
}: {
  title?: string;
  description?: string;
  showContacts?: boolean;
}) {
  const { brand } = useSite();

  const contacts = [
    { label: 'WhatsApp', value: brand.phone, href: `https://wa.me/${brand.whatsapp.replace(/\D/g, '')}` },
    { label: 'Phone', value: brand.phone, href: `tel:${brand.phone}` },
    { label: 'Email', value: brand.email, href: `mailto:${brand.email}` },
  ];

  return (
    <section className="border-t border-white/[0.08] bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Label index="04">Get started</Label>
            <h2 className="mt-4 text-3xl md:text-[2.6rem] font-bold tracking-[-0.02em] text-white leading-[1.05] text-balance">
              {title}
            </h2>
            <p className="mt-4 text-zinc-400 leading-relaxed max-w-md">{description}</p>
            <div className="mt-7 flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <a href="/register" className="btn-primary justify-center">
                Apply for coaching <ArrowRight size={16} strokeWidth={2.25} />
              </a>
              <a href="/transformations" className="btn-quiet justify-center">
                Browse results
              </a>
            </div>
          </motion.div>

          {showContacts && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:pt-9"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-2">
                Direct lines
              </p>
              <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {contacts.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center justify-between py-4 gap-4"
                  >
                    <span className="text-sm text-zinc-500 w-20 shrink-0">{c.label}</span>
                    <span className="flex-1 text-[15px] font-semibold text-zinc-100 truncate group-hover:text-white">
                      {c.value}
                    </span>
                    <ArrowRight size={15} className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
