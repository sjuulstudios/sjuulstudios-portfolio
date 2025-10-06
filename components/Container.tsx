import { cn } from "@/lib/utils";
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("container-base", className)}>{children}</div>;
}
