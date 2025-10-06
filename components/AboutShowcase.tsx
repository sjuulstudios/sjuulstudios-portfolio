import { site } from '@/config/site';
export function AboutShowcase(){
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {site.aboutPillars.map(p=> (
        <div key={p.num} className="rounded-2xl bg-surface border border-border p-6 shadow-soft">
          <div className="text-4xl font-extrabold text-accent">{p.num}</div>
          <div className="mt-2 text-lg font-semibold tracking-wide">{p.title}</div>
          <p className="mt-2 text-sm text-white/80">{p.text}</p>
        </div>
      ))}
    </div>
  );
}
