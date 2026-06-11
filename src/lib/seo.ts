/**
 * SEO helpers — centralised meta-tag and JSON-LD generation for every route.
 *
 * Usage in a TanStack Router route:
 *   head: () => generateMeta({ title, description, path, ... })
 */

// ─── constants ───────────────────────────────────────────────────────────────

export const SITE_URL = "https://www.rapidtechlabs.in";
export const SITE_NAME = "RapidTechLabs";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

// ─── meta generator ─────────────────────────────────────────────────────────

interface MetaOptions {
  /** Page title — will be used as-is (no suffix appended). */
  title: string;
  /** Meta description — aim for 150-160 chars. */
  description: string;
  /** Path starting with `/`, e.g. `/about`. */
  path: string;
  /** Override OG image URL. Defaults to `/og-image.png`. */
  ogImage?: string;
  /** Override og:type. Defaults to `website`. */
  ogType?: string;
  /** Extra meta tags to append. */
  extra?: Array<Record<string, string>>;
}

export function generateMeta(opts: MetaOptions) {
  const url = `${SITE_URL}${opts.path === "/" ? "" : opts.path}`;
  const image = opts.ogImage ?? DEFAULT_OG_IMAGE;

  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { name: "robots", content: "index, follow" },

      // Open Graph
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:type", content: opts.ogType ?? "website" },
      { property: "og:site_name", content: SITE_NAME },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: image },

      ...(opts.extra ?? []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

// ─── JSON-LD schemas ─────────────────────────────────────────────────────────

/** Organization schema — injected once in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Enterprise IT solutions: ERP, hospital & institute management, MVC product development, AI integration and digital marketing.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9325378590",
      email: "contact.rapidtechlabs@gmail.com",
      contactType: "sales",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      // Add real social URLs when available
    ],
  };
}

/** WebPage schema — one per route. */
export function webPageSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path === "/" ? "" : opts.path}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
}

/** FAQPage schema — for the homepage FAQ section. */
export function faqPageSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BreadcrumbList schema. */
export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
