import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Twitter, Github, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setMessage('Subscribed successfully!');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Something went wrong.');
    }
  };

  return (
    <footer className="mt-24 bg-gradient-hero text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="RapidTechLabs" className="h-10 w-10 object-contain bg-white rounded-md p-1" width={40} height={40} loading="lazy" />
            <span className="font-display font-bold text-xl">RapidTechLabs</span>
          </div>
          <p className="mt-4 text-white/70 text-sm leading-relaxed">
            Building Solutions. Powering Futures. Enterprise IT and AI engineering for forward-thinking organizations.
          </p>
          <div className="mt-6 flex gap-3">
            {[Linkedin, Twitter, Facebook, Github].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Company</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/portfolio" className="hover:text-white">Portfolio</Link></li>
            <li><Link to="/testimonials" className="hover:text-white">Testimonials</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Services</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Industrial ERP</li>
            <li>Hospital Management</li>
            <li>Institute Management</li>
            <li>AI Integration</li>
            <li>Digital Marketing</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Stay in the loop</h4>
          <p className="text-sm text-white/70 mb-3">Monthly insights on enterprise tech & AI.</p>
          <form className="flex gap-2" onSubmit={handleSubscribe}>
            <input type="email" required placeholder="you@company.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan" />
            <button disabled={status === 'loading'} className="rounded-lg bg-cyan px-3 py-2 text-sm font-semibold text-brand hover:opacity-90 disabled:opacity-70">
              {status === 'loading' ? '...' : 'Join'}
            </button>
          </form>
          {message && (
            <p className={`mt-2 text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
              {message}
            </p>
          )}
          <ul className="mt-6 space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><Mail size={14} /> vaibhavk0099@gmail.com</li>
            <li className="flex items-center gap-2"><Phone size={14} /> +91 9325378590</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Global · Remote-first</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between text-xs text-white/60">
          <p>© {new Date().getFullYear()} RapidTechLabs. All rights reserved.</p>
          <p>Building Solutions. Powering Futures.</p>
        </div>
      </div>
    </footer>
  );
}
