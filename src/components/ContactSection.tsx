import { motion } from 'framer-motion';
import { Send, Mail, Phone, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { StaggerContainer, RevealItem } from './ScrollReveal';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  industry: z.string().trim().max(100).optional(),
  budget: z.string().trim().max(50).optional(),
  message: z.string().trim().max(1000).optional(),
});

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', industry: '', budget: '', message: '' });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast({ title: 'Please check your details', description: parsed.error.issues[0].message, variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', { body: parsed.data });
      if (error) throw error;
      setSubmitted(true);
      setForm({ name: '', email: '', industry: '', budget: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error(err);
      toast({ title: 'Could not send', description: 'Please try again or email us directly.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05),transparent_50%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-12">
          <RevealItem>
            <span className="font-mono-tech text-xs text-primary tracking-widest uppercase">// Contact</span>
          </RevealItem>
          <RevealItem>
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-4">
              Let's Build <span className="text-gradient">Together</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tell us what you are building. We will get back to you within 24 hours with a quote and a starting plan.
            </p>
          </RevealItem>
        </StaggerContainer>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <RevealItem direction="left" className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 border border-border/50"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-mono-tech text-muted-foreground mb-2 uppercase tracking-wider">Name</label>
                  <input type="text" required value={form.name} onChange={update('name')} maxLength={100} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs font-mono-tech text-muted-foreground mb-2 uppercase tracking-wider">Email</label>
                  <input type="email" required value={form.email} onChange={update('email')} maxLength={255} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" placeholder="you@company.com" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-mono-tech text-muted-foreground mb-2 uppercase tracking-wider">Industry</label>
                <input type="text" value={form.industry} onChange={update('industry')} maxLength={100} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" placeholder="e.g. Retail, Hospitality, SaaS..." />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-mono-tech text-muted-foreground mb-2 uppercase tracking-wider">Budget Range</label>
                <select value={form.budget} onChange={update('budget')} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all appearance-none">
                  <option value="">Select a range</option>
                  <option value="300-500">£300 – £500 (Basic)</option>
                  <option value="500-1000">£500 – £1,000 (Pro)</option>
                  <option value="1000-2000">£1,000 – £2,000 (Expert)</option>
                  <option value="2000plus">£2,000+ (Full Brand)</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-mono-tech text-muted-foreground mb-2 uppercase tracking-wider">
                  Project Details <span className="text-muted-foreground/60 normal-case font-normal">(optional)</span>
                </label>
                <textarea rows={3} value={form.message} onChange={update('message')} maxLength={1000} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none" placeholder="Briefly describe your goals and any specific requirements..." />
              </div>
              <button type="submit" disabled={submitting || submitted} className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 glow-static disabled:opacity-70">
                {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>) : submitted ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!</>) : (<>Get My Free Quote <Send className="w-4 h-4" /></>)}
              </button>
              <p className="text-center text-xs text-muted-foreground mt-3">🔒 No commitment required &nbsp;·&nbsp; We respond within 24 hours &nbsp;·&nbsp; No spam, ever</p>
            </form>
          </RevealItem>

          <RevealItem direction="right" className="lg:col-span-2">
            <div className="flex flex-col gap-6">
              <div className="glass rounded-2xl p-6 border border-border/50">
                <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <a href="mailto:PiranBeumkes@AIWebSolution.co.uk" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group break-all">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    PiranBeumkes@AIWebSolution.co.uk
                  </a>
                  <a href="tel:+447435517255" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    07435 517255
                  </a>
                </div>
              </div>
              <div className="glass rounded-2xl p-6 border border-border/50">
                <h3 className="font-semibold text-foreground mb-2">Quick Turnaround</h3>
                <p className="text-sm text-muted-foreground mb-4">We reply within 24 hours with a quote and what we would do first. No pressure to sign anything.</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-mono-tech text-primary">Currently accepting new projects</span>
                </div>
              </div>
              <div className="glass rounded-2xl p-6 border border-border/50">
                <h3 className="font-semibold text-foreground mb-2">Free Consultation</h3>
                <p className="text-sm text-muted-foreground">Every project starts with a free 30-minute call. No sales pitch, just straight answers about what you actually need.</p>
              </div>
            </div>
          </RevealItem>
        </div>
      </div>
    </section>
  );
}
