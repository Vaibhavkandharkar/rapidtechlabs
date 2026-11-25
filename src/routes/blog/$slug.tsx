import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Check,
  Copy,
  Share2,
  List,
  ShieldCheck,
  MessageSquare,
  Mail,
  ExternalLink,
  Tag,
  ChevronRight,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { getBlogPostBySlug, getRelatedPosts, formatBlogDate } from "@/lib/blog";
import {
  generateMeta,
  blogPostingSchema,
  breadcrumbSchema,
  faqPageSchema,
  SITE_URL,
} from "@/lib/seo";
import { BlogProse } from "@/components/BlogProse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WHATSAPP_URL } from "@/components/FloatingWhatsAppButton";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);
    if (!post) {
      return {
        meta: [
          { title: "Article Not Found — RapidTechLabs Blog" },
          { name: "robots", content: "noindex, nofollow" },
        ],
      };
    }
    return generateMeta({
      title: `${post.title} | RapidTechLabs`,
      description: post.description,
      path: `/blog/${post.slug}`,
      ogType: "article",
      extra: [
        { name: "keywords", content: post.tags.join(", ") },
        { property: "article:published_time", content: post.date },
        { property: "article:section", content: post.category },
        ...post.tags.map((tag) => ({ property: "article:tag", content: tag })),
      ],
    });
  },
  component: BlogArticlePage,
});

