'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Video } from './Video';
import { cn } from '@/lib/utils';

export type CarouselItem = { 
  src: string; 
  poster?: string; 
  client: string; 
  slug: string; 
  description: string; 
};

export function CaseStudyCarousel({ items }: { items: CarouselItem[] }){
  const [index, setIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const scrollToIndex = (newIndex: number) => {
    if (!carouselRef.current) return;
    const itemWidth = 340; // Width including gap for 5 items (320px + 20px gap)
    carouselRef.current.scrollTo({
      left: newIndex * itemWidth,
      behavior: 'smooth'
    });
    setIndex(newIndex);
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const itemWidth = 340; // Width including gap for 5 items (320px + 20px gap)
    const newIndex = Math.round(carouselRef.current.scrollLeft / itemWidth);
    setIndex(newIndex);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  // Show 5 items at a time
  const visibleItems = items.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Carousel */}
      <div className="relative">
        <div className="flex items-center justify-center gap-4">
          <button 
            aria-label="Previous case study"
            onClick={() => scrollToIndex(Math.max(0, index - 1))}
            disabled={index === 0}
            className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {'<'}
          </button>
          
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 max-w-5xl"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            {visibleItems.map((item, i) => {
              const isMiddle = i === 2; // Middle item (3rd out of 5)
              const isHovered = hoveredIndex === i;
              const shouldScale = isMiddle && isHovered;
              
              return (
                <div 
                  key={item.slug}
                  className={cn(
                    "snap-center shrink-0 rounded-2xl overflow-hidden border border-border bg-black shadow-soft transition-all duration-300 cursor-pointer",
                    "w-[320px] h-[569px]",
                    shouldScale && "scale-105"
                  )}
                  onClick={() => router.push(`/case-studies/${item.slug}`)}
                  onMouseEnter={() => isMiddle && setHoveredIndex(i)}
                  onMouseLeave={() => isMiddle && setHoveredIndex(null)}
                >
                  <Video 
                    src={item.src} 
                    poster={item.poster} 
                    className="w-full h-full object-cover rounded-2xl" 
                  />
                </div>
              );
            })}
          </div>
          
          <button 
            aria-label="Next case study"
            onClick={() => scrollToIndex(Math.min(items.length - 1, index + 1))}
            disabled={index === items.length - 1}
            className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {'>'}
          </button>
        </div>
      </div>
      
      {/* Client Info - Synced with middle item */}
      <div className="text-center animate-fade-in">
        <div className="font-semibold text-lg">{visibleItems[2]?.client}</div>
        <div className="text-sm opacity-80 mt-1">{visibleItems[2]?.description}</div>
      </div>
    </div>
  );
}
