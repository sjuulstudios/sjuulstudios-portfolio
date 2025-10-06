'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { site } from '@/config/site';

export default function CaseStudyCarousel() {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const total = site.caseStudies.length;

  const next = () => setIndex((index + 1) % total);
  const prev = () => setIndex((index - 1 + total) % total);

  const handleDragStart = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="relative py-20 bg-[var(--accent)] text-white overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-3">Case Studies</h2>
        <p className="text-base opacity-90">
          Real campaigns, real results. See how I've helped brands grow on TikTok.
        </p>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-6 z-20 bg-black/30 hover:bg-black/50 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200"
          aria-label="Previous case study"
        >
          ‹
        </button>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="flex items-center justify-center gap-6 md:gap-10 perspective-[1200px]"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {site.caseStudies.map((study, i) => {
            const offset = (i - index + total) % total;
            const isCenter = offset === 0;
            const isLeft = offset === total - 1;
            const isRight = offset === 1;

            // Only render 3 visible cards
            if (!isCenter && !isLeft && !isRight) return null;

            const transforms = isCenter
              ? 'z-30 scale-110 brightness-110 shadow-[0_0_25px_rgba(255,255,255,0.25)]'
              : isLeft
              ? 'z-20 scale-90 -rotate-y-[10deg] opacity-60 brightness-75'
              : 'z-20 scale-90 rotate-y-[10deg] opacity-60 brightness-75';

            return (
              <motion.div
                key={study.title}
                className={`relative transition-all duration-700 ease-out rounded-2xl overflow-hidden shadow-xl bg-black/20 aspect-[9/16] w-[220px] md:w-[260px] lg:w-[300px] cursor-pointer ${transforms}`}
                animate={{
                  scale: isCenter ? 1.1 : 0.9,
                  zIndex: isCenter ? 50 : 10,
                  opacity: isCenter ? 1 : 0.6,
                  rotateY: isLeft ? -10 : isRight ? 10 : 0,
                }}
                whileHover={isCenter ? { scale: 1.15 } : {}}
                onClick={() => router.push(`/case-studies/${study.title.toLowerCase().replace(/\s+/g, '-')}`)}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <video
                  src={study.video}
                  muted
                  loop
                  playsInline
                  className="object-cover w-full h-full transition-all duration-500 ease-out"
                  onMouseEnter={(e) => isCenter && e.currentTarget.play()}
                  onMouseLeave={(e) => isCenter && e.currentTarget.pause()}
                />
                <div className="absolute bottom-3 left-3 right-3 text-center text-sm font-medium bg-black/30 backdrop-blur-sm py-2 px-3 rounded-lg">
                  {study.title}
                </div>
                
                {/* Optional glow effect for center video */}
                {isCenter && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-6 z-20 bg-black/30 hover:bg-black/50 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200"
          aria-label="Next case study"
        >
          ›
        </button>
      </div>
    </section>
  );
}