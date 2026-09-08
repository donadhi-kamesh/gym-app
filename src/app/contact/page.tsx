'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { Label, Reveal } from '@/components/ui';

export default function ContactPage() {
  const { brand } = useSite();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', goal: 'weight-loss', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: '', email: '', phone: '', goal: 'weight-loss', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const channels = [
    { title: 'WhatsApp', line: 'Fastest — usually same day', href: `https://wa.me/${brand.whatsapp.replace(/\D/g, '')}` },
    { title: 'Phone', line: `${brand.phone} · Mon–Sat, 9–6`, href: `tel:${brand.phone}` },
    { title: 'Email', line: brand.email, href: `mailto:${brand.email}` },
  ];

  const labelCls = 'block text-[12px] font-semibold text-zinc-400 mb-2';

  return (
    <main>
      <div className="pt-40 pb-12 border-b border-white/[0.08] bg-black/45 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Label index="04">Contact</Label>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-[-0.025em] text-white leading-[1.02]">
              Ask us anything.
            </h1>
            <p className="mt-4 text-zinc-400 max-w-xl leading-relaxed">
              Considering {brand.brandName}? Write in — a coach replies, not a bot.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-14 md:py-16 bg-[#0a0a0b]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Direct lines</p>
            <div className="mt-2 divide-y divide-white/[0.08] border-b border-white/[0.08]">
              {channels.map((c) => (
                <a key={c.title} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group flex items-center justify-between py-4 gap-4">
                  <div>
                    <p className="text-white font-semibold text-[15px]">{c.title}</p>
                    <p className="text-sm text-zinc-500 mt-0.5">{c.line}</p>
                  </div>
                  <ArrowRight size={15} className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-zinc-500">{brand.address} · Online coaching worldwide</p>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="field" placeholder="Your name" />
                </div>
                <div>
                  <label className={labelCls}>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="field" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="field" placeholder="+91" />
                </div>
                <div>
                  <label className={labelCls}>Goal *</label>
                  <select name="goal" value={formData.goal} onChange={handleChange} className="field">
                    <option value="weight-loss">Lose fat</option>
                    <option value="muscle-gain">Build muscle</option>
                    <option value="strength">Get stronger</option>
                    <option value="transformation">Full recomposition</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelCls}>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className="field resize-none" placeholder="Training history, schedule, what you've tried…" />
              </div>
              <button type="submit" className="btn-primary w-full">
                {sent ? 'Message sent — we\u2019ll reply soon' : 'Send message'}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
