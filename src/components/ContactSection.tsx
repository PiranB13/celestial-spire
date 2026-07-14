import { Send, Mail, Phone, Loader2, Check } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { RevealItem, StaggerContainer } from './ScrollReveal';
import SectionHeading from './SectionHeading';
import { toast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  industry: z.string().trim().max(100).optional(),
  budget: z.string().trim().max(50).optional(),
  message: z.string().trim().max(1000).optional(),
});

const inputClasses =
  'w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all';

const labelClasses = 'block text-xs font-mono-tech text-muted-foreground mb-2 uppercase tracking-wider';

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
      // Loaded on demand so the Supabase client stays out of the main bundle
      const { supabase } = await import('@/integrations/supabase/client');
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
    <section id="contact" aria-labelledby="contact-heading" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05),transparent_50%)]" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={<span id="contact-heading">Get a free <span className="text-gradient">web design quote</span></span>}
          description="Tell us what you are building. We will get back to you within 24 hours with a quote and a starting plan."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <RevealItem direction="left" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="contact-name" className={labelClasses}>Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={update('name')}
                    maxLength={100}
                    className={inputClasses}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelClasses}>Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    maxLength={255}
                    className={inputClasses}
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="contact-industry" className={labelClasses}>Industry</label>
                <input
                  id="contact-industry"
                  name="industry"
                  type="text"
                  value={form.industry}
                  onChange={update('industry')}
                  maxLength={100}
                  className={inputClasses}
                  placeholder="e.g. Retail, Hospitality, SaaS..."
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contact-budget" className={labelClasses}>Budget range</label>
                <select
                  id="contact-budget"
                  name="budget"
                  value={form.budget}
                  onChange={update('budget')}
                  className={`${inputClasses} appearance-none`}
                >
                  <option value="">Select a range</option>
                  <option value="300plus">£300+ (Basic)</option>
                  <option value="500plus">£500+ (Pro)</option>
                  <option value="1000plus">£1,000+ (Expert)</option>
                  <option value="2000plus">£2,000+ (Full Brand)</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="contact-message" className={labelClasses}>
                  Project details <span className="text-muted-foreground/60 normal-case font-normal">(optional)</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={update('message')}
                  maxLength={1000}
                  className={`${inputClasses} resize-none`}
                  placeholder="Briefly describe your goals and any specific requirements..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting || submitted}
                className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors duration-300 glow-static disabled:opacity-70"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending...</>
                ) : submitted ? (
                  <><Check className="w-4 h-4" aria-hidden="true" /> Message sent!</>
                ) : (
                  <>Get my free quote <Send className="w-4 h-4" aria-hidden="true" /></>
                )}
              </button>
              <p className="text-center text-xs text-muted-foreground mt-3">
                No commitment required · We respond within 24 hours · No spam, ever
              </p>
            </form>
          </RevealItem>

          <RevealItem direction="right" className="lg:col-span-2">
            <div className="flex flex-col gap-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Get in touch directly</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:PiranBeumkes@AIWebSolution.co.uk"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group break-all"
                  >
                    <span className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
                    </span>
                    PiranBeumkes@AIWebSolution.co.uk
                  </a>
                  <a
                    href="tel:+447435517255"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <span className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                    </span>
                    07435 517255
                  </a>
                </div>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-2">Quick turnaround</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We reply within 24 hours with a quote and what we would do first. No pressure to sign anything.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                  <span className="text-xs font-mono-tech text-primary">Currently accepting new projects</span>
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-2">Free consultation</h3>
                <p className="text-sm text-muted-foreground">
                  Every project starts with a free 30-minute call. No sales pitch, just straight answers about what you actually need.
                </p>
              </div>
            </div>
          </RevealItem>
        </div>
      </div>
    </section>
  );
}
