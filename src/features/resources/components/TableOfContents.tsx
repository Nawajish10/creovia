"use client";

import { useEffect, useState } from "react";

interface Heading {
  depth: number;
  text: string;
  id: string;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the heading is near the top of the viewport
          if (rect.top <= 160) {
            current = heading.id;
          }
        }
      }
      setActiveId(current || (headings[0]?.id || ""));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  return (
    <nav className="space-y-2 border-l border-outline-variant/30">
      {headings.map((heading) => {
        const isActive = activeId === heading.id;
        return (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block py-1 pl-4 transition-all text-sm ${
              heading.depth === 3 ? "pl-8 text-xs font-normal" : "font-medium"
            } ${
              isActive
                ? "border-l-2 border-primary -ml-[1.5px] text-primary font-semibold"
                : "border-l-2 border-transparent -ml-[1.5px] text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {heading.text}
          </a>
        );
      })}
    </nav>
  );
}
