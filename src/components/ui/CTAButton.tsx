import { ReactNode } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  href?: string;
  children: ReactNode;
}

export function CTAButton({ href, children, variant, size, className, ...props }: CTAButtonProps) {
  if (href) {
    return (
      <Link href={href} className={cn(buttonVariants({ variant, size, className }))} {...(props as any)}>
        {children}
      </Link>
    );
  }

  return <Button variant={variant} size={size} className={className} {...props}>{children}</Button>;
}
