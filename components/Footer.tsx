import Link from 'next/link';
import { site } from '@/config/site';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-sm text-white/70">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} {site.company}</span>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
        </div>
      </Container>
    </footer>
  );
}
