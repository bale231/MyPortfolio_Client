"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
}

// Helper function to normalize image paths
const normalizeImagePath = (src: string): string => {
  // Remove "public" prefix if present (Next.js serves public folder at root)
  if (src.startsWith('public/')) {
    return src.replace('public/', '/');
  }
  return src;
};

// Check if the src is an actual image path (not an emoji)
const isImagePath = (src: string): boolean => {
  const normalizedSrc = normalizeImagePath(src);
  return normalizedSrc.startsWith('/') || normalizedSrc.startsWith('http');
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlay = true,
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (isAnimating || images.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, images.length]);

  const goToPrevious = useCallback(() => {
    if (isAnimating || images.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, images.length]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, goToNext, images.length]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-purple-900/40 to-black rounded-2xl flex items-center justify-center">
        <span className="text-gray-500">Nessuna immagine disponibile</span>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Main Image Container */}
      <div className="relative aspect-video bg-gradient-to-br from-purple-900/20 to-black rounded-2xl overflow-hidden border border-purple-900/30">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 translate-x-0'
                : index < currentIndex
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
            }`}
          >
            {isImagePath(image.src) ? (
              <Image
                src={normalizeImagePath(image.src)}
                alt={image.alt}
                fill
                className="object-contain"
                priority={index === 0}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-9xl bg-gradient-to-br from-purple-900/40 to-black">
                {image.src}
              </div>
            )}
          </div>
        ))}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-purple-600/80 rounded-full flex items-center justify-center transition-all group"
              aria-label="Immagine precedente"
            >
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-purple-600/80 rounded-full flex items-center justify-center transition-all group"
              aria-label="Immagine successiva"
            >
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-sm text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Caption */}
      {images[currentIndex]?.caption && (
        <p className="mt-4 text-center text-gray-400 italic">
          {images[currentIndex].caption}
        </p>
      )}

      {/* Dots Navigation */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-purple-500 w-8'
                  : 'bg-gray-600 hover:bg-purple-400'
              }`}
              aria-label={`Vai all'immagine ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnails (for desktop) */}
      {images.length > 1 && (
        <div className="hidden md:flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-purple-500 scale-105'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              {isImagePath(image.src) ? (
                <Image
                  src={normalizeImagePath(image.src)}
                  alt={image.alt}
                  width={96}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl bg-gradient-to-br from-purple-900/40 to-black">
                  {image.src}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
