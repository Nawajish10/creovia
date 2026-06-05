import Link from "next/link";

interface BreadcrumbStep {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  steps: BreadcrumbStep[];
  className?: string;
}

export function Breadcrumbs({ steps, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex font-body-md text-xs md:text-sm text-on-surface-variant ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 md:gap-2">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="hover:text-primary transition-colors flex items-center gap-1"
            style={{ minHeight: "unset" }}
          >
            <span className="material-symbols-outlined text-sm md:text-base">home</span>
            Home
          </Link>
        </li>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5 md:gap-2">
              <span className="text-outline-variant select-none">/</span>
              {isLast || !step.href ? (
                <span className="font-semibold text-on-surface truncate max-w-[150px] sm:max-w-xs" aria-current="page">
                  {step.name}
                </span>
              ) : (
                <Link 
                  href={step.href} 
                  className="hover:text-primary transition-colors flex items-center"
                  style={{ minHeight: "unset" }}
                >
                  {step.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
