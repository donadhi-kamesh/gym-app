'use client';

import { motion } from 'framer-motion';
import { Testimonial } from '@/types';

export default function TestimonialCard({
  testimonial,
  index = 0,
}: {
  testimonial: Testimonial;
  index?: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      className="card flex flex-col p-6"
    >
      <blockquote className="text-zinc-200 text-[14.5px] leading-relaxed flex-1">
        &ldquo;{testimonial.testimonial}&rdquo;
      </blockquote>
      <figcaption className="mt-6 pt-5 border-t border-white/[0.08] flex items-center gap-3">
        <img
          src={testimonial.clientPhoto}
          alt={testimonial.clientName}
          loading="lazy"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate">{testimonial.clientName}</p>
          <p className="text-zinc-500 text-xs mt-0.5 truncate">{testimonial.transformation}</p>
        </div>
      </figcaption>
    </motion.figure>
  );
}
