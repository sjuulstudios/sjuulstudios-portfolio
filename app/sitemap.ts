import fs from 'node:fs';
import path from 'node:path';
export default async function sitemap(){
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sjuulstudios.com';
  const pages = ['/', '/contact'];
  const dir = path.join(process.cwd(), 'content/case-studies');
  const cs = fs.existsSync(dir)? fs.readdirSync(dir).filter(f=>f.endsWith('.mdx')).map(f=>`/case-studies/${f.replace(/\.mdx$/, '')}`) : [];
  return [...pages, ...cs].map((url)=> ({ url: base+url, lastModified: new Date() }));
}
