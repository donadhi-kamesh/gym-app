'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { TransformationImage } from '@/types';

interface ImageCarouselProps {
  images: TransformationImage[];
  onImageClick?: (image: TransformationImage) => void;
}

export default function ImageCarousel({ images, onImageClick }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div className="relative bg-black rounded-2xl overflow-hidden h-96 md:h-[600px] group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <img
              src={currentImage.url}
              alt={currentImage.caption || 'Transformation image'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
          </motion.div>
        </AnimatePresence>

        {/* Image Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 text-white">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-gray-400 mb-1">
                {currentImage.type === 'before' && 'BEFORE'}
                {currentImage.type === 'after' && 'AFTER'}
                {currentImage.type === 'progress' && `MONTH ${currentImage.month}`}
              </p>
              {currentImage.caption && (
                <p className="text-lg font-bold">{currentImage.caption}</p>
              )}
            </div>
            <button
              onClick={() => onImageClick?.(currentImage)}
              className="bg-green-500/20 hover:bg-green-500/40 p-3 rounded-full transition-all duration-300 group"
            >
              <Maximize2 size={20} className="text-green-400 group-hover:text-green-300" />
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10 group"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10 group"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/70 px-4 py-2 rounded-full text-white text-sm font-bold">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Image Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-3 mt-6">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                index === currentIndex ? 'ring-2 ring-green-400' : ''
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image.url}
                alt={`Slide ${index + 1}`}
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
              />
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  index === currentIndex || hoveredIndex === index
                    ? 'bg-black/0'
                    : 'bg-black/60'
                }`}
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
