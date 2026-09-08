'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  stats?: Array<{ number: string; label: string }>;
}

export default function Hero({ stats = [] }: HeroProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden pt-16">


      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Real People.<br />Real Transformations.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Track verified fitness transformations with premium coaching and personalized programs.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-12 mt-8"
        >
          <Link
            href="/register"
            className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 text-lg shadow-lg shadow-green-500/25"
          >
            Start Your Transformation
          </Link>
          <Link
            href="/transformations"
            className="px-8 py-4 border-2 border-green-400 text-green-400 hover:bg-green-400/10 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 text-lg bg-black/40 backdrop-blur-sm shadow-lg shadow-black/40"
          >
            View Transformations
          </Link>
        </motion.div>

        {/* Statistics */}
        {stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 mb-16 bg-black/50 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/10 shadow-2xl"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-green-400" size={32} />
        </motion.div>
      </motion.div>
    </div>
  );
}
