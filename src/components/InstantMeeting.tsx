import { useState } from "react";
import { Video, Calendar, Copy, Check, ArrowRight, X } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function makeRoom() {
  const slug = "RTL-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return `https://meet.jit.si/${slug}`;
}

const today = new Date();
const dates = Array.from({ length: 7 }).map((_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() + i);
  return d;
});
const times = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

export function InstantMeeting({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const [room, setRoom] = useState(makeRoom);
  const [copied, setCopied] = useState(false);
  const [date, setDate] = useState(dates[1].toISOString());
  const [time, setTime] = useState(times[1]);
 const [scheduled, setScheduled] = useState<null | {
  date: string;
  time: string;
  meetLink: string;
}>(null);

  const copy = async () => {
    await navigator.clipboard.writeText(room);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScheduleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      date: date,
      time: time
    };

    try {
      const response = await fetch('https://api.rapidtechlabs.in/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
  throw new Error('Failed to schedule meeting');
}

    const result = await response.json();

    if (!result.meetLink) {
      throw new Error("Google Meet link was not generated");
    }

    setScheduled({
      date,
      time,
      meetLink: result.meetLink,
    });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 font-semibold text-white shadow-glow hover:brightness-110 transition">
            <Video size={16} /> Instant Meeting
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Meet with RapidTechLabs</DialogTitle>
          <DialogDescription>
            Start an instant video call or schedule a discovery slot — no account required.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="instant" className="mt-2">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="instant"><Video size={14} className="mr-1.5" /> Instant call</TabsTrigger>
            <TabsTrigger value="schedule"><Calendar size={14} className="mr-1.5" /> Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="instant" className="space-y-4 pt-4">
            <div className="rounded-xl bg-gradient-soft border border-border p-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">Your private room</div>
              <div className="mt-1 flex items-center gap-2">
                <code className="flex-1 truncate text-sm font-medium">{room}</code>
                <button onClick={copy} aria-label="Copy link" className="rounded-md border border-border bg-card p-2 hover:bg-secondary">
                  {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Share the link with your team, then click <b>Join now</b>. Our consultant will receive a ping and join within minutes during business hours.
            </p>
            <div className="flex flex-wrap gap-2">
              <a href={room} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 font-semibold text-white shadow-glow">
                Join now <ArrowRight size={16} />
              </a>
              <button onClick={() => setRoom(makeRoom())} className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-secondary">
                New room
              </button>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4 pt-4">
            {scheduled ? (
              <div className="text-center py-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-brand grid place-items-center"><Check className="text-white" size={22} /></div>
                <h4 className="mt-4 font-semibold text-lg">You're booked in</h4>
                <p className="mt-1 text-muted-foreground text-sm">
                  {new Date(scheduled.date).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })} at {scheduled.time}.
                  We've reserved your slot — a calendar invite will hit your inbox shortly.
                </p>
                <div className="mt-4">
                <a
                  href={scheduled.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-white font-medium"
                >
                  Join Google Meet
                </a>
              </div>
                <button onClick={() => setScheduled(null)} className="mt-4 text-sm text-primary font-medium hover:underline">
                  Book another slot
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleScheduleSubmit}
                className="space-y-4"
              >
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm mb-4">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Pick a day</label>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {dates.map((d) => {
                      const iso = d.toISOString();
                      const active = iso === date;
                      return (
                        <button type="button" key={iso} onClick={() => setDate(iso)}
                          className={`flex-shrink-0 rounded-xl border px-3 py-2 text-center transition ${
                            active ? "border-transparent bg-gradient-brand text-white shadow-glow" : "border-border bg-card hover:bg-secondary"
                          }`}>
                          <div className="text-[10px] uppercase tracking-wider opacity-80">
                            {d.toLocaleDateString(undefined, { weekday: "short" })}
                          </div>
                          <div className="font-semibold">{d.getDate()}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Pick a time</label>
                  <div className="grid grid-cols-3 gap-2">
                    {times.map((t) => {
                      const active = t === time;
                      return (
                        <button type="button" key={t} onClick={() => setTime(t)}
                          className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                            active ? "border-transparent bg-gradient-brand text-white shadow-glow" : "border-border bg-card hover:bg-secondary"
                          }`}>
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input name="name" required placeholder="Your name" maxLength={120}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  <input name="email" required type="email" placeholder="Work email" maxLength={255}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full rounded-lg bg-gradient-brand px-5 py-2.5 font-semibold text-white shadow-glow hover:brightness-110 disabled:opacity-70">
                  {loading ? 'Confirming...' : 'Confirm meeting'}
                </button>
              </form>
            )}
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
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <button onClick={() => setHidden(true)} aria-label="Dismiss"
        className="rounded-full bg-card border border-border p-1.5 shadow-card hover:bg-secondary">
        <X size={12} />
      </button>
      <InstantMeeting
        trigger={
          <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand pl-4 pr-5 py-3 font-semibold text-white shadow-glow hover:brightness-110 transition">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
            </span>
            <Video size={16} /> Instant Meeting
          </button>
        }
      />
    </div>
  );
}
