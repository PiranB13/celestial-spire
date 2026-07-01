import { Globe, Zap, Code2 } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';
import SectionHeading from './SectionHeading';

const services = [
  {
    icon: Globe,
    title: 'Website Design & Creation',
    description: 'Start to finish. We research your market and brand, draft a few directions, and build it out as a real working site. Everything gets a hands-on pass before launch so it looks like your business, not a template.',
    features: ['Custom design, not a template', 'SEO and meta set up properly', 'Works on phones, tablets, and desktop', 'CMS so you can edit without us'],
  },
  {
    icon: Zap,
    title: 'Redesign & SEO Optimisation',
    description: "Your site loads slow, looks dated, or isn't pulling visitors in. We audit speed, layout, and accessibility, then fix the things that are actually costing you traffic and conversions.",
    features: ['Core Web Vitals and page speed', 'UX clean-up where it matters', 'WCAG accessibility pass', 'Analytics and event tracking'],
  },
  {
    icon: Code2,
    title: 'E-commerce, Portals & Web Apps',
    description: 'Need more than a static site? Client portals, booking systems, retail storefronts, internal dashboards. Built fast, with solid code, and you keep full ownership when we hand over.',
    features: ['Full apps, not glued-together plugins', 'Logins, roles, and user areas', 'Stripe, calendars, CRM integrations', 'Cloud hosting set up for you'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative py-20 lg:py-28">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title={<span id="services-heading">Web design &amp; development <span className="text-gradient">services</span></span>}
          description="Expert craftsmanship, delivered in a fraction of the time. You get a polished website for less money and in less time than a traditional agency takes."
        />

        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <RevealItem key={service.title} direction="up" className="h-full">
              <article className="group relative glass card-hover rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
