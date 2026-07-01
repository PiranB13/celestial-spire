import { Check, FileText, Layers, Shield, Sparkles } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';
import SectionHeading from './SectionHeading';

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
    cta: 'Get started',
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
    cta: 'Get started',
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
    cta: 'Get a quote',
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
    cta: 'Get a quote',
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative py-20 lg:py-28">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={<span id="pricing-heading">Website design <span className="text-gradient">pricing</span></span>}
          description="Clear starting prices, agreed in writing before we begin. Final quote depends on the specifics of your build, with no surprise invoices at the end."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {tiers.map((tier) => (
            <RevealItem key={tier.name} direction="up" className="h-full">
              <article
                className={`relative glass card-hover rounded-2xl p-8 h-full flex flex-col ${
                  tier.popular ? 'glow-border border-primary/40' : ''
                }`}
              >
                {tier.popular && (
                  <p className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold font-mono-tech tracking-wider whitespace-nowrap">
                    MOST POPULAR
                  </p>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <tier.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                </div>
                <p className="mb-4">
                  <span className="text-3xl font-bold text-foreground">£{tier.price}</span>
                  <span className="text-sm text-muted-foreground ml-1.5">starting</span>
                </p>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block text-center py-3 rounded-lg text-sm font-semibold transition-colors duration-300 mt-auto ${
                    tier.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 glow-static'
                      : 'glass hover:border-primary/40 text-foreground'
                  }`}
                >
                  {tier.cta}
                  <span className="sr-only"> — {tier.name} package</span>
                </a>
              </article>
            </RevealItem>
          ))}
        </StaggerContainer>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Not sure whether to build it yourself or hire us?{' '}
          <a href="/guides/build-vs-hire" className="text-primary hover:underline font-medium">
            Read our DIY vs. professional agency guide
          </a>
          .
        </p>
      </div>
    </section>
  );
}
