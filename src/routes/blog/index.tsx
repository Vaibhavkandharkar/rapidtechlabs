import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  BookOpen,
  Tag,
  MessageSquare,
  Gauge,
} from "lucide-react";
import { blogPosts, blogCategories, formatBlogDate } from "@/lib/blog";
import { generateMeta, blogCollectionSchema, breadcrumbSchema } from "@/lib/seo";
import { CTASection } from "@/components/CTASection";
import { WHATSAPP_URL } from "@/components/FloatingWhatsAppButton";

export const Route = createFileRoute("/blog/")({
  head: () =>
    generateMeta({
      title: "Blog — Website Pricing, Custom Software, ERP & SEO Guides | RapidTechLabs",
      description:
        "Practical guides on website development cost in India, custom industrial ERP, hospital management systems, PaperGen EdTech, and technical SEO by RapidTechLabs.",
      path: "/blog",
    }),
  component: BlogIndexPage,
});

const PAGE_SIZE = 9;

function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [query, setQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const featuredPost = useMemo(() => blogPosts.find((p) => p.featured) ?? blogPosts[0], []);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, query]);

  const showFeaturedSpotlight =
    selectedCategory === "All" && query.trim() === "" && Boolean(featuredPost);

  const gridPosts = showFeaturedSpotlight
    ? filteredPosts.filter((p) => p.slug !== featuredPost.slug)
    : filteredPosts;

  const displayedGridPosts = gridPosts.slice(0, visibleCount);
  const hasMore = gridPosts.length > visibleCount;

  return (
    <div className="overflow-x-clip">
      {/* BLOG HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-white py-12 sm:py-16 lg:py-24">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 25%, oklch(0.75 0.16 205), transparent 45%), radial-gradient(circle at 80% 75%, oklch(0.45 0.22 260), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-full glass-dark px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-cyan">
            <BookOpen size={13} className="shrink-0" />
            <span>Engineering Insights · Pricing Guides · SEO</span>
          </span>
          <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Actionable Guides to{" "}
            <span className="bg-gradient-to-r from-cyan to-white bg-clip-text text-transparent">
              Build, Scale &amp; Rank
            </span>
          </h1>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Transparent pricing breakdowns, enterprise software blueprints, healthcare &amp; ERP
            architecture guides, and technical SEO checklists written by senior engineers at
            RapidTechLabs.
          </p>

          {/* Search Input */}
          <div className="mt-6 sm:mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search
                size={17}
                className="absolute left-3.5 sm:left-4 text-white/60 pointer-events-none"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder="Search website cost, ERP, hospital software, SEO..."
                aria-label="Search blog articles"
                className="w-full rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 text-sm text-white placeholder:text-white/55 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan transition"
              />
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-[11px] sm:text-xs text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={13} className="text-cyan shrink-0" /> {blogPosts.length} In-Depth
              Guides
            </span>
            <span className="hidden sm:inline">·</span>
            <span>Static Pre-Rendered for Instant Loading</span>
            <span className="hidden sm:inline">·</span>
            <span>Written by Senior Engineers</span>
          </div>
        </div>
      </section>

      {/* MAIN BLOG CONTENT */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        {/* Category Filter Tabs — horizontally scrollable on mobile, centered wrap on tablet/desktop */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:pb-0 sm:overflow-visible">
          <div className="flex sm:flex-wrap items-center sm:justify-center gap-2 w-max sm:w-auto">
            {blogCategories.map((cat) => {
              const count =
                cat === "All"
                  ? blogPosts.length
                  : blogPosts.filter((p) => p.category === cat).length;
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                    active
                      ? "bg-gradient-brand text-white shadow-glow"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                      active ? "bg-white/20 text-white" : "bg-secondary text-foreground/70"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FEATURED SPOTLIGHT CARD */}
        {showFeaturedSpotlight && featuredPost && (
          <article className="mb-10 sm:mb-14 group rounded-2xl sm:rounded-3xl overflow-hidden bg-card border border-border shadow-card hover:shadow-glow transition-all grid grid-cols-1 lg:grid-cols-12">
            <Link
              to="/blog/$slug"
              params={{ slug: featuredPost.slug }}
              className="lg:col-span-6 relative overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[360px]"
            >
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                width={1200}
                height={800}
              />
              <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="rounded-full bg-gradient-brand px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white shadow-glow">
                  Featured Guide
                </span>
                <span className="rounded-full glass-dark px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-cyan">
                  {featuredPost.category}
                </span>
              </div>
            </Link>

            <div className="lg:col-span-6 p-5 sm:p-8 lg:p-10 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary shrink-0" />{" "}
                    {formatBlogDate(featuredPost.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} className="text-primary shrink-0" /> {featuredPost.readTime}
                  </span>
                </div>

                <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                  <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition leading-snug">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {featuredPost.description}
                </p>

                <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                  {featuredPost.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-medium text-foreground/80"
                    >
                      <Tag size={10} className="text-accent shrink-0" /> {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <span className="text-xs font-medium text-muted-foreground">
                  By <strong className="text-foreground">{featuredPost.author}</strong>
                </span>
                <Link
                  to="/blog/$slug"
                  params={{ slug: featuredPost.slug }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-glow hover:brightness-110 transition shrink-0"
                >
                  Read Full Guide <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* ARTICLE GRID */}
        {displayedGridPosts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 text-center shadow-card">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              No matching articles found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different keyword or browse all categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setQuery("");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {displayedGridPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-glow hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-w-0"
              >
                <div>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="block aspect-[16/10] overflow-hidden relative"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={1200}
                      height={750}
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 rounded-md glass-dark px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan">
                      {post.category}
                    </span>
                  </Link>

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={12} className="text-primary shrink-0" />{" "}
                        {formatBlogDate(post.date)}
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} className="text-primary shrink-0" /> {post.readTime}
                      </span>
                    </div>

                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      <h3 className="mt-2.5 sm:mt-3 text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-muted-foreground truncate">
                    {post.tags[0] ?? post.category}
                  </span>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline shrink-0"
                  >
                    Read Article <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* SCALABLE LOAD MORE PAGINATION */}
        {hasMore && (
          <div className="mt-10 sm:mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition shadow-card"
            >
              Load More Articles ({gridPosts.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {/* HIGH-CONVERSION MID-PAGE BANNER */}
        <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl bg-gradient-hero text-white p-6 sm:p-8 lg:p-10 shadow-glow grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full glass-dark px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-cyan">
              <Gauge size={13} className="shrink-0" /> Free Technical Consultation
            </span>
            <h2 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
              Want to turn your website into a top-ranking lead engine?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
              Run our free technical website audit or speak directly with a RapidTechLabs solution
              architect on WhatsApp for transparent pricing and an actionable roadmap.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <a
              href="/#audit-tool"
              className="w-full sm:flex-1 lg:w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan px-5 py-3 text-sm font-semibold text-brand hover:brightness-110 transition shadow-glow"
            >
              Run Free Website Audit <ArrowRight size={15} />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 lg:w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] px-5 py-3 text-sm font-semibold text-white transition"
            >
              <MessageSquare size={15} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <CTASection
        title="Have a software, ERP, or SEO project in mind?"
        subtitle="Get a clear milestone quotation and architecture recommendation within 24 business hours."
        primaryText="Request Custom Proposal"
        secondaryText="Book Discovery Call"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogCollectionSchema(blogPosts)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ]),
          ),
        }}
      />
    </div>
  );
}
