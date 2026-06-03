import { Globe, Zap, Code2 } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

const services = [
  {
    icon: Globe,
    title: 'Website Creation',
    description: 'Start to finish. We run AI through your market and brand to draft a few directions, then build it out as a real working site. Everything gets a pass before launch so it looks like your business, not a template.',
    features: ['Custom design, not a template', 'SEO and meta set up properly', 'Works on phones, tablets, and desktop', 'CMS so you can edit without us'],
  },
  {
    icon: Zap,
    title: 'Redesign & Optimisation',
    description: "Your site loads slow, looks dated, or isn't pulling visitors in. We run an AI audit on speed, layout, and accessibility, then fix the things that are actually costing you traffic and conversions.",
    features: ['Core Web Vitals and page speed', 'UX clean-up where it matters', 'WCAG accessibility pass', 'Analytics and event tracking'],
  },
  {
    icon: Code2,
    title: 'Custom Software & Portals',
    description: 'Need more than a static site? Client portals, booking systems, retail storefronts, internal dashboards. AI speeds up the build, the code is solid, and you keep full ownership when we hand over.',
    features: ['Full apps, not glued-together plugins', 'Logins, roles, and user areas', 'Stripe, calendars, CRM integrations', 'Cloud hosting set up for you'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-16 lg:py-24">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-12">
          <RevealItem>
            <span className="font-mono-tech text-xs text-primary tracking-widest uppercase">// Services</span>
          </RevealItem>
          <RevealItem>
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-4">
              What We <span className="text-gradient">Do</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              AI does the heavy lifting. We keep an eye on quality. You get a good website for less money and in less time than a traditional agency takes.
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
