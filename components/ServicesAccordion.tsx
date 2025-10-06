'use client';
import { useState } from 'react';
import { site } from '@/config/site';
export function ServicesAccordion(){
  const [open,setOpen]=useState<number | null>(0);
  return (
    <div className="divide-y divide-border rounded-2xl overflow-hidden">
      {site.services.map((s,idx)=>{
        const expanded = open===idx;
        return (
          <div key={s.title} className={expanded? 'bg-accent text-onaccent' : ''}>
            <button aria-expanded={expanded} aria-controls={`svc-${idx}`} onClick={()=> setOpen(prev=> prev===idx? null: idx)} className={`w-full flex items-center justify-between gap-4 px-5 py-5 text-left`}>
              <div>
                <div className="text-base font-semibold">{s.title}</div>
                {!expanded && <p className="text-sm opacity-80 line-clamp-1">{s.description}</p>}
              </div>
              <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full border ${expanded? 'bg-onaccent text-accent border-onaccent' : 'border-border'}`}>{expanded? '−' : '+'}</span>
            </button>
            {expanded && (
              <div id={`svc-${idx}`} className="px-5 pb-6 text-sm">
                <p>{s.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
