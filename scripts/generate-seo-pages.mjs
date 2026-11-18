import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://www.rapidtechlabs.in";
const DIST_DIR = path.resolve(process.cwd(), "dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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

const navHtml = `
  <header>
    <nav aria-label="Primary navigation">
      <a href="/">RapidTechLabs</a>
      <a href="/services">Services</a>
      <a href="/portfolio">Portfolio &amp; Case Studies</a>
      <a href="/about">About RapidTechLabs</a>
      <a href="/testimonials">Project Scenarios</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>
`;

const footerHtml = `
  <footer>
    <p>RapidTechLabs — Building Solutions. Powering Futures. Website Development, Custom Software, ERP, AI Integration &amp; SEO Agency.</p>
    <p>Email: <a href="mailto:sales@rapidtechlabs.in">sales@rapidtechlabs.in</a> | Phone: <a href="tel:+919325378590">+91 9325378590</a></p>
    <nav aria-label="Footer navigation">
      <a href="/">Home</a>
      <a href="/services">Services</a>
      <a href="/portfolio">Portfolio</a>
      <a href="/about">About</a>
      <a href="/testimonials">Testimonials</a>
      <a href="/contact">Contact</a>
      <a href="/sitemap.xml">Sitemap</a>
    </nav>
  </footer>
`;

const routes = [
  {
    routePath: "/",
    outFile: "index.html",
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
          <h2>White-Label Agency Partner Program</h2>
          <p>Dedicated senior engineering pods under strict mutual NDA for digital marketing and design agencies across India, USA, UK, Canada, and Australia.</p>
        </section>
      </main>
    `,
  },
  {
    routePath: "/services",
    outFile: "services.html",
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
    routePath: "/about",
    outFile: "about.html",
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
            <li>Phone &amp; WhatsApp: <a href="tel:+919325378590">+91 9325378590</a></li>
            <li>Coverage: India &amp; Global Remote-First (USA, UK, Canada, Australia, UAE, Singapore)</li>
          </ul>
        </section>
      </main>
    `,
  },
];

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

  html = html.replace(
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
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

  // Inject semantic SEO snapshot inside #root (replaced immediately by React on mount)
  const seoSnapshot = `<div id="root"><div style="max-width:1100px;margin:0 auto;padding:24px;font-family:Inter,system-ui,sans-serif">${navHtml}${route.bodyHtml}${footerHtml}</div></div>`;
  html = html.replace('<div id="root"></div>', seoSnapshot);

  return html;
}

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error("dist/index.html not found. Run vite build first.");
  process.exit(1);
}

const baseTemplate = fs.readFileSync(TEMPLATE_PATH, "utf8");

for (const route of routes) {
  const html = buildRouteHtml(baseTemplate, route);
  const targetPath = path.join(DIST_DIR, route.outFile);
  fs.writeFileSync(targetPath, html, "utf8");
  console.log(`Generated static SEO page: dist/${route.outFile} -> ${SITE_URL}${route.routePath}`);
}
