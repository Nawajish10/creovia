import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerWidth?: "sm" | "md" | "lg" | "xl" | "full";
  background?: "default" | "muted" | "primary" | "secondary";
}

export function SectionWrapper({
  children,
  id,
  className,
  containerWidth = "xl",
  background = "default",
}: SectionWrapperProps) {
  const bgColors = {
    default: "bg-background",
    muted: "bg-muted",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
  };

  const maxW = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[1400px]",
    full: "max-w-full",
  };

  return (
    <section
      id={id}
      className={cn("w-full py-16 md:py-24", bgColors[background], className)}
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8 w-full", maxW[containerWidth])}>
        {children}
      </div>
    </section>
  );
}
