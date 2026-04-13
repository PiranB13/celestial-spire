import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import NeuralNetwork3D from './NeuralNetwork3D';

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

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 scanline pointer-events-none" />
      <NeuralNetwork3D />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-xs font-mono-tech text-primary mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            ACCEPTING NEW PROJECTS
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
            Smarter Websites.
            <br />
            <span className="text-gradient">Expert Craftsmanship.</span>
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We leverage the latest AI technology to design, build, and optimise 
            digital experiences for ambitious businesses — delivered faster, priced 
            fairly, and crafted by skilled professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 animate-pulse-glow group"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg glass border border-border hover:border-primary/40 text-foreground font-semibold transition-all duration-300"
            >
              View Our Portfolio
            </a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto glass rounded-2xl p-6 border border-border/50"
          >
            <AnimatedCounter end={50} suffix="+" label="Projects" />
            <AnimatedCounter end={99} suffix="%" label="Satisfaction" />
            <AnimatedCounter end={3} suffix="x" label="Faster Dev" />
            <AnimatedCounter end={24} suffix="/7" label="Support" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#services" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-xs font-mono-tech tracking-widest">SCROLL</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
