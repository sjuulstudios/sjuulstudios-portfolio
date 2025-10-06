'use client';
import Image from 'next/image';
import { site } from '@/config/site';
import { cn } from '@/lib/utils';

export function AboutShowcase(){
  return (
    <div className="max-w-6xl mx-auto">
      {/* Grid Layout: 1 picture 2, 3 picture 4 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pillar 1 */}
        <div 
          className={cn(
            'rounded-2xl bg-surface border border-border p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-[1.02]',
            'animate-fade-in-up'
          )}
          style={{ animationDelay: '0ms' }}
        >
          <div className="text-4xl font-extrabold text-accent mb-2">{site.aboutPillars[0].num}</div>
          <div className="text-lg font-semibold tracking-wide mb-3">{site.aboutPillars[0].title}</div>
          <p className="text-sm text-white/80 leading-relaxed">{site.aboutPillars[0].text}</p>
        </div>

        {/* Picture - Lengthened and centered */}
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="h-64 w-48 sm:h-72 sm:w-56 rounded-2xl overflow-hidden shadow-soft border border-border bg-black/20">
              <Image 
                src={site.heroPhoto} 
                alt={`${site.name} professional headshot`} 
                width={224} 
                height={288} 
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center">
              <span className="text-lg">✨</span>
            </div>
          </div>
        </div>

        {/* Pillar 3 */}
        <div 
          className={cn(
            'rounded-2xl bg-surface border border-border p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-[1.02]',
            'animate-fade-in-up'
          )}
          style={{ animationDelay: '200ms' }}
        >
          <div className="text-4xl font-extrabold text-accent mb-2">{site.aboutPillars[2].num}</div>
          <div className="text-lg font-semibold tracking-wide mb-3">{site.aboutPillars[2].title}</div>
          <p className="text-sm text-white/80 leading-relaxed">{site.aboutPillars[2].text}</p>
        </div>

        {/* Pillar 4 */}
        <div 
          className={cn(
            'rounded-2xl bg-surface border border-border p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-[1.02]',
            'animate-fade-in-up'
          )}
          style={{ animationDelay: '300ms' }}
        >
          <div className="text-4xl font-extrabold text-accent mb-2">{site.aboutPillars[3].num}</div>
          <div className="text-lg font-semibold tracking-wide mb-3">{site.aboutPillars[3].title}</div>
          <p className="text-sm text-white/80 leading-relaxed">{site.aboutPillars[3].text}</p>
        </div>
      </div>
    </div>
  );
}
