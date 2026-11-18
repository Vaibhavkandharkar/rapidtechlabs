import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import type { BlogBlock } from "@/lib/blog";

/**
 * Safely renders inline markdown: **bold**, *italic*, `code`, and [label](url).
 */
export function renderInlineMarkdown(text: string): React.ReactNode[] {
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={idx} className="italic text-foreground/90">
          {part.slice(1, -1)}
        </em>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-primary"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith("http://") || href.startsWith("https://");
      return (
        <a
          key={idx}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary transition"
        >
          {label}
        </a>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export function BlogProse({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6 text-foreground/90 leading-relaxed">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                id={block.id}
                className="scroll-mt-24 pt-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground border-t border-border/60 first:border-t-0 first:pt-0"
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={index}
                id={block.id}
                className="scroll-mt-24 pt-2 text-xl font-bold text-foreground"
              >
                {block.text}
              </h3>
            );

          case "paragraph":
            return (
              <p key={index} className="text-base sm:text-[17px] leading-8 text-muted-foreground">
                {renderInlineMarkdown(block.text)}
              </p>
            );

          case "ul":
            return (
              <ul key={index} className="space-y-3 my-4">
                {block.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base text-muted-foreground">
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-1" />
                    <span className="leading-7">{renderInlineMarkdown(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={index} className="space-y-3 my-4">
                {block.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-gradient-brand text-white text-xs font-bold grid place-items-center shrink-0 mt-0.5 shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="leading-7">{renderInlineMarkdown(item)}</span>
                  </li>
                ))}
              </ol>
            );

          case "blockquote":
            return (
              <blockquote
                key={index}
                className="my-6 rounded-2xl border border-primary/25 bg-gradient-soft p-5 sm:p-6 shadow-card"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-brand text-white grid place-items-center shrink-0 mt-0.5">
                    <Sparkles size={15} />
                  </div>
                  <p className="text-sm sm:text-base leading-7 text-foreground/90">
                    {renderInlineMarkdown(block.text)}
                  </p>
                </div>
              </blockquote>
            );

          case "table":
            return (
              <div
                key={index}
                className="my-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-card"
              >
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gradient-hero text-white">
                      {block.headers.map((header, idx) => (
                        <th key={idx} className="px-4 py-3.5 font-semibold whitespace-nowrap">
                          {renderInlineMarkdown(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {block.rows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-secondary/40 transition-colors">
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} className="px-4 py-3.5 text-muted-foreground align-top">
                            {renderInlineMarkdown(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
