'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/config/site';
import { cn } from '@/lib/utils';

const anchors = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#services', label: 'Services' }
];

export function Navbar() {
  const pathname = usePathname();
  const [active, setActive] = useState<string>('#home');

  useEffect(() => {
    if (pathname === '/contact') return;
    const sections = anchors.map(a => document.querySelector(a.href) as HTMLElement | null);
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <nav className="container-base flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide">{site.company}</Link>
        <div className="hidden md:flex items-center gap-6">
          {anchors.map(a => (
            <a key={a.href} href={a.href} className={cn('text-sm hover:opacity-80', active === a.href && 'text-accent')}>{a.label}</a>
          ))}
        </div>
        <Link href="/contact" className={cn('px-4 py-2 rounded-xl bg-accent text-onaccent text-sm font-medium hover:opacity-90', pathname === '/contact' && 'ring-2 ring-accent/60')}>Contact</Link>
      </nav>
    </div>
  );
}
