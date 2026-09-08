'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { TransformationImage } from '@/types';

interface ImageModalProps {
  image: TransformationImage | null;
  images: TransformationImage[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({
  image,
  images,
  isOpen,
  onClose,
}: ImageModalProps) {
  if (!isOpen || !image) return null;

  const currentIndex = images.findIndex((img) => img.id === image.id);

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    // This would need parent component state management
  };

  const goToNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    // This would need parent component state management
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 z-50"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            {/* Image Container */}
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <img
                src={image.url}
                alt={image.caption}
                className="max-w-full max-h-full object-contain"
              />

              {/* Info at Bottom */}
              {image.caption && (
                <div className="absolute bottom-8 left-0 right-0 text-center bg-black/70 backdrop-blur-md py-4 rounded-lg mx-4">
                  <p className="text-white font-bold text-lg">{image.caption}</p>
                  {image.month && (
                    <p className="text-gray-400 text-sm">Month {image.month}</p>
                  )}
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300 z-10"
              >
                <X size={28} />
              </button>

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-8 right-4 bg-black/70 px-4 py-2 rounded-full text-white text-sm font-bold">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
