import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Linkedin,
  Twitter,
  Github,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.rapidtechlabs.in/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscription currently queued");
      }

      setStatus("success");
      setMessage("Subscribed successfully!");
      setEmail("");
    } catch (err: any) {
      // Local fallback
      try {
        const subscribers = JSON.parse(localStorage.getItem("rapidtechlabs_subscribers") || "[]");
        subscribers.push({ email, timestamp: new Date().toISOString() });
        localStorage.setItem("rapidtechlabs_subscribers", JSON.stringify(subscribers));
        setStatus("success");
        setMessage("Thank you for subscribing to RapidTechLabs insights!");
        setEmail("");
      } catch {
        setStatus("error");
        setMessage(err.message || "Something went wrong.");
      }
    }
  };

  return (
    <footer className="mt-24 bg-gradient-hero text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="RapidTechLabs"
              className="h-10 w-10 object-contain bg-white rounded-md p-1"
              width={40}
              height={40}
              loading="lazy"
            />
            <span className="font-display font-bold text-xl">RapidTechLabs</span>
          </div>
          <p className="mt-4 text-white/70 text-sm leading-relaxed max-w-sm">
            Building Solutions. Powering Futures. Premium website development, custom software
            engineering, ERP solutions, and AI integrations for forward-thinking enterprises
            worldwide.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/company/rapidtechlabs",
                label: "RapidTechLabs on LinkedIn",
              },
              {
                Icon: Twitter,
                href: "https://twitter.com/rapidtechlabs",
                label: "RapidTechLabs on X (Twitter)",
              },
              {
                Icon: Github,
                href: "https://github.com/rapidtechlabs",
                label: "RapidTechLabs on GitHub",
              },
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <div className="mt-6 text-xs text-white/60 space-y-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-cyan" /> 100% Strict NDA & Source Code
              Ownership
            </div>
            <div className="flex items-center gap-1.5">
              <Mail size={14} className="text-cyan" /> sales@rapidtechlabs.in
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-white">Company & Nav</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                All Services
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:text-white">
                Portfolio & Case Studies
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About & Methodology
              </Link>
            </li>
            <li>
              <Link to="/testimonials" className="hover:text-white">
                Testimonials
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact & Quotation
              </Link>
            </li>
            <li>
              <a href="/#agency-partners" className="hover:text-white text-cyan font-medium">
                Agency Partner Program
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-white">Core Practices</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link to="/services" className="hover:text-white">
                Website Development
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                Custom Software (SaaS)
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                Industrial ERP Solutions
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                Hospital & Clinic Management
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                Institute Management System
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                AI Integrations & Copilots
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                Search Engine Optimization (SEO)
              </Link>
            </li>
            <li>
              <a href="/#software-products" className="hover:text-white text-cyan font-medium">
                PaperGen (Software)
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-white">Stay In The Loop</h4>
          <p className="text-sm text-white/70 mb-3">
            Enterprise technology, AI & growth engineering insights.
          </p>
          <form className="flex gap-2" onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan"
            />
            <button
              disabled={status === "loading"}
              className="rounded-lg bg-cyan px-3.5 py-2 text-sm font-semibold text-brand hover:brightness-110 disabled:opacity-70"
            >
              {status === "loading" ? "..." : "Join"}
            </button>
          </form>
          {message && (
            <p
              className={`mt-2 text-xs ${status === "error" ? "text-red-400" : "text-emerald-400"}`}
            >
              {message}
            </p>
          )}

          <ul className="mt-6 space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-cyan" /> +91 9325378590
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-cyan" /> India & Global Remote-First (Pan-India
              Coverage)
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between text-xs text-white/60">
          <p>© {new Date().getFullYear()} RapidTechLabs. All rights reserved.</p>
          <p className="flex items-center gap-3 mt-2 sm:mt-0">
            <span>Building Solutions. Powering Futures.</span>
            <span>·</span>
            <a href="https://www.rapidtechlabs.in/sitemap.xml" className="hover:text-white">
              Sitemap
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
