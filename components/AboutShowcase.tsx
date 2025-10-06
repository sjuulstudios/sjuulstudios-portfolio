'use client';
import Image from 'next/image';
import { site } from '@/config/site';
import { cn } from '@/lib/utils';

export function AboutShowcase(){
  return (
    <div className="max-w-6xl mx-auto">
      {/* Centered Photo */}
      <div className="flex justify-center mb-12">
        <div className="relative">
          <div className="h-48 w-48 sm:h-56 sm:w-56 rounded-2xl overflow-hidden shadow-soft border border-border bg-black/20">
            <Image 
              src={site.heroPhoto} 
              alt={`${site.name} professional headshot`} 
              width={224} 
              height={224} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center">
            <span className="text-lg">✨</span>
          </div>
        </div>
      </div>
      
      {/* Four Pillars */}
      <div className="grid md:grid-cols-2 gap-6">
        {site.aboutPillars.map((p, index) => (
          <div 
            key={p.num} 
            className={cn(
              'rounded-2xl bg-surface border border-border p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-[1.02]',
              'animate-fade-in-up'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-4xl font-extrabold text-accent mb-2">{p.num}</div>
            <div className="text-lg font-semibold tracking-wide mb-3">{p.title}</div>
            <p className="text-sm text-white/80 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
