import { ArrowRight, Clock, PoundSterling, MessageSquare, LifeBuoy } from 'lucide-react';
import websitePreview from '@/assets/portfolio-growingfutures.webp';

const stats = [
  { icon: Clock, value: '11 days', label: 'Average build time' },
  { icon: PoundSterling, value: 'From £300', label: 'Fixed-price quotes' },
  { icon: MessageSquare, value: '24 hours', label: 'To get your quote' },
  { icon: LifeBuoy, value: 'Up to 6 months', label: 'Post-launch support' },
];

export default function HeroSection() {
  return (
    <section id="hero" aria-label="Introduction" className="relative">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 lg:pt-28 lg:pb-12">
          <div className="flex flex-col items-center gap-8">
            {/* Copy — CSS animation so prerendered HTML paints before JS loads */}
            <div className="text-center animate-fade-up">
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono-tech text-primary mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                Accepting new projects — limited spots this month
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
                Expert web design &amp; development,
                <br className="hidden sm:block" />{' '}
                <span className="text-gradient">delivered in days</span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-9 leading-relaxed">
                We build custom websites, e-commerce stores, and web apps for small
                businesses that want to grow. Thoughtful design, dependable development,
                and personal service — from your first idea to a website you’re proud
                to share. Clear starting prices, with a quote tailored to your project.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

            <a href="#portfolio" className="block w-full max-w-3xl animate-fade-up" aria-label="Explore our website design work">
              <img src={websitePreview} alt="Growing Futures Cornwall — a custom website designed for an education business" width={1200} height={600} className="w-full h-48 sm:h-56 lg:h-64 object-cover object-top" fetchPriority="high" />
            </a>
          </div>

          {/* Stats */}
          <dl
            className="mt-10 lg:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border/60 bg-border/60 animate-fade-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card/70 backdrop-blur-sm px-6 py-5 text-center lg:text-left flex flex-col-reverse gap-1.5">
                <dt className="text-xs text-muted-foreground uppercase tracking-wider flex items-center justify-center gap-1.5">
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
      </div>
    </section>
  );
}
