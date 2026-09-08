'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Small indexed label: <Label index="01">Selected clients</Label> */
export function Label({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <span className="label">
      {index && <span className="idx">{index}</span>}
      {children}
    </span>
  );
}

export function SectionHead({
  index,
  label,
  title,
  copy,
  link,
}: {
  index: string;
  label: string;
  title: string;
  copy?: string;
  link?: { href: string; text: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mb-10 md:mb-14"
    >
      <Label index={index}>{label}</Label>
      <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <h2 className="text-[1.7rem] md:text-4xl font-bold tracking-[-0.02em] text-white leading-[1.05] max-w-xl text-balance">
          {title}
        </h2>
        <div className="md:text-right md:max-w-sm">
          {copy && <p className="text-zinc-400 text-[15px] leading-relaxed">{copy}</p>}
          {link && (
            <Link href={link.href} className="link-arrow mt-3">
              {link.text} <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </div>
      <div className="mt-7 h-px bg-white/[0.08]" />
    </motion.div>
  );
}

export function PrimaryButton({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn-primary ${className}`}>
      {children}
      <ArrowRight size={16} strokeWidth={2.25} />
    </Link>
  );
}

export function QuietButton({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn-quiet ${className}`}>
      {children}
    </Link>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