function BlogArticlePage() {
  const { slug } = Route.useParams();
  const post = getBlogPostBySlug(slug);

  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 sm:py-24 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">404</span>
        <h1 className="mt-3 text-2xl sm:text-4xl font-bold text-foreground">Article not found</h1>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground">
          The blog article you requested doesn&apos;t exist or may have moved.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
        >
          <ArrowLeft size={15} /> Back to All Articles
        </Link>
      </div>
    );
  }

  const related = getRelatedPosts(post, 3);
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  const isExternalCta = post.ctaHref.startsWith("http://") || post.ctaHref.startsWith("https://");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard denial
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${post.title} — ${articleUrl}`,
  )}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    articleUrl,
  )}`;

  return (
    <div className="overflow-x-clip">
      {/* TOP READING PROGRESS BAR */}
      <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-brand transition-[width] duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ARTICLE HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-white py-10 sm:py-16 lg:py-20">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, oklch(0.75 0.16 205), transparent 45%), radial-gradient(circle at 85% 80%, oklch(0.45 0.22 260), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-white/70 mb-4 sm:mb-6"
          >
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <ChevronRight size={12} className="shrink-0" />
            <Link to="/blog" className="hover:text-white transition">
              Blog
            </Link>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-cyan font-semibold">{post.category}</span>
          </nav>

          <span className="inline-block rounded-full bg-white text-slate-900 shadow-md px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>

          <h1 className="mt-3 sm:mt-4 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl leading-relaxed">
            {post.description}
          </p>

          {/* Meta & Share Row */}
          <div className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-white/80">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-semibold text-white">{post.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} className="text-cyan shrink-0" /> {formatBlogDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} className="text-cyan shrink-0" /> {post.readTime}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                className="inline-flex items-center gap-1.5 rounded-lg glass-dark px-3 py-1.5 hover:bg-white/20 transition"
              >
                <Share2 size={12} /> WhatsApp
              </a>
              <a
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="inline-flex items-center gap-1.5 rounded-lg glass-dark px-3 py-1.5 hover:bg-white/20 transition"
              >
                LinkedIn
              </a>
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-1.5 rounded-lg glass-dark px-3 py-1.5 hover:bg-white/20 transition"
              >
                {copied ? <Check size={12} className="text-cyan" /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY + STICKY SIDEBAR */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* MAIN EDITORIAL COLUMN (min-w-0 prevents wide tables from causing mobile overflow) */}
          <article className="lg:col-span-8 min-w-0">
            {/* Cover Image */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-card mb-6 sm:mb-10 aspect-[16/9]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
                width={1280}
                height={720}
              />
            </div>

            {/* Mobile & Tablet Collapsible Table of Contents */}
            {post.headings.length > 0 && (
              <div className="lg:hidden mb-8 rounded-2xl bg-card border border-border shadow-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileTocOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-accent"
                >
                  <span className="inline-flex items-center gap-2">
                    <List size={15} /> On This Page ({post.headings.length} sections)
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      mobileTocOpen ? "rotate-180 text-primary" : "text-muted-foreground"
                    }`}
                  />
                </button>
                {mobileTocOpen && (
                  <ul className="px-4 pb-4 pt-1 border-t border-border space-y-2 text-sm">
                    {post.headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          onClick={() => setMobileTocOpen(false)}
                          className="block py-0.5 text-muted-foreground hover:text-primary transition leading-snug"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                    {post.faqs.length > 0 && (
                      <li>
                        <a
                          href="#faq-section"
                          onClick={() => setMobileTocOpen(false)}
                          className="block py-0.5 text-muted-foreground hover:text-primary transition leading-snug"
                        >
                          Frequently Asked Questions
                        </a>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}

            {/* Structured Markdown Content */}
            <BlogProse blocks={post.blocks} />

            {/* CONTEXTUAL IN-ARTICLE CTA */}
            <div className="mt-10 sm:mt-12 rounded-2xl sm:rounded-3xl bg-gradient-hero text-white p-6 sm:p-9 shadow-glow">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-cyan">
                RapidTechLabs Advisory
              </span>
              <h3 className="mt-2 text-xl sm:text-2xl font-bold leading-snug">{post.ctaTitle}</h3>
              <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
                Get transparent INR/USD pricing, technical architecture advice, and a clear delivery
                timeline from our senior engineering team.
              </p>
              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href={post.ctaHref}
                  target={isExternalCta ? "_blank" : undefined}
                  rel={isExternalCta ? "noopener noreferrer" : undefined}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-cyan px-5 py-2.5 text-sm font-semibold text-brand hover:brightness-110 transition shadow-glow"
                >
                  <span>{post.ctaLabel}</span>
                  {isExternalCta ? <ExternalLink size={15} /> : <ArrowRight size={15} />}
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] px-5 py-2.5 text-sm font-semibold text-white transition"
                >
                  <MessageSquare size={15} /> WhatsApp (+91 8806884168)
                </a>
              </div>
            </div>

            {/* FAQ ACCORDION (Targets Google "People Also Ask" Rich Snippets) */}
            {post.faqs.length > 0 && (
              <section
                id="faq-section"
                className="scroll-mt-24 mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle size={18} className="text-primary shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    Common Questions
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-5 sm:mb-6">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {post.faqs.map((faq, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`faq-${idx}`}
                      className="rounded-2xl border border-border bg-card px-4 sm:px-5 shadow-sm"
                    >
                      <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-foreground hover:no-underline py-3.5 sm:py-4">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            {/* TAGS + AUTHOR TRUST BOX */}
            <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border space-y-5 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground mr-1">Topics:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/85"
                  >
                    <Tag size={11} className="text-accent shrink-0" /> {tag}
                  </span>
                ))}
              </div>

              <div className="rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent">
                    Published By
                  </div>
                  <div className="mt-1 text-base font-bold text-foreground">{post.author}</div>
                  <p className="mt-1 text-xs text-muted-foreground max-w-lg leading-relaxed">
                    Senior full-stack developers, solution architects, and SEO engineers building
                    scalable web platforms, ERP systems, healthcare apps, and PaperGen.
                  </p>
                </div>
                <div className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-secondary px-3.5 py-2 text-xs font-semibold text-foreground shrink-0 self-start sm:self-center">
                  <ShieldCheck size={15} className="text-primary shrink-0" /> 100% NDA &amp; Code
                  Ownership
                </div>
              </div>
            </div>
          </article>

          {/* RIGHT STICKY SIDEBAR */}
          <aside className="lg:col-span-4 min-w-0 space-y-5 sm:space-y-6 lg:sticky lg:top-24">
            {/* Desktop Table of Contents */}
            {post.headings.length > 0 && (
              <div className="hidden lg:block rounded-2xl bg-card border border-border p-6 shadow-card">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                  <List size={15} /> On This Page
                </div>
                <ul className="space-y-2.5 text-sm">
                  {post.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="block text-muted-foreground hover:text-primary transition leading-snug"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                  {post.faqs.length > 0 && (
                    <li>
                      <a
                        href="#faq-section"
                        className="block text-muted-foreground hover:text-primary transition leading-snug"
                      >
                        Frequently Asked Questions
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* High-Conversion Lead Card */}
            <div className="rounded-2xl bg-gradient-soft border border-primary/25 p-5 sm:p-6 shadow-card">
              <span className="inline-block rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Free Project Consultation
              </span>
              <h3 className="mt-3 text-lg font-bold text-foreground">
                Need an engineering partner for your business?
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Websites starting at <strong>₹19,999</strong>, technical SEO from{" "}
                <strong>₹19,999/mo</strong>, and custom ERP/SaaS platforms with guaranteed code
                ownership.
              </p>

              <div className="mt-5 space-y-2.5">
                <a
                  href="/#enquiry-form"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-xs font-semibold text-white shadow-glow hover:brightness-110 transition"
                >
                  Request Custom Quote <ArrowRight size={14} />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] px-4 py-2.5 text-xs font-semibold text-white transition"
                >
                  <MessageSquare size={14} /> WhatsApp: +91 8806884168
                </a>
                <a
                  href="mailto:sales@rapidtechlabs.in"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card hover:bg-secondary px-4 py-2.5 text-xs font-semibold text-foreground transition"
                >
                  <Mail size={14} className="text-primary" /> sales@rapidtechlabs.in
                </a>
              </div>
            </div>

            {/* Quick Tools Promo */}
            <div className="rounded-2xl bg-card border border-border p-5 shadow-card space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-accent">
                Free Tools &amp; Software
              </div>
              <a
                href="/#audit-tool"
                className="block rounded-xl bg-secondary/60 hover:bg-secondary p-3 transition"
              >
                <div className="text-xs font-bold text-foreground">Free Technical SEO Audit →</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Check indexing, Core Web Vitals &amp; SSL health
                </div>
              </a>
              <a
                href="https://paper-gen-five.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-secondary/60 hover:bg-secondary p-3 transition"
              >
                <div className="text-xs font-bold text-foreground inline-flex items-center gap-1">
                  PaperGen Live Software <ExternalLink size={11} className="text-primary" />
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Automated question paper &amp; PDF generator
                </div>
              </a>
            </div>
          </aside>
        </div>

        {/* RELATED ARTICLES */}
        {related.length > 0 && (
          <section className="mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  Continue Reading
                </span>
                <h2 className="mt-1 text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                  Related Guides from RapidTechLabs
                </h2>
              </div>
              <Link
                to="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline shrink-0"
              >
                View All Articles <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {related.map((item) => (
                <article
                  key={item.slug}
                  className="group rounded-2xl overflow-hidden bg-white border border-border shadow-card hover:shadow-glow transition-all flex flex-col justify-between min-w-0"
                >
                  <div>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: item.slug }}
                      className="block aspect-[16/10] overflow-hidden relative"
                    >
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={900}
                        height={560}
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 rounded-md bg-white text-slate-900 shadow-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                    </Link>
                    <div className="p-4 sm:p-5">
                      <div className="text-[11px] text-muted-foreground">
                        {formatBlogDate(item.date)} · {item.readTime}
                      </div>
                      <Link to="/blog/$slug" params={{ slug: item.slug }}>
                        <h3 className="mt-2 font-bold text-base text-foreground group-hover:text-primary transition leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: item.slug }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      Read Guide <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 sm:hidden text-center">
              <Link
                to="/blog"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary hover:bg-secondary transition"
              >
                View All Articles <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        )}
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogPostingSchema({
              headline: post.title,
              description: post.description,
              path: `/blog/${post.slug}`,
              datePublished: post.date,
              authorName: post.author,
              keywords: post.tags,
              section: post.category,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
          ),
        }}
      />
      {post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageSchema(post.faqs)),
          }}
        />
      )}
    </div>
  );
}
