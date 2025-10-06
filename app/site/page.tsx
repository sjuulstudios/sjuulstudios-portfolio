import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { LogoMarquee } from '@/components/LogoMarquee';
import { ServicesAccordion } from '@/components/ServicesAccordion';
import { AboutShowcase } from '@/components/AboutShowcase';
import { CaseStudyCarousel } from '@/components/CaseStudyCarousel';
import { site } from '@/config/site';

export default function HomePage(){
  return (
    <main>
      <Section id="home" className="bg-accent text-onaccent">
        <Container className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-sm tracking-widest">{site.company}</div>
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold">{site.name} — {site.role}</h1>
            <p className="mt-4 text-base">{site.heroTagline}</p>
            <Link href="/contact" className="mt-6 inline-flex px-5 py-3 rounded-xl bg-onaccent text-accent font-semibold">Let's talk</Link>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="h-48 w-48 sm:h-64 sm:w-64 rounded-full overflow-hidden shadow-soft border border-onaccent/20 bg-black/20">
              <Image src={site.heroPhoto} alt={`${site.name} headshot`} width={512} height={512} className="h-full w-full object-cover" />
            </div>
          </div>
        </Container>
      </Section>

      <LogoMarquee />

      <Section id="services">
        <Container>
          <h2 className="text-2xl font-bold mb-6">Services</h2>
          <ServicesAccordion />
        </Container>
      </Section>

      <Section id="about">
        <Container>
          <h2 className="text-2xl font-bold mb-6">About Me</h2>
          <AboutShowcase />
        </Container>
      </Section>

      <Section id="portfolio" className="bg-accent">
        <Container>
          <h2 className="text-2xl font-bold text-onaccent mb-6">Case Studies</h2>
          <div className="text-onaccent">
            <CaseStudyCarousel items={site.caseStudiesOrder.map(slug=> ({ src: `/videos/${slug}-hero.mp4`, poster: `/images/${slug}-cover.jpg`, client: slug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()), slug, description: 'Campaign overview' }))} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="text-center">
          <h3 className="text-xl font-semibold">Ready to collaborate?</h3>
          <div className="mt-2">
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">LinkedIn</a>
            {site.email && <><span className="mx-2">·</span><a href={`mailto:${site.email}`} className="underline underline-offset-4">Email</a></>}
          </div>
          <Link href="/contact" className="mt-4 inline-flex px-5 py-3 rounded-xl bg-accent text-onaccent font-semibold">Contact</Link>
        </Container>
      </Section>
    </main>
  );
}
