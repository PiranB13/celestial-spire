import { ArrowRight, Clock, PoundSterling, MessageSquare, LifeBuoy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import heroBrain from '@/assets/hero-brain.webp';
import heroData from '@/assets/hero-data.webp';

const stats = [
  { icon: Clock, value: '11 days', label: 'Average build time' },
  { icon: PoundSterling, value: 'From £300', label: 'Fixed-price quotes' },
  { icon: MessageSquare, value: '24 hours', label: 'To get your quote' },
  { icon: LifeBuoy, value: 'Up to 6 months', label: 'Post-launch support' },
];

// SSR-safe: false on the server and first client render, updates after mount
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

// 0 → 1 as the tall hero section scrolls through the viewport
function useScrollProgress(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let rafId = 0;
    const update = () => {
      rafId = 0;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.max(0, Math.min(1, -rect.top / range)));
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ref, enabled]);

  return progress;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const scrollProgress = useScrollProgress(sectionRef, !reducedMotion);

  // Brain → microchip morph: brief hold at each end, morph through the middle
  const morph = Math.max(0, Math.min(1, (scrollProgress - 0.12) / 0.7));

  const brainStyle = {
    opacity: Math.max(0, 1 - morph * 2),
    transform: `scale(${1 + morph * 0.4}) rotate(${morph * 20}deg)`,
    filter: `blur(${morph * 12}px) drop-shadow(0 0 40px hsl(var(--primary) / 0.35))`,
  };

  const chipT = Math.max(0, Math.min(1, (morph - 0.45) / 0.55));
  const chipStyle = {
    opacity: chipT,
    transform: `scale(${0.75 + chipT * 0.25}) rotate(${(1 - chipT) * -18}deg)`,
    filter: `blur(${(1 - chipT) * 8}px) drop-shadow(0 0 40px hsl(var(--primary) / 0.35))`,
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      // Tall section + sticky inner = scroll-driven brain→chip morph on
      // desktop. Mobile and reduced-motion get a normal single-screen hero.
      className={`relative ${reducedMotion ? '' : 'lg:min-h-[240vh]'}`}
    >
      <div className={`relative overflow-hidden ${reducedMotion ? '' : 'lg:sticky lg:top-0'}`}>
        {/* Background: subtle grid + gradient glow, pure CSS */}
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.14) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-28 lg:pb-16 lg:min-h-dvh lg:flex lg:flex-col lg:justify-center">
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

            {/* Visual: brain morphs into a microchip as you scroll */}
            <div
              className="relative hidden lg:flex items-center justify-center animate-fade-up"
              style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
              aria-hidden="true"
            >
              <div className="relative w-[380px] h-[380px]">
                <div
                  className="absolute inset-[-25%] rounded-full"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--primary) / ${0.18 + scrollProgress * 0.06}) 0%, transparent 70%)`,
                  }}
                />
                <div className="absolute inset-[2%] rounded-full border border-primary/15 animate-[spin_24s_linear_infinite]" />
                <div className="absolute inset-[12%] rounded-full border border-dashed border-primary/10 animate-[spin_36s_linear_infinite_reverse]" />

                {/* Brain */}
                <img
                  src={heroBrain}
                  alt=""
                  width={640}
                  height={640}
                  className="absolute inset-0 w-full h-full object-contain"
                  style={reducedMotion ? undefined : brainStyle}
                />

                {/* Microchip — fades in as the morph completes */}
                {!reducedMotion && (
                  <img
                    src={heroData}
                    alt=""
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-contain"
                    style={chipStyle}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <dl
            className="mt-16 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border/60 bg-border/60 animate-fade-up"
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
      </div>
    </section>
  );
}
