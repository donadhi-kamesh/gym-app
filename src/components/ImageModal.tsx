'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { TransformationImage } from '@/types';

export default function ImageModal({
  image,
  images,
  isOpen,
  onClose,
}: {
  image: TransformationImage | null;
  images: TransformationImage[];
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !image) return null;
  const idx = images.findIndex((img) => img.id === image.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
              <img src={image.url} alt={image.caption} className="w-full max-h-[76vh] object-contain bg-black" />
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-t border-white/[0.08]">
                <p className="text-sm font-medium text-zinc-200 truncate">{image.caption || 'Progress photo'}</p>
                <span className="text-xs text-zinc-500 tnum shrink-0">{idx + 1} / {images.length}</span>
              </div>
              <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-black/70 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-zinc-950 transition-colors">
                <X size={17} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
