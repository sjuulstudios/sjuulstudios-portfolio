'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { LogoMarquee } from '@/components/LogoMarquee';
import { ServicesAccordion } from '@/components/ServicesAccordion';
import { AboutShowcase } from '@/components/AboutShowcase';
import { CaseStudyCarousel } from '@/components/CaseStudyCarousel';
import { site } from '@/config/site';
import { motion } from 'framer-motion';

export default function HomePage(){
  return (
    <main>
      {/* Hero Section */}
      <Section id="home" variant="accent" className="min-h-screen flex items-center">
        <Container>
          <motion.div 
            className="flex flex-col items-center text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Centered Photo */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            >
              <div className="h-64 w-64 sm:h-80 sm:w-80 rounded-full overflow-hidden shadow-soft border-4 border-onaccent/20 bg-black/20">
                <Image 
                  src={site.heroPhoto} 
                  alt={`${site.name} headshot`} 
                  width={512} 
                  height={512} 
                  className="h-full w-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-onaccent/20 backdrop-blur-sm border border-onaccent/30 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </motion.div>

            {/* Centered Text */}
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
                {site.name}
              </h1>
              <div className="text-2xl sm:text-3xl md:text-4xl tracking-widest opacity-90">{site.company}</div>
              <div className="text-xl sm:text-2xl text-onaccent/90 font-medium">{site.role}</div>
              <p className="text-lg opacity-90 max-w-md mx-auto">{site.heroTagline}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex px-6 py-3 rounded-xl bg-onaccent text-accent font-semibold hover:opacity-90 transition-opacity duration-200"
                >
                  Let's talk
                </Link>
                <a 
                  href={site.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex px-6 py-3 rounded-xl border border-onaccent/30 text-onaccent hover:bg-onaccent/10 transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Logo Marquee */}
      <LogoMarquee />

      {/* Services Section */}
      <Section id="services" variant="muted">
        <Container>
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
            <p className="text-white/70 max-w-2xl mx-auto">From strategy to execution, I help brands build authentic connections on TikTok through data-driven creative approaches.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <ServicesAccordion />
          </motion.div>
        </Container>
      </Section>

      {/* About Section */}
      <AboutShowcase />

      {/* Case Studies Section */}
      <Section id="portfolio" variant="accent">
        <Container>
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h2>
            <p className="text-onaccent/80 max-w-2xl mx-auto">Real campaigns, real results. See how I've helped brands grow on TikTok.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <CaseStudyCarousel items={site.caseStudiesOrder.map(slug => ({ 
              src: `/videos/${slug}-hero.mp4`, 
              poster: `/images/${slug}-cover.jpg`, 
              client: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), 
              slug, 
              description: slug === 'template' ? 'Your campaign could be next' : 'Campaign overview' 
            }))} />
          </motion.div>
        </Container>
      </Section>

      {/* Contact CTA Section */}
      <Section variant="muted">
        <Container className="text-center">
          <motion.div 
            className="max-w-2xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold">Ready to collaborate?</h3>
            <p className="text-white/80 text-lg">Let's discuss how we can grow your brand on TikTok with authentic, data-driven creative strategies.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/contact" 
                className="inline-flex px-6 py-3 rounded-xl bg-accent text-onaccent font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                Start a conversation
              </Link>
              <div className="flex gap-4 text-sm">
                <a 
                  href={site.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline underline-offset-4 hover:text-accent transition-colors duration-200"
                >
                  LinkedIn
                </a>
                {site.email && (
                  <a 
                    href={`mailto:${site.email}`} 
                    className="underline underline-offset-4 hover:text-accent transition-colors duration-200"
                  >
                    Email
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}
