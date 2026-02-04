"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // For client-side portal rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Lightbox functions
  const openLightbox = () => {
    if (!isImagePath(images[currentIndex]?.src)) return;
    setLightboxOpen(true);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'unset';
  };

  const toggleZoom = () => {
    if (zoomLevel === 1) {
      setZoomLevel(2.5);
    } else {
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    if (zoomLevel <= 1) return;
    const newZoom = Math.max(zoomLevel - 0.5, 1);
    setZoomLevel(newZoom);
    if (newZoom === 1) {
      setPanPosition({ x: 0, y: 0 });
    }
  };

  // Mouse drag for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          setZoomLevel(1);
          setPanPosition({ x: 0, y: 0 });
          break;
        case 'ArrowRight':
          goToNext();
          setZoomLevel(1);
          setPanPosition({ x: 0, y: 0 });
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToNext, goToPrevious, zoomLevel]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || images.length <= 1 || lightboxOpen) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, goToNext, images.length, lightboxOpen]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-purple-900/40 to-black rounded-2xl flex items-center justify-center">
        <span className="text-gray-500">Nessuna immagine disponibile</span>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <>
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
                <div
                  className="w-full h-full cursor-zoom-in relative group"
                  onClick={openLightbox}
                >
                  <Image
                    src={normalizeImagePath(image.src)}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                  {/* Zoom hint overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-4 py-2 rounded-full flex items-center gap-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      <span className="text-white text-sm">Clicca per ingrandire</span>
                    </div>
                  </div>
                </div>
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
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-purple-600/80 rounded-full flex items-center justify-center transition-all group z-10"
                aria-label="Immagine precedente"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-purple-600/80 rounded-full flex items-center justify-center transition-all group z-10"
                aria-label="Immagine successiva"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-sm text-white z-10">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Caption */}
        {currentImage?.caption && (
          <p className="mt-4 text-center text-gray-400 italic">
            {currentImage.caption}
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

      {/* Lightbox Modal - rendered via Portal to avoid stacking context issues */}
      {isMounted && lightboxOpen && isImagePath(currentImage?.src) && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget && zoomLevel === 1) closeLightbox();
          }}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-[10000] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            aria-label="Chiudi"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Zoom controls */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-2 bg-black/60 rounded-full px-4 py-2">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-purple-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Zoom out"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
            <span className="text-white min-w-[60px] text-center">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 4}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-purple-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Zoom in"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[10000] bg-black/60 px-4 py-2 rounded-full text-white">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Navigation arrows in lightbox */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => {
                  goToPrevious();
                  setZoomLevel(1);
                  setPanPosition({ x: 0, y: 0 });
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-purple-600/80 rounded-full flex items-center justify-center transition-all z-[10000]"
                aria-label="Immagine precedente"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  goToNext();
                  setZoomLevel(1);
                  setPanPosition({ x: 0, y: 0 });
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-purple-600/80 rounded-full flex items-center justify-center transition-all z-[10000]"
                aria-label="Immagine successiva"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Zoomable Image */}
          <div
            className={`relative max-w-[90vw] max-h-[80vh] overflow-hidden ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
            onClick={zoomLevel === 1 ? toggleZoom : undefined}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              style={{
                transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
              }}
            >
              <Image
                src={normalizeImagePath(currentImage.src)}
                alt={currentImage.alt}
                width={1920}
                height={1080}
                className="max-w-[90vw] max-h-[80vh] object-contain select-none"
                draggable={false}
                priority
              />
            </div>
          </div>

          {/* Caption in lightbox */}
          {currentImage?.caption && (
            <p className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white text-center bg-black/60 px-4 py-2 rounded-lg max-w-lg">
              {currentImage.caption}
            </p>
          )}

          {/* Keyboard hints */}
          <div className="absolute bottom-4 right-4 text-gray-500 text-xs hidden md:block">
            ESC chiudi · ← → naviga · +/- zoom
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ImageCarousel;
