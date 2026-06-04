import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main className={cn("min-h-screen flex flex-col w-full bg-background", className)}>
      {children}
    </main>
  );
}
