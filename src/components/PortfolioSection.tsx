import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { StaggerContainer, itemVariants } from './ScrollReveal';
import SectionHeading from './SectionHeading';

import rugbyconnectImg from '@/assets/portfolio-rugbyconnect.webp';
import growingfuturesImg from '@/assets/portfolio-growingfutures.webp';
import sensorycoveImg from '@/assets/portfolio-sensorycove.webp';
import serenityImg from '@/assets/portfolio-serenity.webp';

const projects = [
  {
    title: 'RugbyConnect',
    description: 'A recruitment and scouting platform for UK rugby. Players, coaches, and clubs use it to find each other and track who is doing what across the season.',
    url: 'https://rugbyconnect.org',
    tags: ['Web Platform', 'Real-time Data', 'Analytics'],
    image: rugbyconnectImg,
    alt: 'RugbyConnect rugby recruitment platform homepage',
  },
  {
    title: 'Growing Futures Cornwall',
    description: 'Education services for Cornwall families. A resource library, event booking, and a way to plug into the community without scrolling through Facebook groups.',
    url: 'https://growingfuturescornwall.com',
    tags: ['Education', 'Booking System', 'Community'],
    image: growingfuturesImg,
    alt: 'Growing Futures Cornwall education services website',
  },
  {
    title: 'Sensory Cove',
    description: 'A site for a sensory space that supports people with ASD and SEMH needs. We built it accessibility-first from the start, not added on after.',
    url: 'https://sensorycove.co.uk',
    tags: ['Accessibility', 'Healthcare', 'Booking'],
    image: sensorycoveImg,
    alt: 'Sensory Cove accessible sensory space website',
  },
  {
    title: 'Serenity Hypnotherapy',
    description: 'A hypnotherapy app with session booking, an audio library, and simple progress tracking. No ads, no algorithm, just the sessions you signed up for.',
    url: null,
    tags: ['Mobile App', 'Audio Content', 'Wellness'],
    image: serenityImg,
    alt: 'Serenity Hypnotherapy mobile app interface',
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.05),transparent_50%)]" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our work"
          title={<span id="portfolio-heading">Recent websites <span className="text-gradient">we've built</span></span>}
          description="Live sites and apps built for real businesses. Click any of them to have a look around."
        />

        <StaggerContainer className="grid md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.12}>
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              className="group relative glass card-hover rounded-2xl overflow-hidden"
            >
              <div className="relative w-full h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" aria-hidden="true" />
              </div>

              <div className="p-8 pt-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="after:absolute after:inset-0 after:z-10"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  {project.url && (
                    <ExternalLink
                      className="w-4 h-4 mt-1.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>
                <ul className="flex flex-wrap gap-2 list-none">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono-tech bg-secondary/60 text-muted-foreground border border-border/60"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
