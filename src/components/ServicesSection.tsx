import { Globe, Zap, Code2 } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

const services = [
  {
    icon: Globe,
    title: 'New websites',
    description: 'Concept to launch in days, not months. AI generates the design directions, copy, and code; we direct it and ship what works. You get something specific to your business, not a template wearing your logo.',
    features: ['Custom design, no templates', 'SEO and meta set up properly', 'Responsive at every breakpoint', 'CMS so non-devs can edit copy'],
  },
  {
    icon: Zap,
    title: 'Redesigns and rescues',
    description: "Your site loads slow, looks old, or does not convert. AI audits Core Web Vitals, accessibility, and the user journey, then drafts the fixes. We ship the changes that actually move the metric.",
    features: ['Performance and Core Web Vitals', 'Modern UX without the rewrite', 'WCAG 2.2 AA compliance', 'Funnel and event tracking'],
  },
  {
    icon: Code2,
    title: 'Custom platforms',
    description: 'Beyond websites: client portals, booking systems, retail storefronts, internal tools. Built on stacks AI handles well (Next.js, Supabase, Stripe) so we move quickly and you stay portable.',
    features: ['Full-stack apps, owned by you', 'Auth, roles, and user areas', 'Stripe, Twilio, and API plumbing', 'Cloud deploy with CI'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-16">
          <RevealItem>
            <span className="font-mono-tech text-xs text-primary tracking-widest uppercase">// Services</span>
          </RevealItem>
          <RevealItem>
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-4">
              What we <span className="text-gradient">build</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three lanes. AI handles the volume; we make sure what ships is worth shipping. Pick the closest fit; we will say if it is wrong.
            </p>
          </RevealItem>
        </StaggerContainer>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <RevealItem key={service.title} direction="up">
              <div className="group relative glass rounded-2xl p-8 hover:glow-border transition-all duration-500 cursor-default h-full border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                  <div className="absolute top-0 right-0 h-[1px] w-8 bg-gradient-to-l from-primary/50 to-transparent" />
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}
