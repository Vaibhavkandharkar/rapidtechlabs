import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://www.rapidtechlabs.in";
const DIST_DIR = path.resolve(process.cwd(), "dist");
const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const BLOG_DIR = path.resolve(process.cwd(), "src", "content", "blog");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeXml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "/" : item.path}`,
    })),
  };
}

function webPageJsonLd({ name, description, path: routePath }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${SITE_URL}${routePath === "/" ? "/" : routePath}`,
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", name: "RapidTechLabs", url: SITE_URL },
  };
}

function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: normalized };
  const data = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim();
    if (k) data[k] = v;
  }
  return { data, body: match[2].trim() };
}

function renderInlineHtml(text) {
  let out = escapeHtml(text);
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return out;
}

function markdownToStaticHtmlAndFaqs(body) {
  const lines = body.split("\n");
  const htmlParts = [];
  const faqs = [];
  let i = 0;
  let inFaq = false;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      const heading = line.slice(3).trim();
      if (heading.toLowerCase() === "frequently asked questions") {
        inFaq = true;
        htmlParts.push(`<h2>Frequently Asked Questions</h2>`);
        i++;
        continue;
      }
      inFaq = false;
      htmlParts.push(`<h2>${escapeHtml(heading)}</h2>`);
      i++;
      continue;
    }

    if (inFaq && line.startsWith("### ")) {
      const q = line.slice(4).trim();
      i++;
      const ans = [];
      while (
        i < lines.length &&
        !lines[i].trim().startsWith("### ") &&
        !lines[i].trim().startsWith("## ")
      ) {
        if (lines[i].trim()) ans.push(lines[i].trim());
        i++;
      }
      const a = ans.join(" ");
      if (q && a) {
        faqs.push({ q, a });
        htmlParts.push(`<h3>${escapeHtml(q)}</h3><p>${renderInlineHtml(a)}</p>`);
      }
      continue;
    }

    if (line.startsWith("### ")) {
      htmlParts.push(`<h3>${escapeHtml(line.slice(4).trim())}</h3>`);
      i++;
      continue;
    }

    // Code block
    if (line.startsWith("```")) {
      i++;
      const codeLines = [];
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      if (i < lines.length) i++;
      htmlParts.push(`<pre><code>${codeLines.join("\n")}</code></pre>`);
      continue;
    }

    if (line.startsWith("> ")) {
      const qLines = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        qLines.push(lines[i].trim().slice(2).trim());
        i++;
      }
      htmlParts.push(`<blockquote><p>${renderInlineHtml(qLines.join(" "))}</p></blockquote>`);
      continue;
    }

    if (
      line.startsWith("|") &&
      i + 1 < lines.length &&
      /^\|[\s:|-]+\|$/.test(lines[i + 1].trim())
    ) {
      const splitRow = (r) =>
        r
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());
      const headers = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      const thead = `<thead><tr>${headers.map((h) => `<th>${renderInlineHtml(h)}</th>`).join("")}</tr></thead>`;
      const tbody = `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${renderInlineHtml(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
      htmlParts.push(`<table>${thead}${tbody}</table>`);
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        items.push(`<li>${renderInlineHtml(lines[i].trim().slice(2).trim())}</li>`);
        i++;
      }
      htmlParts.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(
          `<li>${renderInlineHtml(
            lines[i]
              .trim()
              .replace(/^\d+\.\s+/, "")
              .trim(),
          )}</li>`,
        );
        i++;
      }
      htmlParts.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    const pLines = [];
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
      pLines.push(lines[i].trim());
      i++;
    }
    if (pLines.length > 0) {
      htmlParts.push(`<p>${renderInlineHtml(pLines.join(" "))}</p>`);
    } else if (i < lines.length) {
      htmlParts.push(`<p>${renderInlineHtml(lines[i].trim())}</p>`);
      i++;
    }
  }

  return { html: htmlParts.join("\n"), faqs };
}

function loadMarkdownBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      const slug = data.slug || file.replace(/\.md$/, "");
      const { html, faqs } = markdownToStaticHtmlAndFaqs(body);
      const tags = (data.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      return {
        title: data.title || slug,
        slug,
        description: data.description || "",
        category: data.category || "Engineering",
        date: data.date || "2026-11-18",
        readTime: data.readTime || "5 min read",
        author: data.author || "RapidTechLabs Engineering Team",
        tags,
        html,
        faqs,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

const navHtml = `
  <header>
    <nav aria-label="Primary navigation">
      <a href="/">RapidTechLabs</a>
      <a href="/services">Services</a>
      <a href="/portfolio">Portfolio &amp; Case Studies</a>
      <a href="/blog">Blog</a>
      <a href="/about">About RapidTechLabs</a>
      <a href="/testimonials">Project Scenarios</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>
