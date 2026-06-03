import { motion } from 'framer-motion';
import { Send, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { StaggerContainer, RevealItem, itemFromLeft, itemFromRight } from './ScrollReveal';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05),transparent_50%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-16">
          <RevealItem>
            <span className="font-mono-tech text-xs text-primary tracking-widest uppercase">// Contact</span>
          </RevealItem>
          <RevealItem>
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-4">
              Tell us about <span className="text-gradient">the project</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A few details below and a written reply within 24 hours. Free 30-minute call before either side commits to anything.
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
                  <input type="text" required className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs font-mono-tech text-muted-foreground mb-2 uppercase tracking-wider">Email</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" placeholder="you@company.com" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-mono-tech text-muted-foreground mb-2 uppercase tracking-wider">Business Type</label>
                <select className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all appearance-none">
                  <option value="">Select your industry</option>
                  <option value="retail">Retail / E-commerce</option>
                  <option value="services">Professional Services</option>
                  <option value="health">Health & Wellness</option>
                  <option value="education">Education</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="tech">Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-mono-tech text-muted-foreground mb-2 uppercase tracking-wider">Budget Range</label>
                <select className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all appearance-none">
                  <option value="">Select a range</option>
                  <option value="basic">£300 to £500 (Basic)</option>
                  <option value="pro">£500 to £1,000 (Pro)</option>
                  <option value="expert">£1,000 to £2,000 (Expert)</option>
                  <option value="full-brand">£2,000+ (Full Brand)</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-mono-tech text-muted-foreground mb-2 uppercase tracking-wider">
                  Project Details <span className="text-muted-foreground/60 normal-case font-normal">(optional)</span>
                </label>
                <textarea rows={3} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none" placeholder="Briefly describe your goals and any specific requirements..." />
              </div>
              <button type="submit" disabled={submitted} className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.99] transition-all duration-300 animate-pulse-glow disabled:opacity-70">
                {submitted ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Sent. We will reply within 24 hours.</>) : (<>Request a quote <Send className="w-4 h-4" /></>)}
              </button>
              <p className="text-center text-xs text-muted-foreground mt-3">No commitment &nbsp;·&nbsp; Reply within 24 hours &nbsp;·&nbsp; Your details stay with us</p>
            </form>
          </RevealItem>

          <RevealItem direction="right" className="lg:col-span-2">
            <div className="flex flex-col gap-6">
              <div className="glass rounded-2xl p-6 border border-border/50">
                <h3 className="font-semibold text-foreground mb-4">Direct lines</h3>
                <div className="space-y-4">
                  <a href="mailto:hello@aiwebsolutions.co.uk" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    hello@aiwebsolutions.co.uk
                  </a>
                  <a href="tel:+441234567890" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    +44 1234 567 890
                  </a>
                </div>
              </div>
              <div className="glass rounded-2xl p-6 border border-border/50">
                <h3 className="font-semibold text-foreground mb-2">Reply window</h3>
                <p className="text-sm text-muted-foreground mb-4">Under 24 hours, weekdays. You get a real reply from a human, not a templated auto-response.</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-mono-tech text-primary">Booking work for next month</span>
                </div>
              </div>
              <div className="glass rounded-2xl p-6 border border-border/50">
                <h3 className="font-semibold text-foreground mb-2">Free 30-minute call</h3>
                <p className="text-sm text-muted-foreground">Before either side signs anything. Audit your current site, talk through scope, decide if we are a fit.</p>
              </div>
            </div>
          </RevealItem>
        </div>
      </div>
    </section>
  );
}
