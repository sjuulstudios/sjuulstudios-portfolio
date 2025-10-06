import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Chip } from '@/components/Chip';
import { StatCard } from '@/components/StatCard';
import { Video } from '@/components/Video';
import { site } from '@/config/site';

function getCaseStudy(slug: string){
  const file = path.join(process.cwd(), 'content/case-studies', `${slug}.mdx`);
  if(!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data } = matter(raw);
  return data as any;
}

export async function generateStaticParams(){
  const dir = path.join(process.cwd(), 'content/case-studies');
  const slugs = fs.existsSync(dir)? fs.readdirSync(dir).filter(f=>f.endsWith('.mdx')).map(f=>({ slug: f.replace(/\.mdx$/, '') })) : [];
  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getCaseStudy(slug);
  if(!data) return { title: 'Case Study Not Found' };
  
  return {
    title: `${data.client} — ${data.title} | ${site.company}`,
    description: data.excerpt,
    openGraph: {
      title: `${data.client} — ${data.title}`,
      description: data.excerpt,
      images: [data.cover],
      url: `${site.domain}/case-studies/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }){
  const { slug } = await params;
  const data = getCaseStudy(slug);
  if(!data) return notFound();
  const tags: string[] = data.tags || [];
  
  return (
    <main>
      {/* Hero Section */}
      <Section className="bg-surface border-b border-border">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="text-sm text-accent font-medium tracking-widest uppercase">Case Study</div>
            <h1 className="text-3xl md:text-5xl font-bold">{data.client}</h1>
            <h2 className="text-xl md:text-2xl text-white/80">{data.title}</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">{data.excerpt}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map(t=> <Chip key={t}>{t}</Chip>)}
            </div>
          </div>
        </Container>
      </Section>

      {/* Overview Section */}
      <Section>
        <Container className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Approach</h3>
              <div className="space-y-4 text-white/80">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted border border-border">
                    <div className="text-sm font-semibold text-accent mb-2">Strategy</div>
                    <div className="text-sm">Audience research, positioning, content pillars</div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted border border-border">
                    <div className="text-sm font-semibold text-accent mb-2">Creative</div>
                    <div className="text-sm">Concept development, shot lists, scripts</div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted border border-border">
                    <div className="text-sm font-semibold text-accent mb-2">Production</div>
                    <div className="text-sm">Creator matching, briefing, feedback</div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted border border-border">
                    <div className="text-sm font-semibold text-accent mb-2">Distribution</div>
                    <div className="text-sm">Paid campaigns, optimization, reporting</div>
                  </div>
                </div>
                <p className="text-base leading-relaxed">{data.excerpt}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border shadow-soft">
            <Video src={data.heroVideo} poster={data.cover} className="w-full h-[400px] bg-black object-cover" />
          </div>
        </Container>
      </Section>

      {/* Video Gallery Section */}
      <Section className="bg-muted">
        <Container>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">Campaign Content</h3>
            <p className="text-white/70">Vertical-first content designed for TikTok's algorithm</p>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 max-w-5xl">
              {(data.videos || []).map((v: any, i: number)=> {
                const isMiddle = i === Math.floor((data.videos || []).length / 2);
                return (
                  <div 
                    key={i} 
                    className={`snap-center shrink-0 rounded-2xl overflow-hidden border border-border bg-black shadow-soft transition-all duration-300 hover:scale-105 ${
                      isMiddle ? 'w-[280px] h-[500px]' : 'w-[240px] h-[426px]'
                    }`}
                  >
                    <Video src={v.src} className="w-full h-full object-cover" />
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Results Section */}
      <Section>
        <Container className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-6">Results</h3>
            <div className="grid grid-cols-2 gap-4">
              {(data.results || []).map((r: any)=> (<StatCard key={r.label} label={r.label} value={r.value} />))}
            </div>
            <div className="mt-8 p-6 rounded-2xl bg-accent/10 border border-accent/20">
              <h4 className="font-semibold text-accent mb-2">Key Learnings</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li>• Platform-native content outperformed repurposed assets</li>
                <li>• Creator authenticity drove higher engagement rates</li>
                <li>• Strategic timing aligned with audience behavior patterns</li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border shadow-soft">
            <Video src={data.heroVideo} poster={data.cover} className="w-full h-[400px] bg-black object-cover" />
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-accent text-onaccent">
        <Container className="text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">Ready to create your success story?</h3>
            <p className="text-onaccent/80 text-lg">Let's discuss how we can grow your brand on TikTok with data-driven creative strategies.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex px-6 py-3 rounded-xl bg-onaccent text-accent font-semibold hover:opacity-90 transition-opacity">
                Start a conversation
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex px-6 py-3 rounded-xl border border-onaccent/30 text-onaccent hover:bg-onaccent/10 transition-colors">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
