'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { TransformationImage } from '@/types';

export default function ImageCarousel({
  images,
  onImageClick,
}: {
  images: TransformationImage[];
  onImageClick?: (image: TransformationImage) => void;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchX = useRef<number | null>(null);

  if (!images || images.length === 0) return null;

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + images.length) % images.length);
  };

  const jump = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  const current = images[index];
  const tag = current.type === 'before' ? 'Before' : current.type === 'after' ? 'After' : `Month ${current.month ?? ''}`;

  return (
    <div className="w-full">
      <div
        className="card group relative overflow-hidden !rounded-2xl h-[20rem] sm:h-[28rem] md:h-[36rem] touch-pan-y select-none"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <img
              src={current.url}
              alt={current.caption || 'Client progress photo'}
              draggable={false}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 img-fade pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        <span className="absolute top-3 left-3 sm:top-4 sm:left-4 rounded-md bg-black/65 backdrop-blur px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-200">
          {tag}
        </span>
        <span className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-md bg-black/65 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-zinc-300 tnum">
          {index + 1} / {images.length}
        </span>

        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3">
          <p className="text-white text-sm sm:text-[15px] font-medium leading-snug min-w-0">
            {current.caption || 'Progress photo'}
          </p>
          <button
            onClick={() => onImageClick?.(current)}
            aria-label="Enlarge photo"
            className="shrink-0 w-10 h-10 sm:w-9 sm:h-9 rounded-lg bg-white text-zinc-950 flex items-center justify-center hover:bg-zinc-200 transition-colors"
          >
            <Maximize2 size={16} />
          </button>
        </div>

        {images.length > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-black/60 backdrop-blur text-white hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/85">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-black/60 backdrop-blur text-white hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/85">
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => jump(i)}
              aria-label={`Photo ${i + 1}`}
              className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border transition-all ${i === index ? 'border-white/60' : 'border-transparent opacity-45 hover:opacity-80'}`}
            >
              <img src={img.url} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
