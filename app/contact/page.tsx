import Link from 'next/link';
import { Container } from '@/components/Container';
import { site } from '@/config/site';
export const metadata = { title: 'Contact — Sjuul Studios' };
export default function ContactPage(){
  return (
    <main>
      <section className="section-base bg-surface border-b border-border">
        <Container>
          <h1 className="text-3xl font-bold">Let's talk.</h1>
          <p className="mt-2 text-white/80">I usually respond within 1–2 business days.</p>
        </Container>
      </section>
      <section className="section-base">
        <Container className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            {site.email && <a href={`mailto:${site.email}`} className="inline-flex px-5 py-3 rounded-xl bg-accent text-onaccent font-semibold">Email me</a>}
            <div>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">LinkedIn</a>
            </div>
          </div>
          <div className="text-sm text-white/80">
            <p>Availability: limited slots this quarter. For urgent timelines, please mention your deadline.</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
