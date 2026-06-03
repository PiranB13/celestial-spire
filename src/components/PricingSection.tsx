import { Check, FileText, Layers, Shield, Sparkles } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

const tiers = [
  {
    name: 'Basic',
    icon: FileText,
    price: '300',
    description: 'A striking, conversion-focused single page — perfect for freelancers, startups, or product launches that need to make an immediate impact.',
    features: [
      'AI-assisted design & development',
      'Fully responsive across all devices',
      'SEO foundations & meta optimisation',
      'Integrated contact form',
      'Expert review & quality assurance',
      '14-day post-launch support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    icon: Layers,
    price: '500',
    description: 'A comprehensive, professionally crafted website for businesses ready to establish a commanding online presence with room to grow.',
    features: [
      'Everything in Basic',
      'Up to 5 bespoke pages',
      'Advanced SEO & analytics setup',
      'Content management system',
      'Performance & speed optimisation',
      'Blog or news integration',
      '30-day priority support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Expert',
    icon: Shield,
    price: '1,000',
    description: 'Bespoke digital platforms — interactive 3D experiences, client portals, or full e-commerce — engineered with precision and built to scale with your business.',
    features: [
      'Everything in Pro',
      'Interactive 3D scenes or portal app',
      'E-commerce storefront & checkout',
      'Custom business logic & workflows',
      'Database & user management',
      'Third-party API integrations',
      'Cloud hosting & deployment',
      '90-day dedicated support',
    ],
    cta: 'Get a Quote',
    popular: true,
  },
  {
    name: 'Full Brand',
    icon: Sparkles,
    price: '2,000',
    description: 'Complete brand identity crafted alongside your digital platform — logo, typography, visual language, and voice — applied across the entire Expert build.',
    features: [
      'Everything in Expert',
      'Logo system & visual identity',
      'Typography & colour guidelines',
      'Brand voice & messaging framework',
      'Social & marketing asset kit',
      '6 months of evolutionary support',
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
              Transparent <span className="text-gradient">Pricing</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              No hidden fees, no surprises. Choose the package that fits your goals — every tier includes AI-accelerated development with expert human oversight.
            </p>
          </RevealItem>
        </StaggerContainer>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {tiers.map((tier) => (
            <RevealItem key={tier.name} direction="up">
              <div
                className={`relative glass rounded-2xl p-8 ${
                  tier.popular ? 'glow-border border-primary/40 lg:-mt-4 lg:mb-[-16px]' : 'border border-border/50'
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
                  <span className="text-3xl font-bold text-foreground">£{tier.price}</span>
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
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 glow-static'
                      : 'glass border border-border hover:border-primary/40 text-foreground'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}
