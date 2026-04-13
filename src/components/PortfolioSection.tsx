import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { StaggerContainer, RevealItem, itemVariants } from './ScrollReveal';

const projects = [
  {
    title: 'RugbyConnect',
    description: 'A comprehensive rugby recruitment and scouting platform connecting players, coaches, and clubs across the UK. Built with real-time match tracking and player analytics.',
    url: 'https://rugbyconnect.org',
    tags: ['Web Platform', 'Real-time Data', 'Analytics'],
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'hover:border-green-500/40',
  },
  {
    title: 'Growing Futures Cornwall',
    description: 'An education services platform for Cornwall-based families, providing resources, event booking, and community connection for child development and learning.',
    url: 'https://growingfuturescornwall.com',
    tags: ['Education', 'Booking System', 'Community'],
    color: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'hover:border-amber-500/40',
  },
  {
    title: 'Sensory Cove',
    description: 'A bespoke website for a sensory space supporting individuals with ASD and SEMH needs. Features calming design, booking integration, and accessibility-first approach.',
    url: 'https://sensorycove.co.uk',
    tags: ['Accessibility', 'Healthcare', 'Booking'],
    color: 'from-purple-500/20 to-violet-500/20',
    borderColor: 'hover:border-purple-500/40',
  },
  {
    title: 'Serenity Hypnotherapy',
    description: 'A modern hypnotherapy app with session booking, guided audio content, and progress tracking. Designed for calm, trust, and therapeutic engagement.',
    url: '#',
    tags: ['Mobile App', 'Audio Content', 'Wellness'],
    color: 'from-sky-500/20 to-cyan-500/20',
    borderColor: 'hover:border-sky-500/40',
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
              className={`group relative glass rounded-2xl p-8 border border-border/50 ${project.borderColor} transition-all duration-500 block`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono-tech bg-secondary/50 text-muted-foreground border border-border/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
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
