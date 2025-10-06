'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Create infinite loop by duplicating items
  const infiniteItems = [...items, ...items, ...items];
  const itemsLength = items.length;

  // Get the actual item index using modulo
  const getActualIndex = useCallback((index: number) => {
    return ((index % itemsLength) + itemsLength) % itemsLength;
  }, [itemsLength]);

  // Get current visible items (5 items centered around currentIndex)
  const getVisibleItems = useCallback(() => {
    const startIndex = currentIndex;
    return infiniteItems.slice(startIndex, startIndex + 5).map((item, i) => ({
      ...item,
      actualIndex: getActualIndex(startIndex + i)
    }));
  }, [currentIndex, infiniteItems, getActualIndex]);

  const visibleItems = getVisibleItems();
  const middleIndex = 2; // Always the middle item (3rd out of 5)

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
    const itemWidth = 340; // Width including gap (320px + 20px gap)
    
    // Handle infinite loop
    let targetIndex = newIndex;
    if (newIndex < 0) {
      targetIndex = itemsLength - 1;
    } else if (newIndex >= itemsLength) {
      targetIndex = 0;
    }

    // Calculate scroll position for infinite loop
    const scrollPosition = (currentIndex + (targetIndex - getActualIndex(currentIndex))) * itemWidth;
    
    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    setCurrentIndex(currentIndex + (targetIndex - getActualIndex(currentIndex)));
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const itemWidth = 340;
    const scrollPosition = carouselRef.current.scrollLeft;
    const newIndex = Math.round(scrollPosition / itemWidth);
    
    // Update current index for infinite loop
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  // Handle infinite loop reset
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    const handleScrollEnd = () => {
      const itemWidth = 340;
      const scrollPosition = carousel.scrollLeft;
      const currentScrollIndex = Math.round(scrollPosition / itemWidth);
      
      // Reset position for infinite loop
      if (currentScrollIndex >= itemsLength * 2) {
        const newPosition = (currentScrollIndex - itemsLength) * itemWidth;
        carousel.scrollTo({ left: newPosition, behavior: 'auto' });
        setCurrentIndex(currentScrollIndex - itemsLength);
      } else if (currentScrollIndex < itemsLength) {
        const newPosition = (currentScrollIndex + itemsLength) * itemWidth;
        carousel.scrollTo({ left: newPosition, behavior: 'auto' });
        setCurrentIndex(currentScrollIndex + itemsLength);
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    carousel.addEventListener('scrollend', handleScrollEnd);
    
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      carousel.removeEventListener('scrollend', handleScrollEnd);
    };
  }, [currentIndex, itemsLength]);

  // Initialize carousel position
  useEffect(() => {
    if (carouselRef.current) {
      const itemWidth = 340;
      carouselRef.current.scrollLeft = itemsLength * itemWidth; // Start in the middle set
    }
  }, [itemsLength]);

  return (
    <div className="space-y-6">
      {/* Carousel */}
      <div className="relative">
        <div className="flex items-center justify-center gap-4">
          <button 
            aria-label="Previous case study"
            onClick={() => scrollToIndex(getActualIndex(currentIndex) - 1)}
            className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all duration-200 opacity-60 hover:opacity-100"
          >
            {'<'}
          </button>
          
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 max-w-5xl"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            {visibleItems.map((item, i) => {
              const isHovered = hoveredIndex === i;
              const isMiddle = i === middleIndex;
              
              return (
                <motion.div 
                  key={`${item.slug}-${i}`}
                  className={cn(
                    "snap-center shrink-0 rounded-2xl overflow-hidden border border-border bg-black shadow-soft cursor-pointer",
                    "w-[320px] h-[569px] aspect-[9/16]"
                  )}
                  whileHover={{ 
                    scale: 1.05,
                    zIndex: 10
                  }}
                  transition={{ 
                    duration: 0.25, 
                    ease: 'easeOut' 
                  }}
                  style={{
                    transformOrigin: 'center center',
                    boxShadow: isHovered ? '0 0 20px rgba(0,0,0,0.25)' : undefined
                  }}
                  onClick={() => router.push(`/case-studies/${item.slug}`)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Video 
                    src={item.src} 
                    poster={item.poster} 
                    className="w-full h-full object-cover rounded-2xl" 
                  />
                </motion.div>
              );
            })}
          </div>
          
          <button 
            aria-label="Next case study"
            onClick={() => scrollToIndex(getActualIndex(currentIndex) + 1)}
            className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all duration-200 opacity-60 hover:opacity-100"
          >
            {'>'}
          </button>
        </div>
      </div>
      
      {/* Client Info - Synced with middle item */}
      <div className="text-center animate-fade-in">
        <div className="font-semibold text-lg">{visibleItems[middleIndex]?.client}</div>
        <div className="text-sm opacity-80 mt-1">{visibleItems[middleIndex]?.description}</div>
      </div>
    </div>
  );
}