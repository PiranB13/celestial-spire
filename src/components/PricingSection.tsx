import { motion } from 'framer-motion';
import { Check, FileText, Layers, Shield } from 'lucide-react';
import { StaggerContainer, RevealItem, scaleIn } from './ScrollReveal';

const tiers = [
  {
    name: 'Single Page',
    icon: FileText,
    price: '300',
    description: 'A polished, high-impact single page website — ideal for freelancers, new businesses, or landing pages.',
    features: [
      'AI-assisted design & build',
      'Fully responsive layout',
      'Basic SEO setup',
      'Contact form integration',
      'Human review & refinement',
      '14-day post-launch support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Multi Page',
    icon: Layers,
    price: '500',
    description: 'A complete multi-page website for growing businesses that need room to showcase services, team, and more.',
    features: [
      'Everything in Single Page',
      'Up to 10 pages',
      'Advanced SEO & analytics',
      'CMS integration',
      'Performance optimisation',
      'Blog or news section',
      '30-day priority support',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Portal & Software',
    icon: Shield,
    price: '1,000',
    description: 'Custom portals, booking systems, or business software — built with AI speed and human precision.',
    features: [
      'Everything in Multi Page',
      'Client/staff portal',
      'Custom business logic',
      'Database & user management',
      'API integrations',
      'Cloud hosting setup',
      '90-day support contract',
      'Ongoing maintenance options',
    ],
    cta: 'Get a Quote',
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-16">
          <RevealItem>
            <span className="font-mono-tech text-xs text-primary tracking-widest uppercase">// Pricing</span>
          </RevealItem>
          <RevealItem>
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-4">
              Simple <span className="text-gradient">Pricing</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Transparent pricing with no hidden fees. Every tier includes AI-assisted development with expert human oversight.
            </p>
          </RevealItem>
        </StaggerContainer>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start" staggerDelay={0.2}>
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={scaleIn}
              className={`relative glass rounded-2xl p-8 ${
                tier.popular ? 'glow-border border-primary/40 md:-mt-4 md:mb-[-16px]' : 'border border-border/50'
              } transition-all duration-500 hover:glow-border`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold font-mono-tech tracking-wider">
                  MOST POPULAR
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <tier.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">
                  £{tier.price}
                </span>
                <span className="text-sm text-muted-foreground ml-1">starting</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  tier.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow'
                    : 'glass border border-border hover:border-primary/40 text-foreground'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
