import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  variant?: "dark" | "muted" | "accent";
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, variant = "dark", className, children }: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn(
        "section-base",
        {
          "section--dark": variant === "dark",
          "section--muted": variant === "muted", 
          "section--accent": variant === "accent"
        },
        className
      )}
    >
      {children}
    </section>
  );
}
