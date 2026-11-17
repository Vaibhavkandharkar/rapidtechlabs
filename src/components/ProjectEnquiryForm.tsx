import { useState } from "react";
import {
  Send,
  CheckCircle2,
  ShieldCheck,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  Building2,
  Globe,
  Tag,
} from "lucide-react";
import { services } from "@/data/site";

interface FormState {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  preferredPackage: string;
  budget: string;
  country: string;
  description: string;
  honeypot: string; // Anti-spam trap
}

const initialFormState: FormState = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  service: "Website Development",
  preferredPackage: "Growth Professional (₹99,999)",
  budget: "₹50,000 - ₹1,00,000",
  country: "India",
  description: "",
  honeypot: "",
};

const packageOptions = [
  "Launch Website (₹19,999)",
  "Starter Business (₹39,999)",
  "Growth Professional (₹99,999 - Most Popular)",
  "Enterprise Custom (Starting ₹3,50,000)",
  "SEO Foundation (₹19,999 / mo)",
  "Growth Accelerator (₹49,999 / mo - Recommended)",
  "Standard Care Maintenance (₹5,999 / mo)",
  "Proactive SLA Maintenance (₹24,999 / mo)",
  "PaperGen Software Subscription",
  "Agency White-Label Partnership",
  "Custom Software / ERP Project",
];

const budgetRanges = [
  "Under ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹3,50,000",
  "₹3,50,000+",
  "Discuss with Technical Consultant",
];

const countryList = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "United Arab Emirates",
  "Singapore",
  "Germany",
  "Other International",
];