`;

const footerHtml = `
  <footer>
    <p>RapidTechLabs — Building Solutions. Powering Futures. Website Development, Custom Software, ERP, AI Integration &amp; SEO Agency.</p>
    <p>Email: <a href="mailto:sales@rapidtechlabs.in">sales@rapidtechlabs.in</a> | Phone: <a href="tel:+918806884168">+91 8806884168</a></p>
    <nav aria-label="Footer navigation">
      <a href="/">Home</a>
      <a href="/services">Services</a>
      <a href="/portfolio">Portfolio</a>
      <a href="/blog">Blog</a>
      <a href="/about">About</a>
      <a href="/testimonials">Testimonials</a>
      <a href="/contact">Contact</a>
      <a href="/sitemap.xml">Sitemap</a>
      <a href="/rss.xml">RSS Feed</a>
    </nav>
  </footer>
`;

const blogPosts = loadMarkdownBlogPosts();

const staticRoutes = [
  {
    routePath: "/",
    outFile: "index.html",
    ogType: "website",
    title: "RapidTechLabs — Website Development, Custom Software & ERP Agency India",
    description:
      "Professional website development starting ₹19,999, custom software engineering, industrial ERP, hospital & institute management, SEO services, AI automation, and PaperGen software.",
    schemas: [
      webPageJsonLd({
        name: "RapidTechLabs — Website Development, Custom Software & ERP Agency India",
        description:
          "Professional website development, custom software engineering, industrial ERP, hospital & institute management, SEO services, AI automation, and PaperGen software.",
        path: "/",
      }),
      breadcrumbJsonLd([{ name: "Home", path: "/" }]),
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "PaperGen by RapidTechLabs",
        description:
          "Automated question paper, exam worksheet, and document generation platform deployed live on the cloud.",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web / Cloud",
        url: "https://paper-gen-five.vercel.app/",
        offers: {
          "@type": "Offer",
          price: "3999",
          priceCurrency: "INR",
        },
        publisher: {
          "@type": "Organization",
          name: "RapidTechLabs",
          url: SITE_URL,
        },
      },
    ],
    bodyHtml: `
      <main>
        <h1>Transforming Businesses Through Smart Technology Solutions</h1>
        <p>From launch-ready corporate websites and custom SaaS to modular ERPs, hospital &amp; institute management platforms, AI copilots, and technical SEO, RapidTechLabs engineers the digital backbone of ambitious businesses in India and worldwide.</p>
        <section>
          <h2>Core Technology Services</h2>
          <ul>
            <li><a href="/services#website-development">Website Development</a> — Launch Website (₹19,999), Starter Business (₹39,999), Growth Professional (₹99,999), Enterprise Custom (Starting ₹3,50,000).</li>
            <li><a href="/services#custom-software-development">Custom Software &amp; SaaS Development</a> — Scalable web applications, APIs, customer portals, and automation.</li>
            <li><a href="/services#industrial-erp">Industrial ERP Solutions</a> — Inventory, MRP, BOM, procurement, and shop-floor analytics.</li>
            <li><a href="/services#hospital-management">Hospital &amp; Clinic Management (HMS/EHR)</a> — OPD/IPD, billing, pharmacy, and lab workflows.</li>
            <li><a href="/services#institute-management">Institute Management System</a> — Admissions, fee management, attendance, and exam portals.</li>
            <li><a href="/services#seo-services">SEO Services &amp; Technical Audits</a> — SEO Foundation (₹19,999/mo) and Growth Accelerator (₹49,999/mo).</li>
            <li><a href="/services#website-maintenance">Website Maintenance &amp; Care</a> — Standard Care (₹5,999/mo) and Proactive SLA (₹24,999/mo).</li>
            <li><a href="/services#ai-integration">AI Copilots &amp; Business Automation</a> — Document AI, RAG assistants, and CRM workflow automation.</li>
          </ul>
        </section>
        <section>
          <h2>PaperGen by RapidTechLabs — Live Software Product</h2>
          <p>Automated question paper, exam worksheet, and document generation platform available live at <a href="https://paper-gen-five.vercel.app/">paper-gen-five.vercel.app</a>.</p>
        </section>
        <section>
          <h2>Latest Engineering &amp; SEO Guides</h2>
          <ul>
            ${blogPosts
              .map((p) => `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a></li>`)
              .join("\n")}
          </ul>
        </section>
      </main>
    `,
  },
  {
    routePath: "/services",
    outFile: "services.html",
    ogType: "website",
    title: "Website Development, Custom Software, ERP & SEO Services — RapidTechLabs",
    description:
      "Explore RapidTechLabs services: website development from ₹19,999, custom SaaS software, industrial ERP, hospital & institute management, AI automation, and technical SEO.",
    schemas: [
      webPageJsonLd({
        name: "Website Development, Custom Software, ERP & SEO Services — RapidTechLabs",
        description:
          "Website development, custom software engineering, industrial ERP, hospital & institute management, AI automation, SEO, and website maintenance.",
        path: "/services",
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "RapidTechLabs Engineering Services",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Website Development" },
          { "@type": "ListItem", position: 2, name: "Custom Software & SaaS Development" },
          { "@type": "ListItem", position: 3, name: "E-Commerce Development" },
          { "@type": "ListItem", position: 4, name: "Industrial ERP Solutions" },
          { "@type": "ListItem", position: 5, name: "Hospital & Clinic Management Systems" },
          { "@type": "ListItem", position: 6, name: "Institute Management Systems" },
          { "@type": "ListItem", position: 7, name: "AI Integration & Copilots" },
          { "@type": "ListItem", position: 8, name: "Business Automation" },
          { "@type": "ListItem", position: 9, name: "SEO Services" },
          { "@type": "ListItem", position: 10, name: "Digital Marketing" },
          { "@type": "ListItem", position: 11, name: "Website Maintenance & SLA" },
        ],
      },
    ],
    bodyHtml: `
      <main>
        <h1>Engineering Solutions Built For Scalable Growth</h1>
        <p>From high-converting web applications and SaaS platforms to industrial ERPs, hospital management software, institute management systems, SEO, and AI workflows, RapidTechLabs delivers end-to-end technical execution with 100% source code ownership.</p>
        <section>
          <h2>Web &amp; Custom Software Development</h2>
          <p>Responsive business websites starting at ₹19,999, e-commerce storefronts, and custom web applications built with React, TypeScript, Next.js, Node.js, Python, and .NET.</p>
        </section>
        <section>
          <h2>Enterprise ERP, Healthcare &amp; Education Platforms</h2>
          <p>Modular Industrial ERP (MRP, BOM, inventory), Hospital &amp; Clinic Management Systems (OPD/IPD, EHR, billing), and Institute Management Systems (admissions, fees, LMS).</p>
        </section>
        <section>
          <h2>SEO Services, AI Automation &amp; Website Maintenance</h2>
          <p>Technical SEO audits, keyword strategy, RAG AI copilots, CRM workflow automation, and monthly website maintenance starting at ₹5,999/month.</p>
          <p><a href="/contact">Request a Free Consultation &amp; Custom Proposal</a></p>
        </section>
      </main>
    `,
  },
  {
    routePath: "/portfolio",
    outFile: "portfolio.html",
    ogType: "website",
    title: "Portfolio & Case Studies — Demonstrated Technical Solutions | RapidTechLabs",
    description:
      "Explore demonstrated software architectures across manufacturing ERP, hospital platforms, institute systems, AI copilots, and high-performance websites built by RapidTechLabs.",
    schemas: [
      webPageJsonLd({
        name: "Portfolio & Case Studies — RapidTechLabs",
        description:
          "Demonstrated software architectures across manufacturing ERP, healthcare platforms, education systems, AI copilots, and high-performance websites.",
        path: "/portfolio",
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
      ]),
    ],
    bodyHtml: `
      <main>
        <h1>Demonstrated Technical Solutions &amp; Software Architectures</h1>
        <p>Explore representative engineering architectures delivered by RapidTechLabs across Manufacturing ERP, Hospital &amp; Clinic Management, University &amp; Institute Portals, E-Commerce, AI Copilots, and B2B SaaS platforms.</p>
        <section>
          <h2>Industries &amp; Delivered Systems</h2>
          <ul>
            <li>Industrial Manufacturing ERP — Multi-plant inventory, MRP, BOM, and live production telemetry.</li>
            <li>Hospital &amp; Clinic Management Platform — Paperless OPD/IPD, pharmacy, lab reporting, and billing.</li>
            <li>Education &amp; Institute Management Portal — Admissions, fee collection, attendance, and automated exam paper generation via PaperGen.</li>
            <li>High-Conversion Corporate Websites &amp; E-Commerce Platforms — Mobile-first, Core Web Vitals optimized architectures.</li>
          </ul>
          <p><a href="/contact">Book a Live Architecture Walkthrough</a></p>
        </section>
      </main>
    `,
  },
  {
    routePath: "/blog",
    outFile: "blog.html",
    ogType: "website",
    title: "Blog — Website Pricing, Custom Software, ERP & SEO Guides | RapidTechLabs",
    description:
      "Practical guides on website development cost in India, custom industrial ERP, hospital management systems, PaperGen EdTech, and technical SEO by RapidTechLabs.",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "RapidTechLabs Engineering & Growth Blog",
        description:
          "Actionable guides on website development pricing, custom software, industrial ERP, hospital management, PaperGen EdTech, and technical SEO.",
        url: `${SITE_URL}/blog`,
        inLanguage: "en-IN",
        blogPost: blogPosts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.date,
        })),
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
    bodyHtml: `
      <main>
        <h1>RapidTechLabs Blog — Engineering Insights, Pricing Guides &amp; Technical SEO</h1>
        <p>Transparent pricing breakdowns, enterprise software blueprints, healthcare &amp; ERP architecture guides, and technical SEO checklists written by RapidTechLabs.</p>
        <section>
          <h2>Published Articles</h2>
          <ul>
            ${blogPosts
              .map(
                (p) =>
                  `<li><article><h3><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a></h3><p>${escapeHtml(p.description)}</p></article></li>`,
              )
              .join("\n")}
          </ul>
        </section>
      </main>
    `,
  },
  {
    routePath: "/about",
    outFile: "about.html",
    ogType: "website",
    title: "About RapidTechLabs — Engineering Partner for Modern Businesses",
    description:
      "Meet the senior engineering team at RapidTechLabs building enterprise websites, custom software, ERP, and AI platforms with transparent milestone pricing and 100% code ownership.",
    schemas: [
      webPageJsonLd({
        name: "About RapidTechLabs — Engineering Partner for Modern Businesses",
        description:
          "Meet the senior engineering team building enterprise websites, custom software, ERP, and AI platforms with transparent pricing and code ownership.",
        path: "/about",
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
    bodyHtml: `
      <main>
        <h1>Engineering the Digital Backbone of Modern Enterprises</h1>
        <p>RapidTechLabs is a senior-led full-stack engineering, software development, and digital growth agency serving businesses, healthcare institutions, academies, and international agencies across India, USA, UK, Canada, and Australia.</p>
        <section>
          <h2>Core Engineering Principles</h2>
          <ul>
            <li>100% Source Code &amp; IP Ownership with enforceable mutual NDA.</li>
            <li>Transparent milestone-based pricing with clear deliverables.</li>
            <li>Senior full-stack engineers covering React, TypeScript, Node.js, Python, .NET, PostgreSQL, and Cloud DevOps.</li>
            <li>Structured 5-stage delivery methodology from discovery to post-launch SLA support.</li>
          </ul>
          <p><a href="/services">Explore Our Services</a> | <a href="/contact">Talk to Our Engineering Team</a></p>
        </section>
      </main>
    `,
  },
  {
    routePath: "/testimonials",
    outFile: "testimonials.html",
    ogType: "website",
    title: "Client Case Studies & Project Scenarios — RapidTechLabs",
    description:
      "Explore technical project scenarios and demonstrated solutions engineered by RapidTechLabs across ERP, healthcare, education, and digital platforms.",
    schemas: [
      webPageJsonLd({
        name: "Client Case Studies & Project Scenarios — RapidTechLabs",
        description:
          "Technical project scenarios and demonstrated solutions engineered by RapidTechLabs across ERP, healthcare, education, and web platforms.",
        path: "/testimonials",
      }),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Project Scenarios", path: "/testimonials" },
      ]),
    ],
    bodyHtml: `
      <main>
        <h1>Solutions Engineered for Real-World Operations</h1>
        <p>Representative architectures and project delivery scenarios engineered by RapidTechLabs across industrial manufacturing, healthcare, education, SaaS, and agency white-label partnerships.</p>
        <p><a href="/portfolio">View Full Portfolio</a> | <a href="/contact">Request NDA-Protected References</a></p>
      </main>
    `,
  },
  {
    routePath: "/contact",
    outFile: "contact.html",
    ogType: "website",
    title: "Contact RapidTechLabs — Book a Free Discovery Call Today",
    description:
      "Tell us about your project and get a tailored proposal within 24 business hours. Website development, custom software, ERP, SEO, AI integration, and agency partnerships.",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact RapidTechLabs",
        description:
          "Book a free discovery call or submit your project requirements for website development, custom software, ERP, SEO, or PaperGen.",
        url: `${SITE_URL}/contact`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
    bodyHtml: `
      <main>
        <h1>Let's Build What's Next for Your Organization</h1>
        <p>Tell us about your project goals, timeline, and requirements. A senior solution architect at RapidTechLabs will review your brief and respond within 24 business hours.</p>
        <section>
          <h2>Direct Contact Channels</h2>
          <ul>
            <li>Sales &amp; Technical Enquiries: <a href="mailto:sales@rapidtechlabs.in">sales@rapidtechlabs.in</a></li>
            <li>Phone &amp; WhatsApp: <a href="tel:+918806884168">+91 8806884168</a></li>
            <li>Coverage: India &amp; Global Remote-First (USA, UK, Canada, Australia, UAE, Singapore)</li>
          </ul>
        </section>
      </main>
    `,
  },
];

// Dynamically add every Markdown blog article as a pre-rendered static HTML route!
const blogRoutes = blogPosts.map((post) => {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: `${SITE_URL}/og-image.png`,
      datePublished: post.date,
      dateModified: post.date,
      articleSection: post.category,
      inLanguage: "en-IN",
      keywords: post.tags.join(", "),
      author: { "@type": "Organization", name: post.author, url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "RapidTechLabs",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  if (post.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return {
    routePath: `/blog/${post.slug}`,
    outFile: path.join("blog", `${post.slug}.html`),
    ogType: "article",
    title: `${post.title} | RapidTechLabs`,
    description: post.description,
    keywords: post.tags.join(", "),
    schemas,
    bodyHtml: `
      <main>
        <article>
          <p><a href="/blog">← Back to RapidTechLabs Blog</a> · ${escapeHtml(post.category)} · ${escapeHtml(post.readTime)}</p>
          <h1>${escapeHtml(post.title)}</h1>
          <p>${escapeHtml(post.description)}</p>
          ${post.html}
        </article>
      </main>
    `,
  };
});

const allRoutes = [...staticRoutes, ...blogRoutes];

function buildRouteHtml(template, route) {
  const canonicalUrl = `${SITE_URL}${route.routePath === "/" ? "/" : route.routePath}`;
  const safeTitle = escapeHtml(route.title);
  const safeDesc = escapeHtml(route.description);

  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);

  html = html.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${safeDesc}" />`,
  );

  if (route.keywords) {
    html = html.replace(
      /<meta\s+name="keywords"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`,
    );
  }

  html = html.replace(
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  );

  html = html.replace(
    /<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:type" content="${route.ogType ?? "website"}" />`,
  );

  html = html.replace(
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
  );

  html = html.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:title" content="${safeTitle}" />`,
  );

  html = html.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:description" content="${safeDesc}" />`,
  );

  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`,
  );

  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:description" content="${safeDesc}" />`,
  );

  const schemaScripts = route.schemas
    .map((schema) => `    <script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join("\n");

  html = html.replace("<!-- ROUTE_SCHEMA_SLOT -->", schemaScripts);

  const noscriptBlock = `    <noscript>
      <div id="seo-fallback-content" style="max-width:1100px;margin:0 auto;padding:24px;font-family:Inter,system-ui,sans-serif;color:#0f172a;background-color:#ffffff">
${navHtml}
${route.bodyHtml}
${footerHtml}
      </div>
    </noscript>`;

  if (html.includes("<!-- SEO_NOSCRIPT_SLOT -->")) {
    html = html.replace("<!-- SEO_NOSCRIPT_SLOT -->", noscriptBlock);
  } else if (html.includes("</div>\n    <script")) {
    html = html.replace("</div>\n    <script", `</div>\n${noscriptBlock}\n    <script`);
  } else {
    html = html.replace("</body>", `${noscriptBlock}\n  </body>`);
  }

  return html;
}

function generateSitemapXml() {
  const coreUrls = [
    { loc: `${SITE_URL}/`, changefreq: "weekly", priority: "1.0", withImage: true },
    { loc: `${SITE_URL}/services`, changefreq: "weekly", priority: "0.9" },
    { loc: `${SITE_URL}/blog`, changefreq: "daily", priority: "0.9" },
    { loc: `${SITE_URL}/portfolio`, changefreq: "weekly", priority: "0.8" },
    { loc: `${SITE_URL}/about`, changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE_URL}/testimonials`, changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/contact`, changefreq: "monthly", priority: "0.9" },
  ];

  const blogUrls = blogPosts.map((p) => ({
    loc: `${SITE_URL}/blog/${p.slug}`,
    changefreq: "weekly",
    priority: "0.8",
  }));

  const entries = [...coreUrls, ...blogUrls]
    .map((u) => {
      const imgBlock = u.withImage
        ? `\n    <image:image>\n      <image:loc>${SITE_URL}/og-image.png</image:loc>\n      <image:title>RapidTechLabs — Website Development, Custom Software &amp; ERP Agency</image:title>\n    </image:image>`
        : "";
      return `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>${imgBlock}\n  </url>`;
    })
    .join("\n\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset\n  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n>\n${entries}\n</urlset>\n`;
}

