'use client';
import { useRef } from 'react';
export function Video({ src, poster, className, autoPlay=true, controls=false, onClick }: { src: string; poster?: string; className?: string; autoPlay?: boolean; controls?: boolean; onClick?: ()=>void; }){
  const ref = useRef<HTMLVideoElement | null>(null);
  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      playsInline
      loop
      preload="metadata"
      autoPlay={autoPlay}
      controls={controls}
      onClick={onClick}
      onError={() => { if (ref.current && poster) { ref.current.src = poster; } }}
    />
  );
}
