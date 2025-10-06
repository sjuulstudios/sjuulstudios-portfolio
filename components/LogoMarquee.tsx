'use client';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { site } from '@/config/site';
import { isReducedMotion } from '@/lib/utils';
export function LogoMarquee(){
  const [speed,setSpeed]=useState<number>(site.marqueeSpeed);
  useEffect(()=>{ if(isReducedMotion()) setSpeed(Math.max(12, Math.floor(site.marqueeSpeed/2))); },[]);
  const logos = useMemo(()=>[...site.logos, ...site.logos],[]);
  return (
    <div className="overflow-hidden border-y border-border bg-surface">
      <div className="container-base py-6">
        <div className="relative">
          <div className="flex gap-12 items-center whitespace-nowrap" style={{ animation: `marquee ${Math.max(10, 8000/speed)}s linear infinite` }}>
            {logos.map((src, i)=> (
              <div key={i} className="h-10 relative flex items-center" style={{ minWidth: 120 }}>
                <Image src={src} alt="Client logo" width={120} height={40} className="h-10 w-auto object-contain opacity-90" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