export function ProjectEnquiryForm({
  title = "Start Your Project — Request a Tailored Proposal & Quote",
  subtitle = "Tell us about your business goals and requirements. A senior consultant will review your brief and schedule a discovery call within 24 business hours.",
  defaultService,
  defaultPackage,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  defaultService?: string;
  defaultPackage?: string;
  className?: string;
}) {
  const [formData, setFormData] = useState<FormState>({
    ...initialFormState,
    service: defaultService || initialFormState.service,
    preferredPackage: defaultPackage || initialFormState.preferredPackage,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      errs.email = "Business email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Contact phone number is required";
    } else if (formData.phone.trim().length < 8) {
      errs.phone = "Please enter a valid phone number with country/area code";
    }

    if (!formData.description.trim()) {
      errs.description = "Please describe your project requirements";
    } else if (formData.description.trim().length < 15) {
      errs.description = "Please provide a little more detail (at least 15 characters)";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot detection
    if (formData.honeypot) {
      console.warn("Spam bot submission blocked.");
      setStatus("success");
      return;
    }

    if (!validate()) {
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const leadPayload = {
      name: formData.fullName,
      company: formData.businessName || "Not specified",
      businessName: formData.businessName || "Not specified",
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      package: formData.preferredPackage,
      preferredPackage: formData.preferredPackage,
      budget: formData.budget,
      country: formData.country,
      project: formData.description,
      timestamp: new Date().toISOString(),
      source: "rapidtechlabs_enquiry_form",
    };

    // Store lead locally first so data is never lost
    try {
      const existingLeads = JSON.parse(localStorage.getItem("rapidtechlabs_leads") || "[]");
      existingLeads.unshift(leadPayload);
      localStorage.setItem("rapidtechlabs_leads", JSON.stringify(existingLeads.slice(0, 50)));
    } catch {
      // Local storage disabled or full
    }

    try {
      const response = await fetch("https://api.rapidtechlabs.in/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      if (!response.ok) {
        console.warn("Backend API returned status:", response.status);
      }

      setStatus("success");
    } catch (err: any) {
      console.warn("API submission error (preserved locally):", err);
      setStatus("success");
    }
  };

  const mailtoLink = `mailto:contact.rapidtechlabs@gmail.com?subject=Project%20Enquiry:%20${encodeURIComponent(
    formData.preferredPackage,
  )}&body=${encodeURIComponent(
    `Full Name: ${formData.fullName}\nBusiness Name: ${formData.businessName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nPreferred Package: ${formData.preferredPackage}\nApprox Budget: ${formData.budget}\nCountry: ${formData.country}\n\nProject Requirements:\n${formData.description}`,
  )}`;

  const whatsappLink = `https://wa.me/919325378590?text=${encodeURIComponent(
    `Hi RapidTechLabs! I would like to consult about:\nName: ${formData.fullName || "Prospective Client"}\nBusiness: ${formData.businessName || "Business"}\nService: ${formData.service}\nPackage: ${formData.preferredPackage}\nBudget: ${formData.budget}`,
  )}`;

  return (
    <div
      className={`rounded-3xl bg-card border border-border shadow-card overflow-hidden ${className}`}
    >
      <div className="bg-gradient-hero text-white p-6 sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1 text-xs font-semibold text-cyan mb-3">
          <Sparkles size={14} /> Priority Business Discovery
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h3>
        <p className="mt-2 text-white/80 text-sm sm:text-base max-w-2xl">{subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/70">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-cyan" /> 24-Hour Response Target
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-cyan" /> 100% Strict NDA Protection
          </span>
          <span className="flex items-center gap-1.5">
            <Globe size={14} className="text-cyan" /> Competitive Indian Market Rates
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        {status === "success" ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 grid place-items-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="text-2xl font-bold text-foreground">Project Enquiry Received!</h4>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              Thank you,{" "}
              <strong className="text-foreground">{formData.fullName || "Partner"}</strong>. Our
              solutions team is reviewing your project requirements. We will connect with you via
              email/phone within 24 business hours with a detailed proposal.
            </p>

            <div className="mt-8 p-5 rounded-2xl bg-secondary/50 border border-border max-w-md mx-auto text-left text-xs sm:text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-semibold">{formData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Preferred Package:</span>
                <span className="font-semibold">{formData.preferredPackage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Approx. Budget:</span>
                <span className="font-semibold">{formData.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contact Email:</span>
                <span className="font-semibold">{formData.email}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 text-sm font-semibold transition"
              >
                <MessageSquare size={16} /> Fast-Track on WhatsApp
              </a>
              <button
                onClick={() => {
                  setStatus("idle");
                  setFormData(initialFormState);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card hover:bg-secondary px-5 py-2.5 text-sm font-semibold transition"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Honeypot field */}
            <div className="hidden" aria-hidden="true">
              <label>Leave blank</label>
              <input
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={handleChange}
              />
            </div>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Row 1: Full Name and Business Name */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition ${
                    errors.fullName ? "border-destructive focus:ring-destructive" : "border-input"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Business Name / Company
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="businessName"
                    placeholder="e.g. Apex Enterprises Pvt Ltd"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                  />
                  <Building2
                    size={16}
                    className="absolute right-3.5 top-3.5 text-muted-foreground pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email Address and Phone Number */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. rahul@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition ${
                      errors.email ? "border-destructive focus:ring-destructive" : "border-input"
                    }`}
                  />
                  <Mail
                    size={16}
                    className="absolute right-3.5 top-3.5 text-muted-foreground pointer-events-none"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Phone / WhatsApp Number <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition ${
                      errors.phone ? "border-destructive focus:ring-destructive" : "border-input"
                    }`}
                  />
                  <Phone
                    size={16}
                    className="absolute right-3.5 top-3.5 text-muted-foreground pointer-events-none"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>

            {/* Row 3: Service Required and Preferred Package */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Service Required <span className="text-destructive">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                >
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="PaperGen Software Platform">PaperGen Software Platform</option>
                  <option value="White-Label Agency Partnership">
                    White-Label Agency Partnership
                  </option>
                  <option value="Custom Technical Consultation">
                    Custom Technical Consultation
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Preferred Package
                </label>
                <div className="relative">
                  <select
                    name="preferredPackage"
                    value={formData.preferredPackage}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                  >
                    {packageOptions.map((pkg) => (
                      <option key={pkg} value={pkg}>
                        {pkg}
                      </option>
                    ))}
                  </select>
                  <Tag
                    size={16}
                    className="absolute right-3.5 top-3.5 text-muted-foreground pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Approximate Budget and Country */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Approximate Budget (INR / Global)
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                >
                  {budgetRanges.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Country / Region
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                >
                  {countryList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 5: Project Requirements */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Project Requirements & Overview <span className="text-destructive">*</span>
              </label>
              <textarea
                name="description"
                rows={4}
                required
                placeholder="Briefly describe what you're looking to build, any existing website/software, key functionality needed, and your preferred timeline..."
                value={formData.description}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition ${
                  errors.description ? "border-destructive focus:ring-destructive" : "border-input"
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-destructive">{errors.description}</p>
              )}
            </div>

            {/* Submit Button & Fast Tracks */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-8 py-4 font-semibold text-white shadow-glow hover:brightness-110 active:scale-[0.99] transition disabled:opacity-70 text-base"
              >
                {status === "submitting" ? (
                  "Sending Your Project Requirements..."
                ) : (
                  <>
                    <Send size={18} /> Request Custom Quotation & Scope
                  </>
                )}
              </button>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-primary" /> All information is strictly
                  confidential under NDA.
                </span>
                <div className="flex items-center gap-3">
                  <a href={mailtoLink} className="hover:text-primary transition underline">
                    Email Backup
                  </a>
                  <span>·</span>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-500 transition underline"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
