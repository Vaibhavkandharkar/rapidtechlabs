import devImg from "@/assets/dev.jpg";
import healthcareImg from "@/assets/healthcare.jpg";
import industrialImg from "@/assets/industrial.jpg";
import educationImg from "@/assets/education.jpg";
import marketingImg from "@/assets/marketing.jpg";
import aiImg from "@/assets/ai.jpg";
import dashboardImg from "@/assets/dashboard.jpg";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";

export type BlogBlock =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface BlogFaq {
  q: string;
  a: string;
}

export interface TocHeading {
  id: string;
  text: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  cover: string;
  coverImage: string;
  featured: boolean;
  tags: string[];
  ctaTitle: string;
  ctaLabel: string;
  ctaHref: string;
  blocks: BlogBlock[];
  headings: TocHeading[];
  faqs: BlogFaq[];
}

const COVER_MAP: Record<string, string> = {
  dev: devImg,
  healthcare: healthcareImg,
  industrial: industrialImg,
  education: educationImg,
  marketing: marketingImg,
  ai: aiImg,
  dashboard: dashboardImg,
  hero: heroImg,
  about: aboutImg,
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: normalized };
  }

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();
    if (key) data[key] = val;
  }

  return { data, body: match[2].trim() };
}

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseMarkdownBody(body: string): {
  blocks: BlogBlock[];
  headings: TocHeading[];
  faqs: BlogFaq[];
} {
  const lines = body.split("\n");
  const blocks: BlogBlock[] = [];
  const headings: TocHeading[] = [];
  const faqs: BlogFaq[] = [];

  let i = 0;
  let inFaqSection = false;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i++;
      continue;
    }

    // H2 heading
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      if (text.toLowerCase() === "frequently asked questions") {
        inFaqSection = true;
        i++;
        continue;
      }
      inFaqSection = false;
      const id = slugifyHeading(text);
      headings.push({ id, text });
      blocks.push({ type: "h2", id, text });
      i++;
      continue;
    }

    // FAQ section parsing (### Question followed by answer paragraphs)
    if (inFaqSection) {
      if (line.startsWith("### ")) {
        const q = line.slice(4).trim();
        i++;
        const answerParts: string[] = [];
        while (
          i < lines.length &&
          !lines[i].trim().startsWith("### ") &&
          !lines[i].trim().startsWith("## ")
        ) {
          const part = lines[i].trim();
          if (part) answerParts.push(part);
          i++;
        }
        if (q && answerParts.length > 0) {
          faqs.push({ q, a: answerParts.join(" ") });
        }
        continue;
      }
      i++;
      continue;
    }

    // H3 heading
    if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      blocks.push({ type: "h3", id: slugifyHeading(text), text });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    // Markdown table
    if (
      line.startsWith("|") &&
      i + 1 < lines.length &&
      /^\|[\s:|-]+\|$/.test(lines[i + 1].trim())
    ) {
      const headers = splitTableRow(line);
      i += 2; // skip header + divider
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitTableRow(lines[i]));
        i++;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    // Unordered list
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        items.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(
          lines[i]
            .trim()
            .replace(/^\d+\.\s+/, "")
            .trim(),
        );
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("> ") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("* ") &&
      !lines[i].trim().startsWith("|") &&
      !/^\d+\.\s+/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", text: paraLines.join(" ") });
    }
  }

  return { blocks, headings, faqs };
}

const rawFiles = import.meta.glob<string>("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const blogPosts: BlogPost[] = Object.entries(rawFiles)
  .map(([filePath, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const fallbackSlug = filePath.split("/").pop()?.replace(/\.md$/, "") ?? "article";
    const { blocks, headings, faqs } = parseMarkdownBody(body);
    const coverKey = (data.cover ?? "dev").toLowerCase();

    return {
      title: data.title ?? "RapidTechLabs Engineering Guide",
      slug: data.slug ?? fallbackSlug,
      description: data.description ?? "",
      category: data.category ?? "Engineering",
      date: data.date ?? "2026-11-18",
      readTime: data.readTime ?? "5 min read",
      author: data.author ?? "RapidTechLabs Engineering Team",
      cover: coverKey,
      coverImage: COVER_MAP[coverKey] ?? devImg,
      featured: data.featured === "true",
      tags: (data.tags ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      ctaTitle: data.ctaTitle ?? "Ready to build a fast, scalable digital solution?",
      ctaLabel: data.ctaLabel ?? "Request Free Consultation",
      ctaHref: data.ctaHref ?? "/contact",
      blocks,
      headings,
      faqs,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const blogCategories: string[] = [
  "All",
  ...Array.from(new Set(blogPosts.map((post) => post.category))),
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const others = blogPosts.filter((p) => p.slug !== post.slug);
  const sameCat = others.filter((p) => p.category === post.category);
  const diffCat = others.filter((p) => p.category !== post.category);
  return [...sameCat, ...diffCat].slice(0, limit);
}

export function formatBlogDate(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
