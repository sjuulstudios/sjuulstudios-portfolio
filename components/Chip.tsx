import { cn } from '@/lib/utils';
export function Chip({ children, variant='default' }: { children: React.ReactNode; variant?: 'default'|'strategy'|'creative'|'ads'|'music'; }){
  const styles = { default: 'bg-muted text-white/90', strategy: 'bg-blue-600/20 text-blue-300', creative:'bg-pink-600/20 text-pink-300', ads:'bg-emerald-600/20 text-emerald-300', music:'bg-purple-600/20 text-purple-300' } as const;
  return <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs', styles[variant])}>{children}</span>;
}
