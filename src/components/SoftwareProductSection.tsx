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
  const [activeTab, setActiveTab] = useState<"exampaper" | "worksheet" | "invoice">("exampaper");
  const [demoOpen, setDemoOpen] = useState(false);

  // Dynamic interactive demo state
  const [institutionName, setInstitutionName] = useState("Delhi Public Academy");
  const [subjectTitle, setSubjectTitle] = useState("Advanced Physics & Mathematics");
  const [totalMarks, setTotalMarks] = useState("100 Marks (3 Hours)");

  return (
    <section
      id="software-products"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
    >
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1 text-[11px] sm:text-xs font-semibold text-accent mb-3 shadow-card">
          <Sparkles size={14} className="text-primary shrink-0" /> {softwareProduct.badge}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {softwareProduct.name}
        </h2>
        <p className="mt-3 text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
          {softwareProduct.tagline}. Generate standardized, beautiful question papers, school
          worksheets, test blueprints, and institutional invoices in seconds.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          <a
            href={softwareProduct.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-glow hover:brightness-110 transition text-center"
          >
            <span>Launch Live PaperGen App</span>
            <ExternalLink size={15} className="shrink-0" />
          </a>
          <button
            onClick={() => setDemoOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-xs sm:text-sm font-semibold hover:bg-secondary transition"
          >
            <Eye size={16} /> Interactive Sandbox
          </button>
        </div>
      </div>

      {/* Main product feature showcase grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center mb-12 sm:mb-16">
        {/* Left: Overview and highlights */}
        <div className="lg:col-span-6 min-w-0 space-y-6">
          <div className="rounded-2xl bg-card border border-border p-5 sm:p-8 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                Why Teams Choose PaperGen
              </h3>
              <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full shrink-0">
                Active Live Deployment
              </span>
            </div>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
              {softwareProduct.overview}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {softwareProduct.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                      {h.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {h.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={softwareProduct.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition"
              >
                <span>Open PaperGen Software</span>
                <ExternalLink size={14} />
              </a>
              <a
                href="#enquiry-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-secondary transition text-center"
              >
                Request Custom Institutional Setup
              </a>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Document Generator Sandbox */}
        <div className="lg:col-span-6 min-w-0">
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-glow overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-primary shrink-0" />
                <span className="font-semibold text-sm">PaperGen Live Sandbox</span>
              </div>
              <div className="grid grid-cols-3 sm:flex gap-1 p-1 rounded-lg bg-secondary w-full sm:w-auto">
                {(
                  [
                    { id: "exampaper", label: "Exam Paper" },
                    { id: "worksheet", label: "Worksheet" },
                    { id: "invoice", label: "Invoice" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-2 sm:px-3 py-1.5 sm:py-1 rounded text-[11px] sm:text-xs font-semibold transition truncate ${
                      activeTab === tab.id
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Interactive Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">
                  {activeTab === "invoice" ? "Billed Client / Company" : "School / Academy Name"}
                </label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-2.5 py-2 text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">
                  {activeTab === "invoice" ? "Invoice Scope" : "Subject & Grade"}
                </label>
                <input
                  type="text"
                  value={subjectTitle}
                  onChange={(e) => setSubjectTitle(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-2.5 py-2 text-xs font-medium"
                />
              </div>
            </div>

            {/* Simulated Generated Document Page */}
            <div className="rounded-xl border border-border bg-background p-4 sm:p-6 shadow-sm text-xs space-y-4 font-mono">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 pb-4 border-b border-border">
                <div className="min-w-0">
                  <div className="font-bold text-sm sm:text-base text-foreground font-sans break-words">
                    {institutionName || "Apex Model Academy"}
                  </div>
                  <div className="text-muted-foreground break-words">
                    {activeTab === "invoice"
                      ? "RapidTechLabs Cloud Billing Dept."
                      : "Department of Academic Examinations"}
                  </div>
                  <div className="text-muted-foreground text-[10px] break-all">
                    Powered by PaperGen • paper-gen-five.vercel.app
                  </div>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary font-bold uppercase tracking-wider text-[10px]">
                    {activeTab === "exampaper"
                      ? "Annual Exam"
                      : activeTab === "worksheet"
                        ? "Practice Sheet"
                        : "Official Invoice"}
                  </span>
                  <div className="font-bold text-foreground mt-1">
                    {activeTab === "invoice" ? "INV-2026-904" : "CODE: PAP-2026-B"}
                  </div>
                  <div className="text-muted-foreground text-[10px]">Date: 2026-11-17</div>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-wider">
                  {activeTab === "invoice" ? "Bill Details:" : "Subject & Blueprint:"}
                </span>
                <div className="font-bold text-foreground text-sm font-sans break-words">
                  {subjectTitle || "Mathematics & Science Assessment"}
                </div>
                <div className="text-muted-foreground">
                  {activeTab === "invoice"
                    ? "PaperGen SaaS Enterprise Subscription (Annual)"
                    : totalMarks}
                </div>
              </div>

              <div className="rounded-lg bg-secondary/50 p-3 space-y-1.5 font-sans">
                <div className="flex justify-between gap-2 text-muted-foreground font-semibold border-b border-border pb-1 text-[11px]">
                  <span>{activeTab === "invoice" ? "Service Description" : "Section Details"}</span>
                  <span className="shrink-0">
                    {activeTab === "invoice" ? "Amount" : "Weightage"}
                  </span>
                </div>
                <div className="flex justify-between gap-3 text-foreground text-xs">
                  <span className="min-w-0">
                    {activeTab === "exampaper"
                      ? "Section A: Multiple Choice Questions (20 Qs)"
                      : activeTab === "worksheet"
                        ? "Part 1: Concept Drills & Formulas"
                        : "PaperGen Institutional Cloud License"}
                  </span>
                  <span className="font-bold shrink-0">
                    {activeTab === "invoice" ? "₹11,999/mo" : "20 Marks"}
                  </span>
                </div>
                <div className="flex justify-between gap-3 text-foreground text-xs">
                  <span className="min-w-0">
                    {activeTab === "exampaper"
                      ? "Section B: Long Analytical Problems (8 Qs)"
                      : activeTab === "worksheet"
                        ? "Part 2: Practical Lab Scenarios"
                        : "High-Resolution PDF Rendering API"}
                  </span>
                  <span className="font-bold shrink-0">
                    {activeTab === "invoice" ? "Included" : "80 Marks"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-2 border-t border-border">
                <span className="text-muted-foreground text-[10px]">
                  PaperGen Hash: #pg-9e4a8b-live
                </span>
                <a
                  href={softwareProduct.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold text-[11px] hover:underline inline-flex items-center gap-1 font-sans"
                >
                  Test on paper-gen-five.vercel.app <ExternalLink size={10} className="shrink-0" />
                </a>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-primary shrink-0" /> Generated in 35ms via PaperGen
                Cloud Engine
              </span>
              <a
                href={softwareProduct.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline inline-flex items-center gap-1 shrink-0"
              >
                Launch Full App <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PaperGen Pricing Tiers */}
      <div className="mt-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground">PaperGen Cloud Subscription Plans</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Choose a recurring subscription or deploy a customized private instance for your school,
            academy, or enterprise.
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

              <div className="mt-8 pt-4 border-t border-border space-y-2">
                <a
                  href={softwareProduct.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition ${
                    tier.popular
                      ? "bg-gradient-brand text-white shadow-glow hover:brightness-110"
                      : "border border-border bg-card hover:bg-secondary text-foreground"
                  }`}
                >
                  Try PaperGen Now <ExternalLink size={13} />
                </a>
                <a
                  href="#enquiry-form"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground pt-1"
                >
                  Enquire for Institution Pricing <ArrowRight size={11} />
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
            <DialogTitle>PaperGen — Question Paper & Document Engine</DialogTitle>
            <DialogDescription>
              Test generating dynamic exam papers, worksheets, and documents in real time.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-secondary/50 border border-border text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Software Status:</span>
                <span className="font-bold text-emerald-500 flex items-center gap-1">
                  ● Live on Vercel
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Direct URL:</span>
                <a
                  href={softwareProduct.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  https://paper-gen-five.vercel.app/
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Document Mode:</span>
                <span className="font-bold uppercase text-primary">{activeTab}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Institution / Scope:</span>
                <span className="font-semibold">{institutionName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">PDF Rendering Speed:</span>
                <span className="text-emerald-500 font-bold">Vectorized Export (35ms)</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Want a customized PaperGen instance with your institution's logo, custom question
              bank, syllabus templates, or automated grading export?
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDemoOpen(false)}
                className="rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-secondary"
              >
                Close Demo
              </button>
              <a
                href={softwareProduct.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-gradient-brand px-4 py-2 text-xs font-semibold text-white shadow-glow inline-flex items-center gap-1.5"
              >
                <span>Launch Live Web App</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
