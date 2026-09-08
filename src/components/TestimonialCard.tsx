'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-800 p-8 hover:border-green-400/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={testimonial.clientPhoto}
            alt={testimonial.clientName}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-green-400"
          />
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white font-bold text-lg">
                {testimonial.clientName}
              </p>
              {testimonial.verified && (
                <CheckCircle size={18} className="text-green-400" />
              )}
            </div>
            <p className="text-green-400 font-bold text-sm">
              {testimonial.transformation}
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-300 text-lg mb-4 italic">
        "{testimonial.testimonial}"
      </p>

      {/* Star Rating */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className="text-yellow-400 text-lg"
          >
            ★
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
