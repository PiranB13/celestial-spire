import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import NeuralNetwork3D from './NeuralNetwork3D';
import heroBrain from '@/assets/hero-brain.png';
import heroData from '@/assets/hero-data.png';

function AnimatedCounter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const step = end / 40;
    const interval = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [end, visible]);

  return (
    <div className="text-center">
      <div className="font-mono-tech text-2xl lg:text-3xl font-bold text-primary">
        {count}{suffix}
      </div>
      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const stickyRange = Math.max(1, rect.height - viewportH);
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / stickyRange));
      setProgress(p);
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ref]);

  return progress;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useScrollProgress(sectionRef);

  // Brief hold at the start (brain fully visible), morph through the middle,
  // brief hold at the end (chip fully visible) before the page releases.
  const morphProgress = Math.max(0, Math.min(1, (scrollProgress - 0.1) / 0.7));

  // Brain: fully visible at 0, fades out over first half of morph
  const brainOpacity = Math.max(0, 1 - morphProgress * 2);
  const brainScale = 1 + morphProgress * 0.5;
  const brainRotate = morphProgress * 25;
  const brainBlur = morphProgress * 16;

  // Microchip: fades in during the second half of the morph
  const dataProgress = Math.max(0, Math.min(1, (morphProgress - 0.4) / 0.5));
  const dataOpacity = dataProgress;
  const dataScale = 0.7 + dataProgress * 0.3;
  const dataRotate = (1 - dataProgress) * -20;
  const dataBlur = (1 - dataProgress) * 8;

  return (
    <section ref={sectionRef} className="relative min-h-[380vh]">
      {/* Sticky container for the hero content */}
      <div className="sticky top-0 min-h-dvh flex flex-col items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 scanline pointer-events-none" />
        <NeuralNetwork3D />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))_70%)]" />

        {/* Morphing visual - Brain → Microchip (above text) */}
        <div className="relative z-10 mt-20 mb-4 flex items-center justify-center">
          <div className="relative w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] lg:w-[320px] lg:h-[320px]">
            {/* Ambient glow behind the morph */}
            <div
              className="absolute inset-[-30%] rounded-full"
              style={{
                background: `radial-gradient(circle, hsl(var(--primary) / ${0.15 + scrollProgress * 0.05}) 0%, transparent 70%)`,
              }}
            />
            {/* Spinning rings */}
            <div className="absolute inset-[5%] rounded-full border border-primary/10 animate-[spin_18s_linear_infinite]" />
            <div className="absolute inset-[15%] rounded-full border border-dashed border-primary/07 animate-[spin_28s_linear_infinite_reverse]" />

            {/* Brain image */}
            <img
              src={heroBrain}
              alt=""
              width={1024}
              height={1024}
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                opacity: brainOpacity,
                transform: `scale(${brainScale}) rotate(${brainRotate}deg)`,
                filter: `blur(${brainBlur}px) drop-shadow(0 0 30px hsl(var(--primary) / 0.4))`,
                transition: 'filter 0.1s',
              }}
            />

            {/* Microchip image */}
            <img
              src={heroData}
              alt=""
              width={1024}
              height={1024}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                opacity: dataOpacity,
                transform: `scale(${dataScale}) rotate(${dataRotate}deg)`,
                filter: `blur(${dataBlur}px) drop-shadow(0 0 30px hsl(var(--primary) / 0.4))`,
                transition: 'filter 0.1s',
              }}
            />
          </div>
        </div>

        {/* Hero text content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-xs font-mono-tech text-primary mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              ACCEPTING NEW PROJECTS &nbsp;·&nbsp; LIMITED SPOTS AVAILABLE
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
              Smarter Websites.
              <br />
              <span className="text-gradient">Expert Craftsmanship.</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              We design, build, and tune websites for businesses that want to grow.
              Modern tooling lets us deliver expert-grade sites in a fraction of the
              time a traditional agency takes, at a fair fixed price.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 glow-static group"
              >
                Get Your Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg glass border border-border hover:border-primary/40 text-foreground font-semibold transition-all duration-300"
              >
                See Real Results
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </a>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto glass rounded-2xl p-6 border border-border/50"
            >
              <AnimatedCounter end={11} suffix=" Days" label="Avg Build Time" />
              <AnimatedCounter end={100} suffix="%" label="Satisfaction" />
              <AnimatedCounter end={10} suffix="x" label="Faster Dev" />
              <AnimatedCounter end={24} suffix="/7" label="Support" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
