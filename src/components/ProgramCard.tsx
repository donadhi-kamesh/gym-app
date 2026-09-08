'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Program } from '@/types';

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="card group flex flex-col overflow-hidden">
      <div className="relative h-52 overflow-hidden">
        <img
          src={program.image}
          alt={program.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 img-fade" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
          <h3 className="text-white font-bold text-lg tracking-[-0.01em] leading-tight">
            {program.name}
          </h3>
          {program.price && (
            <span className="shrink-0 text-[13px] font-bold text-white tnum">{program.price}</span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{program.description}</p>
        <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
            {program.duration}
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white hover:gap-2.5 transition-all"
          >
            {program.ctaText} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
