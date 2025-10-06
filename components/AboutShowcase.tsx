'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '@/config/site';

type Pillar = { num: string; title: string; text: string };

function PillarCard({ pillar, className }: { pillar: Pillar; className?: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6 md:p-8 shadow-sm ${className ?? ''}`}
    >
      <span aria-hidden className="pointer-events-none absolute -top-3 -left-2 md:-left-1 text-7xl md:text-8xl font-black opacity-10 leading-none select-none">
        {pillar.num}
      </span>
      <h3 className="text-lg md:text-xl font-semibold tracking-wide uppercase">{pillar.title}</h3>
      <p className="mt-3 text-sm md:text-base text-[var(--text)]/85">{pillar.text}</p>
    </motion.article>
  );
}

export default function AboutShowcase() {
  const [p1, p2, p3, p4] = site.aboutPillars;
  return (
    <section id="about" aria-labelledby="about-heading" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center">
          <div className="h-[2px] w-12 rounded-full bg-white/20 mb-3" />
          <h2 id="about-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-center">WORK WITH ME</h2>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[1fr_minmax(280px,_520px)_1fr] gap-8 lg:gap-12 items-start">
          {/* Left column: 1 & 3 */}
          <div className="space-y-6 md:space-y-8 order-2 md:order-1">
            <PillarCard pillar={p1} />
            <PillarCard pillar={p3} />
          </div>

          {/* Center photo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="order-1 md:order-2 rounded-2xl overflow-hidden bg-black/20 border border-[var(--border)] shadow"
          >
            <Image
              src={site.heroPhoto}
              alt="Sjuul Smits"
              width={1040}
              height={1560}
              className="h-full w-full object-cover"
              priority
            />
          </motion.div>

          {/* Right column: 2 & 4 */}
          <div className="space-y-6 md:space-y-8 order-3">
            <PillarCard pillar={p2} />
            <PillarCard pillar={p4} />
          </div>
        </div>
      </div>
    </section>
  );
}