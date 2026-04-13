import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { StaggerContainer, RevealItem, scaleIn } from './ScrollReveal';

const testimonials = [
  {
    name: 'James Harrington',
    role: 'Founder, RugbyConnect',
    quote: 'AI Web Solutions transformed our vision into a platform that\'s reshaping rugby recruitment across the UK. The speed and quality were beyond anything we expected.',
    metric: '300%',
    metricLabel: 'User Growth',
  },
  {
    name: 'Sarah Tremaine',
    role: 'Director, Growing Futures Cornwall',
    quote: 'They understood our mission from day one. The site perfectly captures who we are and has dramatically increased engagement with families across Cornwall.',
    metric: '4.9★',
    metricLabel: 'Parent Rating',
  },
  {
    name: 'Dr. Emily Pascoe',
    role: 'Founder, Sensory Cove',
    quote: 'The accessibility-first approach was exactly what we needed. Every design choice was intentional, calming, and inclusive — our users feel safe before they even walk through the door.',
    metric: '100%',
    metricLabel: 'WCAG Compliant',
  },
  {
    name: 'Rachel Dunn',
    role: 'Therapist, Serenity Hypnotherapy',
    quote: 'Having a bespoke app that handles bookings, audio content, and client progress tracking has freed me to focus entirely on my clients. It\'s been a game-changer.',
    metric: '2x',
    metricLabel: 'Client Retention',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-16">
          <RevealItem>
            <span className="font-mono-tech text-xs text-primary tracking-widest uppercase">// Testimonials</span>
          </RevealItem>
          <RevealItem>
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-4">
              Mission <span className="text-gradient">Debriefs</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Direct transmissions from our clients — the results speak for themselves.
            </p>
          </RevealItem>
        </StaggerContainer>

        <StaggerContainer className="grid md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.15}>
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={scaleIn}
              className="group relative glass rounded-2xl p-8 border border-border/50 hover:glow-border transition-all duration-500"
            >
              {/* Top data bar */}
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-5 h-5 text-primary/40" />
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <span className="font-mono-tech text-sm font-bold text-primary">{t.metric}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.metricLabel}</span>
                </div>
              </div>

              <blockquote className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-mono-tech text-xs text-primary font-bold">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground font-mono-tech">{t.role}</div>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                <div className="absolute top-0 right-0 h-[1px] w-8 bg-gradient-to-l from-primary/50 to-transparent" />
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
