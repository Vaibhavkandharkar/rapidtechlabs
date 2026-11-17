import { useState } from "react";
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  Download,
  Sparkles,
  Zap,
  ShieldCheck,
  Eye,
  Layers,
  Printer,
  FileSpreadsheet,
  Send,
  ExternalLink,
} from "lucide-react";
import { softwareProduct } from "@/data/site";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SoftwareProductSection() {
  const [activeTab, setActiveTab] = useState<"invoice" | "quotation" | "proposal">("invoice");
  const [demoOpen, setDemoOpen] = useState(false);

  // Dynamic interactive demo state
  const [clientName, setClientName] = useState("Acme Global Corp");
  const [invoiceAmount, setInvoiceAmount] = useState("$3,450.00");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2026-0842");

  return (
    <section id="software-products" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1 text-xs font-semibold text-accent mb-3 shadow-card">
          <Sparkles size={14} className="text-primary" /> {softwareProduct.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {softwareProduct.name}
        </h2>
        <p className="mt-3 text-muted-foreground text-lg">
          {softwareProduct.tagline}. Eliminate manual document preparation and generate
          pixel-perfect PDFs, commercial proposals, and invoices in seconds.
        </p>
      </div>

      {/* Main product feature showcase grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
        {/* Left: Overview and highlights */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-card">
            <h3 className="text-xl font-bold text-foreground">Why Teams Choose DocuGen</h3>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
              {softwareProduct.overview}
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {softwareProduct.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                      {h.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-3">
              <button
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition"
              >
                <Eye size={16} /> Try Interactive Demo
              </button>
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-secondary transition"
              >
                Schedule Technical Walkthrough
              </a>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Document Generator Sandbox */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-glow overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                <span className="font-semibold text-sm">Live Document Sandbox</span>
              </div>
              <div className="flex gap-1.5 p-1 rounded-lg bg-secondary">
                {(["invoice", "quotation", "proposal"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded text-xs font-semibold capitalize transition ${
                      activeTab === tab
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Interactive Inputs */}
            <div className="grid grid-cols-2 gap-2 my-4 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">Recipient Organization</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">Document Total</label>
                <input
                  type="text"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs font-medium"
                />
              </div>
            </div>

            {/* Simulated Generated Document Page */}
            <div className="rounded-xl border border-border bg-background p-6 shadow-sm text-xs space-y-4 font-mono">
              <div className="flex justify-between items-start pb-4 border-b border-border">
                <div>
                  <div className="font-bold text-base text-foreground font-sans">
                    RapidTechLabs Inc.
                  </div>
                  <div className="text-muted-foreground">Document Solutions Division</div>
                  <div className="text-muted-foreground">contact.rapidtechlabs@gmail.com</div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary font-bold uppercase tracking-wider text-[10px]">
                    {activeTab}
                  </span>
                  <div className="font-bold text-foreground mt-1">{invoiceNumber}</div>
                  <div className="text-muted-foreground text-[10px]">Date: 2026-11-17</div>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-wider">
                  Billed To:
                </span>
                <div className="font-bold text-foreground text-sm font-sans">
                  {clientName || "Valued Enterprise Client"}
                </div>
                <div className="text-muted-foreground">
                  Enterprise Software & Development Contract
                </div>
              </div>

              <div className="rounded-lg bg-secondary/50 p-3 space-y-1.5">
                <div className="flex justify-between text-muted-foreground font-semibold border-b border-border pb-1">
                  <span>Scope Description</span>
                  <span>Qty / Amount</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>
                    {activeTab === "invoice"
                      ? "Enterprise SaaS Platform License (Q4)"
                      : activeTab === "quotation"
                        ? "Custom ERP Module Implementation"
                        : "Full-Stack Web Development Scope"}
                  </span>
                  <span className="font-bold">{invoiceAmount}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-muted-foreground text-[10px]">
                  DocuGen Hash: #9e4a8b72-2026
                </span>
                <div className="text-right">
                  <span className="text-muted-foreground text-[10px]">Total Due: </span>
                  <span className="font-bold text-sm text-foreground">{invoiceAmount}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-primary" /> Rendered in 42ms via DocuGen API
              </span>
              <button
                onClick={() => setDemoOpen(true)}
                className="text-primary font-semibold hover:underline flex items-center gap-1"
              >
                Expand View <ExternalLink size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DocuGen Pricing Tiers */}
      <div className="mt-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground">DocuGen Cloud Subscription Plans</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Choose a recurring subscription or deploy on your own enterprise infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {softwareProduct.pricing.map((tier) => (
            <div
              key={tier.tier}
              className={`rounded-2xl bg-card border p-6 flex flex-col justify-between transition-all ${
                tier.popular
                  ? "border-primary shadow-glow ring-2 ring-primary/20"
                  : "border-border shadow-card hover:border-primary/50"
              }`}
            >
              <div>
                {tier.popular && (
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-brand text-white text-[11px] font-bold tracking-wide uppercase mb-3">
                    Most Popular
                  </span>
                )}
                <h4 className="font-bold text-xl text-foreground">{tier.tier}</h4>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-foreground">{tier.priceUSD}</span>
                  <span className="text-xs text-muted-foreground">({tier.priceINR})</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-primary">{tier.docs}</div>

                <ul className="mt-6 space-y-2.5 text-xs text-foreground">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-border">
                <a
                  href="#enquiry-form"
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition ${
                    tier.popular
                      ? "bg-gradient-brand text-white shadow-glow hover:brightness-110"
                      : "border border-border bg-card hover:bg-secondary text-foreground"
                  }`}
                >
                  Subscribe to {tier.tier} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full interactive demo */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>DocuGen Engine — Interactive Document Demo</DialogTitle>
            <DialogDescription>
              Test generating a dynamic PDF invoice or proposal in real time.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-secondary/50 border border-border text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Document Type:</span>
                <span className="font-bold uppercase text-primary">{activeTab}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Client:</span>
                <span className="font-semibold">{clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal & Tax:</span>
                <span className="font-semibold">{invoiceAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">PDF Generation Status:</span>
                <span className="text-emerald-500 font-bold">Ready to Export (24ms)</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Interested in integrating automated PDF, proposal or invoice generation into your
              existing CRM, SaaS platform or enterprise database?
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDemoOpen(false)}
                className="rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-secondary"
              >
                Close Demo
              </button>
              <a
                href="#enquiry-form"
                onClick={() => setDemoOpen(false)}
                className="rounded-xl bg-gradient-brand px-4 py-2 text-xs font-semibold text-white shadow-glow"
              >
                Request API Access & Pilot
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
