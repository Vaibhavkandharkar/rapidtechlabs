import { useMemo, useState } from "react";
import {
  Video,
  Calendar,
  Check,
  X,
  ExternalLink,
  MessageSquare,
  Download,
  Clock,
  ShieldCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WHATSAPP_NUMBER } from "@/components/FloatingWhatsAppButton";

const GOOGLE_MEET_HOST_EMAIL = "contact.rapidtechlabs@gmail.com";
const GOOGLE_MEET_NEW_URL = "https://meet.google.com/new";
export const GOOGLE_APPOINTMENT_URL =
  (import.meta.env.VITE_GOOGLE_APPOINTMENT_URL as string | undefined)?.trim() ||
  "https://calendar.app.google/jQaBcdQYuFKNrxUq8";

interface TimeSlot {
  value: string; // 24-hour HH:mm (IST)
  label: string;
}

const TIME_SLOTS: TimeSlot[] = [
  { value: "10:00", label: "10:00 AM" },
  { value: "11:30", label: "11:30 AM" },
  { value: "13:00", label: "01:00 PM" },
  { value: "15:00", label: "03:00 PM" },
  { value: "16:30", label: "04:30 PM" },
  { value: "18:00", label: "06:00 PM" },
];

function getUpcomingDates(count = 7): Date[] {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  return Array.from({ length: count }).map((_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return d;
  });
}

function toLocalDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatGoogleUtcTimestamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getUTCFullYear()}` +
    `${pad(date.getUTCMonth() + 1)}` +
    `${pad(date.getUTCDate())}T` +
    `${pad(date.getUTCHours())}` +
    `${pad(date.getUTCMinutes())}` +
    `${pad(date.getUTCSeconds())}Z`
  );
}

/**
 * Converts a YYYY-MM-DD date and HH:mm IST (UTC+05:30) time into exact Start/End Date objects.
 */
function buildIstSlotDates(dateKey: string, time24: string, durationMinutes = 30) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const [hh, mm] = time24.split(":").map(Number);
  // IST is UTC + 5h30m -> subtract 330 minutes from IST wall clock to obtain exact UTC epoch
  const startUtcMs = Date.UTC(y, m - 1, d, hh, mm, 0) - 330 * 60 * 1000;
  const start = new Date(startUtcMs);
  const end = new Date(startUtcMs + durationMinutes * 60 * 1000);
  return { start, end };
}

function buildGoogleCalendarMeetUrl(opts: {
  name: string;
  email: string;
  phone?: string;
  topic?: string;
  start: Date;
  end: Date;
}): string {
  const title = `Google Meet: RapidTechLabs × ${opts.name || "Project Discovery"}`;
  const detailsLines = [
    "Video Meeting scheduled via RapidTechLabs (https://www.rapidtechlabs.in)",
    "",
    `Client Name: ${opts.name || "Website Visitor"}`,
    `Client Email: ${opts.email || "Not provided"}`,
    opts.phone ? `Phone / WhatsApp: ${opts.phone}` : "",
    opts.topic ? `Discussion Topic: ${opts.topic}` : "",
    "",
    `Host Google Meet Account: ${GOOGLE_MEET_HOST_EMAIL}`,
    "Please click 'Save' to confirm the invite and attach the Google Meet video link automatically.",
  ].filter(Boolean);

  const attendees = [GOOGLE_MEET_HOST_EMAIL, opts.email].filter(Boolean).join(",");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatGoogleUtcTimestamp(opts.start)}/${formatGoogleUtcTimestamp(opts.end)}`,
    details: detailsLines.join("\n"),
    location: "Google Meet",
    add: attendees,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadIcsFile(opts: {
  name: string;
  email: string;
  topic?: string;
  start: Date;
  end: Date;
  meetLink?: string;
}) {
  const uid = `rtl-${Date.now()}@rapidtechlabs.in`;
  const summary = `Google Meet: RapidTechLabs × ${opts.name}`;
  const description = [
    `Project Discussion with RapidTechLabs`,
    `Host: ${GOOGLE_MEET_HOST_EMAIL}`,
    `Guest: ${opts.name} (${opts.email})`,
    opts.topic ? `Topic: ${opts.topic}` : "",
    opts.meetLink ? `Google Meet Link: ${opts.meetLink}` : "Platform: Google Meet",
  ]
    .filter(Boolean)
    .join("\\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RapidTechLabs//Google Meet Scheduler//EN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatGoogleUtcTimestamp(new Date())}`,
    `DTSTART:${formatGoogleUtcTimestamp(opts.start)}`,
    `DTEND:${formatGoogleUtcTimestamp(opts.end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${opts.meetLink || "Google Meet"}`,
    `ORGANIZER;CN=RapidTechLabs:mailto:${GOOGLE_MEET_HOST_EMAIL}`,
    `ATTENDEE;CN=RapidTechLabs;RSVP=TRUE:mailto:${GOOGLE_MEET_HOST_EMAIL}`,
    opts.email ? `ATTENDEE;CN=${opts.name};RSVP=TRUE:mailto:${opts.email}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "RapidTechLabs-Google-Meet.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

interface ScheduledBooking {
  name: string;
  email: string;
  phone: string;
  topic: string;
  dateKey: string;
  timeLabel: string;
  start: Date;
  end: Date;
  calendarUrl: string;
  meetLink?: string;
  backendSynced: boolean;
}

export function InstantMeeting({ trigger }: { trigger?: React.ReactNode }) {
  const dates = useMemo(() => getUpcomingDates(7), []);
  const [dateKey, setDateKey] = useState(() => toLocalDateKey(dates[1] ?? dates[0]));
  const [timeSlot, setTimeSlot] = useState<string>(TIME_SLOTS[1].value);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scheduled, setScheduled] = useState<ScheduledBooking | null>(null);

  const handleScheduleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName || !cleanEmail) {
      setError("Please enter your name and email address.");
      return;
    }

    setLoading(true);
    const chosenSlot = TIME_SLOTS.find((t) => t.value === timeSlot) ?? TIME_SLOTS[0];
    const { start, end } = buildIstSlotDates(dateKey, chosenSlot.value, 30);

    const calendarUrl = buildGoogleCalendarMeetUrl({
      name: cleanName,
      email: cleanEmail,
      phone: phone.trim(),
      topic: topic.trim(),
      start,
      end,
    });

    const payload = {
      name: cleanName,
      email: cleanEmail,
      phone: phone.trim(),
      topic: topic.trim() || "Project Discovery Meeting",
      date: dateKey,
      time: chosenSlot.value,
      timeLabel: `${chosenSlot.label} IST`,
      timezone: "Asia/Kolkata",
      hostEmail: GOOGLE_MEET_HOST_EMAIL,
      platform: "google_meet",
      calendarUrl,
    };

    let liveMeetLink: string | undefined;
    let backendSynced = false;

    try {
      const response = await fetch("https://api.rapidtechlabs.in/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        if (result?.meetLink) {
          liveMeetLink = String(result.meetLink);
          backendSynced = true;
        }
      }
    } catch {
      // Fallback: notify general contact endpoint silently & persist locally
      fetch("https://api.rapidtechlabs.in/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "google_meet_booking",
          ...payload,
        }),
      }).catch(() => {});
    }

    try {
      const existing = JSON.parse(localStorage.getItem("rapidtechlabs_meetings") || "[]");
      existing.unshift({ ...payload, meetLink: liveMeetLink, createdAt: new Date().toISOString() });
      localStorage.setItem("rapidtechlabs_meetings", JSON.stringify(existing.slice(0, 30)));
    } catch {
      // ignore storage errors
    }

    setScheduled({
      name: cleanName,
      email: cleanEmail,
      phone: phone.trim(),
      topic: topic.trim(),
      dateKey,
      timeLabel: `${chosenSlot.label} IST`,
      start,
      end,
      calendarUrl,
      meetLink: liveMeetLink,
      backendSynced,
    });

    setLoading(false);
  };

  const instantWhatsappPingUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi RapidTechLabs! I would like to schedule or start an Instant Google Meet right now (${GOOGLE_APPOINTMENT_URL}).`,
  )}`;

  const scheduledWhatsappUrl = scheduled
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hi RapidTechLabs! I just scheduled a Google Meet with ${GOOGLE_MEET_HOST_EMAIL}.\nName: ${
          scheduled.name
        }\nEmail: ${scheduled.email}\nDate: ${scheduled.dateKey}\nTime: ${scheduled.timeLabel}${
          scheduled.topic ? `\nTopic: ${scheduled.topic}` : ""
        }`,
      )}`
    : "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 font-semibold text-white shadow-glow hover:brightness-110 transition">
            <Video size={16} /> Instant Meeting
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <span className="w-8 h-8 rounded-lg bg-gradient-brand text-white grid place-items-center shrink-0">
              <Video size={16} />
            </span>
            <span>Google Meet with RapidTechLabs</span>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Schedule a Google Meet directly with{" "}
            <strong className="text-foreground">{GOOGLE_MEET_HOST_EMAIL}</strong> or start an
            immediate call to discuss your project.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="instant" className="mt-2">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="instant" className="text-xs sm:text-sm">
              <Video size={14} className="mr-1.5 shrink-0" /> Book Google Meet
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-xs sm:text-sm">
              <Calendar size={14} className="mr-1.5 shrink-0" /> Quick Request
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: SCHEDULE GOOGLE MEET */}
          <TabsContent value="schedule" className="space-y-4 pt-4">
            {scheduled ? (
              <div className="text-center py-3 space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-brand grid place-items-center shadow-glow">
                  <Check className="text-white" size={22} />
                </div>

                <div>
                  <h4 className="font-bold text-lg text-foreground">
                    {scheduled.backendSynced
                      ? "Google Meet Confirmed!"
                      : "Your Google Meet Slot Is Ready!"}
                  </h4>
                  <p className="mt-1 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {new Date(`${scheduled.dateKey}T00:00:00`).toLocaleDateString("en-IN", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    at <strong className="text-foreground">{scheduled.timeLabel}</strong> with{" "}
                    <strong className="text-foreground">{GOOGLE_MEET_HOST_EMAIL}</strong>.
                  </p>
                </div>

                <div className="rounded-xl bg-secondary/50 border border-border p-3.5 text-left text-xs space-y-1.5">
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Host Google Meet:</span>
                    <span className="font-semibold text-foreground break-all">
                      {GOOGLE_MEET_HOST_EMAIL}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Attendee:</span>
                    <span className="font-semibold text-foreground break-all">
                      {scheduled.name} ({scheduled.email})
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground">Slot:</span>
                    <span className="font-semibold text-primary">
                      {scheduled.dateKey} · {scheduled.timeLabel}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                  {scheduled.meetLink ? (
                    <a
                      href={scheduled.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-3 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition"
                    >
                      <Video size={16} /> Join Google Meet Room <ExternalLink size={14} />
                    </a>
                  ) : (
                    <a
                      href={GOOGLE_APPOINTMENT_URL || scheduled.calendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-3 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition"
                    >
                      <Calendar size={16} /> Confirm in Google Calendar (Google Meet){" "}
                      <ExternalLink size={14} />
                    </a>
                  )}

                  <a
                    href={scheduledWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition"
                  >
                    <MessageSquare size={15} /> Ping Host on WhatsApp (+91 8806884168)
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      downloadIcsFile({
                        name: scheduled.name,
                        email: scheduled.email,
                        topic: scheduled.topic,
                        start: scheduled.start,
                        end: scheduled.end,
                        meetLink: scheduled.meetLink,
                      })
                    }
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card hover:bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition"
                  >
                    <Download size={14} /> Download Calendar Invite (.ics)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setScheduled(null)}
                  className="text-xs text-primary font-semibold hover:underline pt-1"
                >
                  Schedule another time slot
                </button>
              </div>
            ) : (
              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-xs">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    1. Pick a day
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {dates.map((d) => {
                      const key = toLocalDateKey(d);
                      const active = key === dateKey;
                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => setDateKey(key)}
                          className={`flex-shrink-0 rounded-xl border px-3 py-2 text-center min-w-[58px] transition ${
                            active
                              ? "border-transparent bg-gradient-brand text-white shadow-glow"
                              : "border-border bg-card hover:bg-secondary"
                          }`}
                        >
                          <div className="text-[10px] uppercase tracking-wider opacity-80">
                            {d.toLocaleDateString("en-IN", { weekday: "short" })}
                          </div>
                          <div className="font-semibold text-sm">{d.getDate()}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    <span>2. Pick a time (IST)</span>
                    <span className="inline-flex items-center gap-1 normal-case tracking-normal text-[11px] font-medium">
                      <Clock size={11} /> 30 min · Google Meet
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const active = slot.value === timeSlot;
                      return (
                        <button
                          type="button"
                          key={slot.value}
                          onClick={() => setTimeSlot(slot.value)}
                          className={`rounded-lg border px-2.5 py-2 text-xs sm:text-sm font-medium transition ${
                            active
                              ? "border-transparent bg-gradient-brand text-white shadow-glow"
                              : "border-border bg-card hover:bg-secondary"
                          }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name *"
                    maxLength={120}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    name="email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email (for Meet invite) *"
                    maxLength={255}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone / WhatsApp (optional)"
                    maxLength={30}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    name="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Topic (Website, ERP, SEO...)"
                    maxLength={140}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:brightness-110 disabled:opacity-70 transition"
                >
                  <Video size={15} />
                  {loading ? "Preparing Google Meet..." : "Schedule Google Meet"}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                  <ShieldCheck size={13} className="text-primary shrink-0" />
                  <span>Invite sent directly to {GOOGLE_MEET_HOST_EMAIL}</span>
                </div>
              </form>
            )}
          </TabsContent>

          {/* TAB 1 (DEFAULT): DIRECT GOOGLE CALENDAR APPOINTMENT + GOOGLE MEET */}
          <TabsContent value="instant" className="space-y-4 pt-4">
            <div className="rounded-2xl bg-gradient-soft border border-primary/20 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
                  Live Google Calendar &amp; Meet
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 px-2.5 py-0.5 text-[10px] font-bold">
                  ● Auto Google Meet Link
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Pick any open 30-minute slot directly on our live calendar (
                <strong className="text-foreground">{GOOGLE_MEET_HOST_EMAIL}</strong>). Google
                Calendar instantly emails your confirmation and unique Google Meet video link.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-foreground/85">
                <div className="rounded-lg bg-card border border-border px-3 py-2 flex items-center gap-1.5">
                  <Clock size={13} className="text-primary shrink-0" /> 30 Min Free Consult
                </div>
                <div className="rounded-lg bg-card border border-border px-3 py-2 flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-primary shrink-0" /> NDA Protected Call
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={GOOGLE_APPOINTMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-glow hover:brightness-110 transition"
              >
                <Calendar size={16} /> Pick Slot &amp; Book Google Meet <ExternalLink size={14} />
              </a>

              <a
                href={instantWhatsappPingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] px-5 py-2.5 text-sm font-semibold text-white transition"
              >
                <MessageSquare size={15} /> Need a Call Right Now? Ping on WhatsApp
              </a>

              <a
                href={GOOGLE_MEET_NEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card hover:bg-secondary px-5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
              >
                <Video size={14} className="text-primary" /> Or Start New Google Meet Room{" "}
                <ExternalLink size={12} />
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export function FloatingMeetingButton() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="fixed bottom-4 sm:bottom-5 right-4 sm:right-5 z-40 flex items-center gap-1.5 sm:gap-2">
      <button
        onClick={() => setHidden(true)}
        aria-label="Dismiss"
        className="rounded-full bg-card border border-border p-1.5 shadow-card hover:bg-secondary"
      >
        <X size={12} />
      </button>
      <InstantMeeting
        trigger={
          <button className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-brand pl-3.5 pr-4 sm:pl-4 sm:pr-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-glow hover:brightness-110 transition">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-cyan" />
            </span>
            <Video size={15} /> Instant Meeting
          </button>
        }
      />
    </div>
  );
}
