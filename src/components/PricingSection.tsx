import { Check, FileText, Layers, Shield, Sparkles } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

const tiers = [
  {
    name: 'Basic',
    icon: FileText,
    price: '300',
    description: 'A single page, built to convert. Good for freelancers, product launches, or a small business that does not need a full site yet.',
    features: [
      'Custom design, hand-reviewed',
      'Works on phones and laptops',
      'SEO and meta tags set up',
      'Contact form that actually sends',
      'Pre-launch QA pass',
      '14 days of support after go-live',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    icon: Layers,
    price: '500',
    description: 'A full website for businesses that need more than one page. Structure, a CMS, and the basics that let you keep editing without us.',
    features: [
      'Everything in Basic',
      'Up to 5 pages',
      'Full SEO and analytics setup',
      'CMS so you can edit copy',
      'Page speed and Core Web Vitals',
      'Blog or news section',
      '30 days of priority support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Expert',
    icon: Shield,
    price: '1,000',
    description: 'Bigger builds with real depth: 3D scenes, client portals, or a proper e-commerce store. Made to handle traffic and grow as you do.',
    features: [
      'Everything in Pro',
      '3D scenes or full portal app',
      'E-commerce store and checkout',
      'Custom logic, workflows, roles',
      'Database and user management',
      'Stripe, CRM, and other APIs',
      'Cloud hosting and deployment',
      '90 days of dedicated support',
    ],
    cta: 'Get a Quote',
    popular: true,
  },
  {
    name: 'Full Brand',
    icon: Sparkles,
    price: '2,000',
    description: 'Brand identity built at the same time as the platform. Logo, type, palette, voice, and how all of it shows up across every page of the Expert build.',
    features: [
      'Everything in Expert',
      'Logo system and identity',
      'Type, colour, and motion rules',
      'Brand voice and messaging guide',
      'Social and marketing asset kit',
      '6 months of ongoing support',
    ],
    cta: 'Get a Quote',
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-16 lg:py-24">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-12">
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
              Fixed prices, agreed in writing. Pick the package that fits. Every tier is reviewed end-to-end by a person before it goes out.
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
