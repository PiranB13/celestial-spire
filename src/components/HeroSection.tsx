import { ArrowRight, Clock, PoundSterling, MessageSquare, LifeBuoy } from 'lucide-react';
import heroBrain from '@/assets/hero-brain.webp';

const stats = [
  { icon: Clock, value: '11 days', label: 'Average build time' },
  { icon: PoundSterling, value: 'From £300', label: 'Fixed-price quotes' },
  { icon: MessageSquare, value: '24 hours', label: 'To get your quote' },
  { icon: LifeBuoy, value: 'Up to 6 months', label: 'Post-launch support' },
];

export default function HeroSection() {
  return (
    <section id="hero" aria-label="Introduction" className="relative overflow-hidden">
      {/* Background: subtle grid + gradient glow, pure CSS */}
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.14) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Copy — CSS animation so prerendered HTML paints before JS loads */}
          <div className="text-center lg:text-left animate-fade-up">
            <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono-tech text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              Accepting new projects — limited spots this month
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
              Expert web design &amp; development,
              <br className="hidden sm:block" />{' '}
              <span className="text-gradient">delivered in days</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-9 leading-relaxed">
              We build custom websites, e-commerce stores, and web apps for small
              businesses that want to grow. Modern tooling and hands-on craft mean
              you get an agency-grade site in a fraction of the usual time — at a
              fair, fixed price.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors duration-300 glow-static group"
              >
                Get your free quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg glass hover:border-primary/40 text-foreground font-semibold transition-colors duration-300"
              >
                See our work
              </a>
            </div>
          </div>

          {/* Visual */}
          <div
            className="relative hidden lg:flex items-center justify-center animate-fade-up"
            style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
            aria-hidden="true"
          >
            <div className="relative w-[380px] h-[380px]">
              <div
                className="absolute inset-[-25%] rounded-full"
                style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 70%)' }}
              />
              <div className="absolute inset-[2%] rounded-full border border-primary/15 animate-[spin_24s_linear_infinite]" />
              <div className="absolute inset-[12%] rounded-full border border-dashed border-primary/10 animate-[spin_36s_linear_infinite_reverse]" />
              <img
                src={heroBrain}
                alt=""
                width={640}
                height={640}
                className="absolute inset-0 w-full h-full object-contain"
                style={{ filter: 'drop-shadow(0 0 40px hsl(var(--primary) / 0.35))' }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <dl
          className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border/60 bg-border/60 animate-fade-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card/70 backdrop-blur-sm px-6 py-5 text-center lg:text-left flex flex-col-reverse gap-1.5">
              <dt className="text-xs text-muted-foreground uppercase tracking-wider flex items-center justify-center lg:justify-start gap-1.5">
                <stat.icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                {stat.label}
              </dt>
              <dd className="font-mono-tech text-xl lg:text-2xl font-bold text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
