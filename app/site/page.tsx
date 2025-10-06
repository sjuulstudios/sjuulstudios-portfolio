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
      {/* Hero Section */}
      <Section id="home" className="bg-accent text-onaccent min-h-screen flex items-center">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-sm tracking-widest opacity-90">{site.company}</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              {site.name}
              <br />
              <span className="text-onaccent/90">{site.role}</span>
            </h1>
            <p className="text-lg opacity-90 max-w-md">{site.heroTagline}</p>
            <div className="flex gap-4">
              <Link href="/contact" className="inline-flex px-6 py-3 rounded-xl bg-onaccent text-accent font-semibold hover:opacity-90 transition-opacity">
                Let's talk
              </Link>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex px-6 py-3 rounded-xl border border-onaccent/30 text-onaccent hover:bg-onaccent/10 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="h-64 w-64 sm:h-80 sm:w-80 rounded-full overflow-hidden shadow-soft border-4 border-onaccent/20 bg-black/20">
                <Image src={site.heroPhoto} alt={`${site.name} headshot`} width={512} height={512} className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-onaccent/20 backdrop-blur-sm border border-onaccent/30 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Logo Marquee */}
      <LogoMarquee />

      {/* Services Section */}
      <Section id="services" className="bg-surface">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
            <p className="text-white/70 max-w-2xl mx-auto">From strategy to execution, I help brands build authentic connections on TikTok through data-driven creative approaches.</p>
          </div>
          <ServicesAccordion />
        </Container>
      </Section>

      {/* About Section */}
      <Section id="about" className="bg-bg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Four pillars that drive every collaboration and campaign I work on.</p>
          </div>
          <AboutShowcase />
        </Container>
      </Section>

      {/* Case Studies Section */}
      <Section id="portfolio" className="bg-accent text-onaccent">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h2>
            <p className="text-onaccent/80 max-w-2xl mx-auto">Real campaigns, real results. See how I've helped brands grow on TikTok.</p>
          </div>
          <CaseStudyCarousel items={site.caseStudiesOrder.map(slug=> ({ 
            src: `/videos/${slug}-hero.mp4`, 
            poster: `/images/${slug}-cover.jpg`, 
            client: slug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()), 
            slug, 
            description: slug === 'template' ? 'Your campaign could be next' : 'Campaign overview' 
          }))} />
        </Container>
      </Section>

      {/* Contact CTA Section */}
      <Section className="bg-muted">
        <Container className="text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">Ready to collaborate?</h3>
            <p className="text-white/80 text-lg">Let's discuss how we can grow your brand on TikTok with authentic, data-driven creative strategies.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="inline-flex px-6 py-3 rounded-xl bg-accent text-onaccent font-semibold hover:opacity-90 transition-opacity">
                Start a conversation
              </Link>
              <div className="flex gap-4 text-sm">
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-accent transition-colors">LinkedIn</a>
                {site.email && (
                  <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-accent transition-colors">Email</a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
