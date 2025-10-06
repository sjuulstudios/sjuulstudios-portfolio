'use client';
import { useState } from 'react';
import { site } from '@/config/site';
import { cn } from '@/lib/utils';

export function ServicesAccordion(){
  const [open, setOpen] = useState<number | null>(null);
  
  return (
    <div className="divide-y divide-border rounded-2xl overflow-hidden">
      {site.services.map((s, idx) => {
        const expanded = open === idx;
        return (
          <div 
            key={s.title} 
            className={cn(
              'transition-colors duration-250',
              expanded ? 'bg-accent text-onaccent' : 'bg-transparent'
            )}
          >
            <button 
              aria-expanded={expanded} 
              aria-controls={`svc-${idx}`}
              onClick={() => setOpen(prev => prev === idx ? null : idx)} 
              className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left hover:opacity-80 transition-opacity duration-200"
            >
              <div>
                <div className="text-base font-semibold">{s.title}</div>
              </div>
              <span 
                className={cn(
                  'inline-flex items-center justify-center h-8 w-8 rounded-full border transition-colors duration-200',
                  expanded 
                    ? 'bg-onaccent text-accent border-onaccent' 
                    : 'border-border hover:border-accent'
                )}
                aria-hidden="true"
              >
                {expanded ? '−' : '+'}
              </span>
            </button>
            {expanded && (
              <div 
                id={`svc-${idx}`}
                className="px-5 pb-6 text-sm animate-fade-in"
                role="region"
                aria-labelledby={`svc-${idx}`}
              >
                <p>{s.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
