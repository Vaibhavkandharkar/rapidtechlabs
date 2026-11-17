import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Video, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import { InstantMeeting } from "@/components/InstantMeeting";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
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
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            to="/"
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/services"
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            Services
          </Link>
          <a
            href="/#pricing"
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
          >
            Pricing & Packages
          </a>
          <Link
            to="/portfolio"
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            Portfolio
          </Link>
          <a
            href="/#software-products"
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
          >
            DocuGen
          </a>
          <Link
            to="/about"
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            Contact
          </Link>
        </nav>
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
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
            >
              Services
            </Link>
            <a
              href="/#pricing"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary font-semibold text-primary"
            >
              Pricing & Packages
            </a>
            <Link
              to="/portfolio"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
            >
              Portfolio
            </Link>
            <a
              href="/#software-products"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
            >
              DocuGen Engine
            </a>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
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