function generateRssXml() {
  const items = blogPosts
    .map((p) => {
      const link = `${SITE_URL}/blog/${p.slug}`;
      return `    <item>\n      <title>${escapeXml(p.title)}</title>\n      <link>${escapeXml(link)}</link>\n      <guid isPermaLink="true">${escapeXml(link)}</guid>\n      <description>${escapeXml(p.description)}</description>\n      <category>${escapeXml(p.category)}</category>\n    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>RapidTechLabs Blog — Web Development, ERP, AI &amp; SEO Guides</title>\n    <link>${SITE_URL}/blog</link>\n    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />\n    <description>Actionable engineering, pricing, and SEO guides from RapidTechLabs.</description>\n    <language>en-in</language>\n${items}\n  </channel>\n</rss>\n`;
}

function generateRobotsTxt() {
  return `# RapidTechLabs (https://www.rapidtechlabs.in)
# Robots Exclusion Protocol configuration

User-agent: *
Allow: /
Disallow: /*.map$
Disallow: /api/

# Major Search Engine Crawlers
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-News
Allow: /

User-agent: Googlebot-Video
Allow: /

User-agent: APIs-Google
Allow: /

User-agent: Mediapartners-Google
Allow: /

User-agent: AdsBot-Google
Allow: /

User-agent: AdsBot-Google-Mobile
Allow: /

User-agent: Storebot-Google
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# AI Search Engines & LLM Web Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: cohere-ai
Allow: /

# Sitemaps & Feeds
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/rss.xml

# Canonical Host
Host: ${SITE_URL}
`;
}

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error("dist/index.html not found. Run vite build first.");
  process.exit(1);
}

const baseTemplate = fs.readFileSync(TEMPLATE_PATH, "utf8");

for (const route of allRoutes) {
  const html = buildRouteHtml(baseTemplate, route);
  const targetPath = path.join(DIST_DIR, route.outFile);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, html, "utf8");
  console.log(
    `Generated static SEO page: dist/${route.outFile.replaceAll("\\", "/")} -> ${SITE_URL}${route.routePath}`,
  );
}

const sitemapXml = generateSitemapXml();
fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), sitemapXml, "utf8");
fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), sitemapXml, "utf8");
console.log(
  `Updated sitemap.xml with ${7 + blogPosts.length} URLs (including ${blogPosts.length} blog articles).`,
);

const rssXml = generateRssXml();
fs.writeFileSync(path.join(DIST_DIR, "rss.xml"), rssXml, "utf8");
fs.writeFileSync(path.join(PUBLIC_DIR, "rss.xml"), rssXml, "utf8");
console.log(`Generated rss.xml with ${blogPosts.length} blog articles.`);

const robotsTxt = generateRobotsTxt();
fs.writeFileSync(path.join(DIST_DIR, "robots.txt"), robotsTxt, "utf8");
fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), robotsTxt, "utf8");
console.log("Updated robots.txt in dist/ and public/.");
