'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Video } from './Video';
export type CarouselItem = { src: string; poster?: string; client: string; slug: string; description: string };
export function CaseStudyCarousel({ items }: { items: CarouselItem[] }){
  const [index,setIndex]=useState(0);
  const router = useRouter();
  const active = items[index];
  return (
    <div>
      <div className="relative">
        <div className="flex items-center gap-4">
          <button aria-label="Previous" className="h-10 w-10 rounded-full bg-black/30 text-white" onClick={()=> setIndex((i)=> (i-1+items.length)%items.length)}>{'<'}</button>
          <div className="overflow-hidden rounded-2xl border border-border flex-1">
            <Video src={active.src} poster={active.poster} className="w-full h-[360px] bg-black object-cover" onClick={()=> router.push(`/case-studies/${active.slug}`)} />
          </div>
          <button aria-label="Next" className="h-10 w-10 rounded-full bg-black/30 text-white" onClick={()=> setIndex((i)=> (i+1)%items.length)}>{'>'}</button>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="font-semibold">{active.client}</div>
        <div className="text-sm text-white/80">{active.description}</div>
      </div>
    </div>
  );
}
