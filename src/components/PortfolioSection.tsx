import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { StaggerContainer, RevealItem, itemVariants } from './ScrollReveal';

import rugbyconnectImg from '@/assets/portfolio-rugbyconnect.png';
import growingfuturesImg from '@/assets/portfolio-growingfutures.png';
import sensorycoveImg from '@/assets/portfolio-sensorycove.png';
import serenityImg from '@/assets/portfolio-serenity.jpg';

const projects = [
  {
    title: 'RugbyConnect',
    description: 'A comprehensive rugby recruitment and scouting platform connecting players, coaches, and clubs across the UK.',
    url: 'https://rugbyconnect.org',
    tags: ['Web Platform', 'Real-time Data', 'Analytics'],
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'hover:border-green-500/40',
    image: rugbyconnectImg,
  },
  {
    title: 'Growing Futures Cornwall',
    description: 'An education services platform for Cornwall-based families, providing resources, event booking, and community connection.',
    url: 'https://growingfuturescornwall.com',
    tags: ['Education', 'Booking System', 'Community'],
    color: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'hover:border-amber-500/40',
    image: growingfuturesImg,
  },
  {
    title: 'Sensory Cove',
    description: 'A bespoke website for a sensory space supporting individuals with ASD and SEMH needs, with accessibility-first design.',
    url: 'https://sensorycove.co.uk',
    tags: ['Accessibility', 'Healthcare', 'Booking'],
    color: 'from-purple-500/20 to-violet-500/20',
    borderColor: 'hover:border-purple-500/40',
    image: sensorycoveImg,
  },
  {
    title: 'Serenity Hypnotherapy',
    description: 'A modern hypnotherapy app with session booking, guided audio content, and progress tracking for therapeutic engagement.',
    url: '#',
    tags: ['Mobile App', 'Audio Content', 'Wellness'],
    color: 'from-sky-500/20 to-cyan-500/20',
    borderColor: 'hover:border-sky-500/40',
    image: serenityImg,
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.05),transparent_50%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-16">
          <RevealItem>
            <span className="font-mono-tech text-xs text-primary tracking-widest uppercase">// Portfolio</span>
          </RevealItem>
          <RevealItem>
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-4">
              Mission <span className="text-gradient">Logs</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Completed deployments for businesses across industries — each one built with AI precision.
            </p>
          </RevealItem>
        </StaggerContainer>

        <StaggerContainer className="grid md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.15}>
          {projects.map((project) => (
            <motion.a
              key={project.title}
              variants={itemVariants}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className={`group relative glass rounded-2xl overflow-hidden border border-border/50 ${project.borderColor} transition-all duration-500 block`}
            >
              {/* Screenshot thumbnail */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>

              {/* Gradient accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 p-8 pt-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono-tech bg-secondary/50 text-muted-foreground border border-border/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scan line effect on hover */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 scanline" />
              </div>
            </motion.a>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
