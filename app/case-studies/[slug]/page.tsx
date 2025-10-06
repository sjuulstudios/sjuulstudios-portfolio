import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Chip } from '@/components/Chip';
import { StatCard } from '@/components/StatCard';
import { Video } from '@/components/Video';

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

export default function CaseStudyPage({ params }: { params: { slug: string } }){
  const data = getCaseStudy(params.slug);
  if(!data) return notFound();
  const tags: string[] = data.tags || [];
  return (
    <main>
      <Section>
        <Container className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-2xl font-bold">{data.client} — {data.title}</h1>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              <div className="font-semibold text-white">What we did</div>
              <ul className="list-disc list-inside">
                <li>Strategy & positioning</li>
                <li>Creative & production</li>
                <li>Creator activations</li>
                <li>Paid distribution</li>
              </ul>
              <p className="mt-2">{data.excerpt}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map(t=> <Chip key={t}>{t}</Chip>)}
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border">
            <Video src={data.heroVideo} poster={data.cover} className="w-full h-[360px] bg-black object-cover" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex gap-4 overflow-x-auto snap-x">
            {(data.videos || []).map((v: any, i: number)=> (
              <div key={i} className="snap-center shrink-0 w-[220px] h-[392px] rounded-2xl overflow-hidden border border-border bg-black">
                <Video src={v.src} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid md:grid-cols-2 gap-8 items-start">
          <div className="grid grid-cols-2 gap-4">
            {(data.results || []).map((r: any)=> (<StatCard key={r.label} label={r.label} value={r.value} />))}
          </div>
          <div className="rounded-2xl overflow-hidden border border-border">
            <Video src={data.heroVideo} poster={data.cover} className="w-full h-[360px] bg-black object-cover" />
          </div>
        </Container>
      </Section>
    </main>
  );
}
