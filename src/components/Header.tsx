import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Video,
  ArrowRight,
  ChevronDown,
  Globe,
  Laptop,
  ShoppingCart,
  Code2,
  Factory,
  HeartPulse,
  GraduationCap,
  BrainCircuit,
  Cpu,
  Search,
  Wrench,
  FileText,
  Handshake,
  Gauge,
  Sparkles,
  ShieldCheck,
  Tag,
  CreditCard,
  Layers,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { InstantMeeting } from "@/components/InstantMeeting";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"services" | "pricing" | "solutions" | null>(
    null,
  );
  const [mobileExpanded, setMobileExpanded] = useState<"services" | "pricing" | "solutions" | null>(
    null,
  );

  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMouseEnter = (menu: "services" | "pricing" | "solutions") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleDropdown = (menu: "services" | "pricing" | "solutions") => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const toggleMobileSubmenu = (menu: "services" | "pricing" | "solutions") => {
    setMobileExpanded((prev) => (prev === menu ? null : menu));
  };

  const closeAll = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* BRAND LOGO */}
        <Link to="/" onClick={closeAll} className="flex items-center gap-2 shrink-0">
          <img
            src={logo}
            alt="RapidTechLabs"
            className="h-9 w-9 object-contain"
            width={36}
            height={36}
          />
          <span className="font-display font-bold text-lg text-foreground">
            Rapid<span className="text-gradient-brand">TechLabs</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION WITH DROPDOWNS */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-1 relative">
          <Link
            to="/"
            onClick={closeAll}
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>

          {/* 1. SERVICES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("services")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("services")}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeDropdown === "services"
                  ? "text-primary bg-secondary/80 font-semibold"
                  : "text-foreground/80 hover:text-foreground hover:bg-secondary"
              }`}
            >
              <span>Services</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  activeDropdown === "services"
                    ? "rotate-180 text-primary"
                    : "text-muted-foreground"
                }`}
              />
            </button>

            {/* SERVICES MEGA MENU */}
            {activeDropdown === "services" && (
              <div className="absolute top-full left-0 mt-2 w-[680px] rounded-2xl bg-card/95 backdrop-blur-xl border border-border p-5 shadow-glow animate-in fade-in-0 zoom-in-95 duration-150 z-50">
                <div className="grid grid-cols-3 gap-6">
                  {/* Category 1 */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent block mb-2 px-2">
                      Web & Custom Software
                    </span>
                    <div className="space-y-1">
                      <a
                        href="/services#website-development"
                        onClick={closeAll}
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                          <Globe size={14} />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            Website Development
                          </div>
                          <div className="text-[10px] text-muted-foreground leading-snug">
                            Launch, Starter & Growth sites
                          </div>
                        </div>
                      </a>

                      <a
                        href="/services#custom-software-development"
                        onClick={closeAll}
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                          <Laptop size={14} />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            Custom Software & SaaS
                          </div>
                          <div className="text-[10px] text-muted-foreground leading-snug">
                            Bespoke portals & scalable APIs
                          </div>
                        </div>
                      </a>

                      <a
                        href="/services#ecommerce-development"
                        onClick={closeAll}
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                          <ShoppingCart size={14} />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            E-Commerce Stores
                          </div>
                          <div className="text-[10px] text-muted-foreground leading-snug">
                            Shopify & headless stores
                          </div>
                        </div>
                      </a>

                      <a
                        href="/services#mvc-product-development"
                        onClick={closeAll}
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                          <Code2 size={14} />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            MVC Engineering
                          </div>
                          <div className="text-[10px] text-muted-foreground leading-snug">
                            Clean architecture & DB design
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent block mb-2 px-2">
                      Enterprise & Healthcare
                    </span>
                    <div className="space-y-1">
                      <a
                        href="/services#industrial-erp"
                        onClick={closeAll}
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                          <Factory size={14} />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            Industrial ERP Solutions
                          </div>
                          <div className="text-[10px] text-muted-foreground leading-snug">
                            MRP, BOM & shop-floor tracking
                          </div>
                        </div>
                      </a>

                      <a
                        href="/services#hospital-management"
                        onClick={closeAll}
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                          <HeartPulse size={14} />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            Hospital & Clinics (EHR)
                          </div>
                          <div className="text-[10px] text-muted-foreground leading-snug">
                            OPD/IPD, lab & digital billing
                          </div>
                        </div>
                      </a>

                      <a
                        href="/services#institute-management"
                        onClick={closeAll}
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                          <GraduationCap size={14} />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            Institute Management
                          </div>
                          <div className="text-[10px] text-muted-foreground leading-snug">
                            Admissions, fees & LMS portal
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent block mb-2 px-2">
                      AI, SEO & Operations
                    </span>
                    <div className="space-y-1">
                      <a
                        href="/services#ai-integration"
                        onClick={closeAll}
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                          <BrainCircuit size={14} />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            AI Copilots & RAG
                          </div>
                          <div className="text-[10px] text-muted-foreground leading-snug">
                            Document AI & smart bots
                          </div>
                        </div>
                      </a>

                      <a
                        href="/services#business-automation"
                        onClick={closeAll}
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                          <Cpu size={14} />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            Business Automation
                          </div>
                          <div className="text-[10px] text-muted-foreground leading-snug">
                            API bridges & workflow RPA
                          </div>
                        </div>
                      </a>

                      <a
                        href="/services#seo-services"
                        onClick={closeAll}
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                          <Search size={14} />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            SEO & Search Visibility
                          </div>
                          <div className="text-[10px] text-muted-foreground leading-snug">
                            Technical audits & rankings
                          </div>
                        </div>
                      </a>

                      <a
                        href="/services#website-maintenance"
                        onClick={closeAll}
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                          <Wrench size={14} />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            Website Maintenance
                          </div>
                          <div className="text-[10px] text-muted-foreground leading-snug">
                            Uptime SLAs & daily backups
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Dropdown Footer Link */}
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    All services include 100% code ownership & strict NDA.
                  </span>
                  <Link
                    to="/services"
                    onClick={closeAll}
                    className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View All 12 Practices <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 2. PRICING DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("pricing")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("pricing")}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeDropdown === "pricing"
                  ? "text-primary bg-secondary/80 font-semibold"
                  : "text-foreground/80 hover:text-foreground hover:bg-secondary"
              }`}
            >
              <span>Pricing</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  activeDropdown === "pricing" ? "rotate-180 text-primary" : "text-muted-foreground"
                }`}
              />
            </button>

            {/* PRICING DROPDOWN MENU */}
            {activeDropdown === "pricing" && (
              <div className="absolute top-full left-0 mt-2 w-[460px] rounded-2xl bg-card/95 backdrop-blur-xl border border-border p-5 shadow-glow animate-in fade-in-0 zoom-in-95 duration-150 z-50">
                <div className="grid grid-cols-2 gap-4">
                  {/* Web Packages */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent block mb-2 px-2">
                      Website Packages (One-Time)
                    </span>
                    <div className="space-y-1">
                      <a
                        href="/#pricing"
                        onClick={closeAll}
                        className="group flex items-center justify-between p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            Launch Website
                          </div>
                          <div className="text-[10px] text-muted-foreground">Up to 3 pages</div>
                        </div>
                        <span className="font-bold text-xs text-foreground">₹19,999</span>
                      </a>

                      <a
                        href="/#pricing"
                        onClick={closeAll}
                        className="group flex items-center justify-between p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            Starter Business
                          </div>
                          <div className="text-[10px] text-muted-foreground">Up to 5 pages</div>
                        </div>
                        <span className="font-bold text-xs text-foreground">₹39,999</span>
                      </a>

                      <a
                        href="/#pricing"
                        onClick={closeAll}
                        className="group flex items-center justify-between p-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition border border-primary/20"
                      >
                        <div>
                          <div className="font-bold text-xs text-primary flex items-center gap-1">
                            <span>Growth Pro</span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-gradient-brand text-white font-bold uppercase">
                              Popular
                            </span>
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            Up to 12 pages + CMS
                          </div>
                        </div>
                        <span className="font-extrabold text-xs text-primary">₹99,999</span>
                      </a>

                      <a
                        href="/#pricing"
                        onClick={closeAll}
                        className="group flex items-center justify-between p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            Enterprise Custom
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            Portals & Software
                          </div>
                        </div>
                        <span className="font-bold text-xs text-foreground">₹3.5L+</span>
                      </a>
                    </div>
                  </div>

                  {/* Monthly Retainers */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent block mb-2 px-2">
                      Monthly Services
                    </span>
                    <div className="space-y-1">
                      <a
                        href="/#pricing"
                        onClick={closeAll}
                        className="group flex items-center justify-between p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            SEO Foundation
                          </div>
                          <div className="text-[10px] text-muted-foreground">Technical health</div>
                        </div>
                        <span className="font-bold text-xs text-foreground">₹19,999/m</span>
                      </a>

                      <a
                        href="/#pricing"
                        onClick={closeAll}
                        className="group flex items-center justify-between p-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition border border-primary/20"
                      >
                        <div>
                          <div className="font-bold text-xs text-primary flex items-center gap-1">
                            <span>Growth SEO</span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-gradient-brand text-white font-bold uppercase">
                              Top
                            </span>
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            35 keywords + links
                          </div>
                        </div>
                        <span className="font-extrabold text-xs text-primary">₹49,999/m</span>
                      </a>

                      <a
                        href="/#pricing"
                        onClick={closeAll}
                        className="group flex items-center justify-between p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            Standard Care
                          </div>
                          <div className="text-[10px] text-muted-foreground">Backups & updates</div>
                        </div>
                        <span className="font-bold text-xs text-foreground">₹5,999/m</span>
                      </a>

                      <a
                        href="/#pricing"
                        onClick={closeAll}
                        className="group flex items-center justify-between p-2 rounded-xl hover:bg-secondary transition"
                      >
                        <div>
                          <div className="font-semibold text-xs text-foreground group-hover:text-primary transition">
                            Proactive SLA
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            10h dev + emergency
                          </div>
                        </div>
                        <span className="font-bold text-xs text-foreground">₹24,999/m</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">GST additional where applicable.</span>
                  <a
                    href="/#pricing"
                    onClick={closeAll}
                    className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Compare Package Inclusions <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 3. SOLUTIONS & PRODUCTS DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("solutions")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("solutions")}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeDropdown === "solutions"
                  ? "text-primary bg-secondary/80 font-semibold"
                  : "text-foreground/80 hover:text-foreground hover:bg-secondary"
              }`}
            >
              <span>Solutions</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  activeDropdown === "solutions"
                    ? "rotate-180 text-primary"
                    : "text-muted-foreground"
                }`}
              />
            </button>

            {/* SOLUTIONS DROPDOWN MENU */}
            {activeDropdown === "solutions" && (
              <div className="absolute top-full left-0 mt-2 w-[420px] rounded-2xl bg-card/95 backdrop-blur-xl border border-border p-4 shadow-glow animate-in fade-in-0 zoom-in-95 duration-150 z-50">
                <div className="space-y-1.5">
                  <a
                    href="/#software-products"
                    onClick={closeAll}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-secondary transition"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                      <FileText size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-foreground group-hover:text-primary transition flex items-center gap-1.5">
                        <span>PaperGen</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-secondary text-accent font-bold uppercase">
                          Live App
                        </span>
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                        Automated question paper, exam worksheet & document generation platform.
                      </div>
                    </div>
                  </a>

                  <a
                    href="/#agency-partners"
                    onClick={closeAll}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-secondary transition"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                      <Handshake size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-foreground group-hover:text-primary transition flex items-center gap-1.5">
                        <span>White-Label Agency Partner</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-secondary text-cyan font-bold uppercase">
                          Agencies
                        </span>
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                        Dedicated development pods for digital marketing & design agencies.
                      </div>
                    </div>
                  </a>

                  <a
                    href="/#audit-tool"
                    onClick={closeAll}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-secondary transition"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                      <Gauge size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-foreground group-hover:text-primary transition flex items-center gap-1.5">
                        <span>Free Technical Website Audit</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-500 font-bold uppercase">
                          Free Tool
                        </span>
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                        Instant preliminary scorecard covering SEO, Core Web Vitals & SSL health.
                      </div>
                    </div>
                  </a>

                  <Link
                    to="/blog"
                    onClick={closeAll}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-secondary transition"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-foreground group-hover:text-primary transition flex items-center gap-1.5">
                        <span>Blog &amp; SEO Guides</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-primary/10 text-primary font-bold uppercase">
                          Insights
                        </span>
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                        Website pricing breakdowns, ERP &amp; healthcare blueprints, and technical
                        SEO checklists.
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Ready to scale?</span>
                  <a
                    href="/#enquiry-form"
                    onClick={closeAll}
                    className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Request Partner Brief <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/portfolio"
            onClick={closeAll}
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            Portfolio
          </Link>

          <Link
            to="/about"
            onClick={closeAll}
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={closeAll}
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            Contact
          </Link>
        </nav>

        {/* CTA BUTTONS ON DESKTOP */}
        <div className="hidden lg:flex items-center gap-2">
          <InstantMeeting
            trigger={
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-semibold text-foreground hover:bg-secondary transition">
                <Video size={14} /> Instant Meeting
              </button>
            }
          />
          <a
            href="/#pricing"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-glow hover:opacity-95 transition"
          >
            <span>View Packages</span> <ArrowRight size={14} />
          </a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE EXPANDABLE DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl max-h-[85vh] overflow-y-auto">
          <div className="px-4 py-4 flex flex-col gap-2">
            <Link
              to="/"
              onClick={closeAll}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
            >
              Home
            </Link>

            {/* Mobile Submenu: Services */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("services")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary text-foreground"
              >
                <span>Services</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    mobileExpanded === "services"
                      ? "rotate-180 text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
              {mobileExpanded === "services" && (
                <div className="pl-4 pr-2 py-2 space-y-1.5 bg-secondary/30 rounded-xl my-1 border border-border">
                  <a
                    href="/services#website-development"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • Website Development (Launch, Starter, Growth)
                  </a>
                  <a
                    href="/services#custom-software-development"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • Custom Software & SaaS Platforms
                  </a>
                  <a
                    href="/services#industrial-erp"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • Industrial ERP Solutions
                  </a>
                  <a
                    href="/services#hospital-management"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • Hospital & Clinic Management (EHR)
                  </a>
                  <a
                    href="/services#institute-management"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • Institute Management System
                  </a>
                  <a
                    href="/services#ai-integration"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • AI Copilots & RAG Integration
                  </a>
                  <a
                    href="/services#seo-services"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • Search Engine Optimization (SEO)
                  </a>
                  <Link
                    to="/services"
                    onClick={closeAll}
                    className="block text-xs py-1 font-semibold text-primary pt-1"
                  >
                    View All Services &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Submenu: Pricing */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("pricing")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary text-foreground"
              >
                <span>Pricing & Packages</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    mobileExpanded === "pricing"
                      ? "rotate-180 text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
              {mobileExpanded === "pricing" && (
                <div className="pl-4 pr-2 py-2 space-y-1.5 bg-secondary/30 rounded-xl my-1 border border-border">
                  <a
                    href="/#pricing"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • Launch Website: ₹19,999
                  </a>
                  <a
                    href="/#pricing"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • Starter Business: ₹39,999
                  </a>
                  <a
                    href="/#pricing"
                    onClick={closeAll}
                    className="block text-xs py-1 font-bold text-primary"
                  >
                    • Growth Professional: ₹99,999 (Most Popular)
                  </a>
                  <a
                    href="/#pricing"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • Enterprise Custom: Starting ₹3,50,000
                  </a>
                  <a
                    href="/#pricing"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • SEO Foundation: ₹19,999 / mo
                  </a>
                  <a
                    href="/#pricing"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • Standard Care Maintenance: ₹5,999 / mo
                  </a>
                  <a
                    href="/#pricing"
                    onClick={closeAll}
                    className="block text-xs py-1 font-semibold text-primary pt-1"
                  >
                    Full Comparison Table &rarr;
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Submenu: Solutions */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileSubmenu("solutions")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary text-foreground"
              >
                <span>Solutions & Software</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    mobileExpanded === "solutions"
                      ? "rotate-180 text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
              {mobileExpanded === "solutions" && (
                <div className="pl-4 pr-2 py-2 space-y-1.5 bg-secondary/30 rounded-xl my-1 border border-border">
                  <a
                    href="/#software-products"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • PaperGen (Question Paper & Document Platform)
                  </a>
                  <a
                    href="/#agency-partners"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • White-Label Agency Partner Program
                  </a>
                  <a
                    href="/#audit-tool"
                    onClick={closeAll}
                    className="block text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    • Free Technical Website Audit
                  </a>
                  <Link
                    to="/blog"
                    onClick={closeAll}
                    className="block text-xs py-1 font-semibold text-primary hover:underline"
                  >
                    • Blog &amp; SEO Guides
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/portfolio"
              onClick={closeAll}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
            >
              Portfolio & Case Studies
            </Link>

            <Link
              to="/about"
              onClick={closeAll}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
            >
              About RapidTechLabs
            </Link>

            <Link
              to="/contact"
              onClick={closeAll}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
            >
              Contact
            </Link>

            <div className="pt-2 flex flex-col gap-2">
              <InstantMeeting
                trigger={
                  <button className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition">
                    <Video size={14} /> Instant Meeting
                  </button>
                }
              />
              <a
                href="/#enquiry-form"
                onClick={closeAll}
                className="rounded-lg bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white text-center shadow-glow"
              >
                Request Custom Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
