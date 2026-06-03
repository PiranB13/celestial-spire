import { Check, Type, LayoutDashboard, Boxes, Hexagon } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

const tiers = [
  {
    name: 'Basic',
    icon: Type,
    price: 300,
    description:
      'A focused one-page site for freelancers, launches, and small ventures that need a strong first impression without the overhead.',
    features: [
      'One bespoke page, fully responsive',
      'AI-accelerated build with human craft',
      'Core SEO and meta setup',
      'Contact form with spam protection',
      '14-day post-launch support',
    ],
    cta: 'Get a quote',
    popular: false,
  },
  {
    name: 'Pro',
    icon: LayoutDashboard,
    price: 500,
    description:
      'A full website for businesses building a serious online presence. Structure, content management, and the polish to keep visitors moving.',
    features: [
      'Everything in Basic',
      'Up to 5 bespoke pages',
      'Headless CMS so you can edit copy',
      'Analytics and conversion tracking',
      'Performance and Core Web Vitals tuning',
      '30-day priority support',
    ],
    cta: 'Get a quote',
    popular: true,
  },
  {
    name: 'Expert',
    icon: Boxes,
    price: 1000,
    description:
      'Custom platforms with real depth: interactive 3D scenes, client portals, or full e-commerce. Engineered to load fast and stay maintainable.',
    features: [
      'Everything in Pro',
      'Interactive 3D scenes or portal app',
      'Storefront, checkout, and inventory',
      'Authenticated user areas with roles',
      'Third-party integrations (Stripe, CRMs, APIs)',
      'Cloud hosting and CI deploy pipeline',
      '90-day dedicated support',
    ],
    cta: 'Get a quote',
    popular: false,
  },
  {
    name: 'Full Brand',
    icon: Hexagon,
    price: 2000,
    description:
      'Brand identity built alongside the platform: logo system, type, palette, and voice, applied across the entire Expert build.',
    features: [
      'Everything in Expert',
      'Logo system and visual identity',
      'Type, colour, and motion guidelines',
      'Brand voice and messaging framework',
      'Social and marketing asset kit',
      'Six months of evolutionary support',
    ],
    cta: 'Get a quote',
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
              Honest pricing, <span className="text-gradient">no surprises</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Four packages, four levels of ambition. Every tier ships with the same engineering bar; the difference is scope.
            </p>
          </RevealItem>
        </StaggerContainer>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {tiers.map((tier) => (
            <RevealItem key={tier.name} direction="up">
              <div
                className={`relative flex flex-col h-full glass rounded-2xl p-7 ${
                  tier.popular ? 'glow-border border-primary/40 lg:-mt-4 lg:mb-[-16px]' : 'border border-border/50'
                } transition-all duration-500 hover:glow-border`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold font-mono-tech tracking-wider">
                    MOST CHOSEN
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <tier.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground tabular-nums">£{tier.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground ml-1">starting</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed text-pretty">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-auto block text-center py-3 rounded-lg text-sm font-semibold transition-all duration-300 active:scale-[0.98] ${
                    tier.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow'
                      : 'glass border border-border hover:border-primary/40 text-foreground'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </RevealItem>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground/70 mt-12 font-mono-tech tracking-wider uppercase">
          Quoted in GBP · Final figure depends on scope · Nothing starts without a written estimate
        </p>
      </div>
    </section>
  );
}
