import { motion } from 'framer-motion';
import { Check, Rocket, Orbit, Shield } from 'lucide-react';

const tiers = [
  {
    name: 'Launch',
    icon: Rocket,
    price: '1,499',
    description: 'Perfect for startups and small businesses ready to establish their digital presence.',
    features: [
      'AI-generated website design',
      'Up to 5 pages',
      'Mobile responsive',
      'Basic SEO setup',
      'Contact form integration',
      '30-day support',
    ],
    cta: 'Begin Launch Sequence',
    popular: false,
  },
  {
    name: 'Orbit',
    icon: Orbit,
    price: '3,499',
    description: 'For growing businesses that need a powerful, feature-rich web presence with ongoing enhancements.',
    features: [
      'Everything in Launch',
      'Up to 15 pages',
      'Advanced SEO & analytics',
      'CMS integration',
      'Booking/e-commerce features',
      'Performance optimisation',
      '90-day priority support',
      'Monthly AI enhancements',
    ],
    cta: 'Enter Orbit',
    popular: true,
  },
  {
    name: 'Mission Control',
    icon: Shield,
    price: 'Custom',
    description: 'Enterprise-grade custom software and AI solutions tailored to your exact specifications.',
    features: [
      'Everything in Orbit',
      'Custom web applications',
      'AI/ML integration',
      'API development',
      'Cloud infrastructure',
      'Dedicated project manager',
      '12-month support contract',
      'Ongoing AI optimisation',
    ],
    cta: 'Request Briefing',
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono-tech text-xs text-primary tracking-widest uppercase">// Pricing</span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-4">
            Mission <span className="text-gradient">Tiers</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose the mission package that matches your ambition. All tiers include AI-powered development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
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
                  {tier.price !== 'Custom' ? '£' : ''}{tier.price}
                </span>
                {tier.price !== 'Custom' && <span className="text-sm text-muted-foreground ml-1">starting</span>}
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
        </div>
      </div>
    </section>
  );
}
