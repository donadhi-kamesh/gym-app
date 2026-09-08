'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Program } from '@/types';

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      className="group bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden hover:border-green-400/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3">{program.name}</h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
          {program.description}
        </p>

        {/* Duration & Price Badges */}
        <div className="flex items-center justify-between mb-6">
          <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-bold">
            {program.duration}
          </span>
          {program.price && (
            <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-bold">
              {program.price}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-bold py-3 rounded-lg transition-all duration-300"
        >
          {program.ctaText}
          <ArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
}
