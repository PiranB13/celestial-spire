import { Globe, Zap, Code2 } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

const services = [
  {
    icon: Globe,
    title: 'Website Creation',
    description: 'From first concept to final launch — we harness AI to analyse your market, generate bespoke designs, and build high-performance websites. Every pixel is then refined by our team to ensure it truly represents your brand.',
    features: ['Bespoke AI-generated design', 'Search engine optimisation built in', 'Fully responsive across all devices', 'Content management system included'],
  },
  {
    icon: Zap,
    title: 'Redesign & Optimisation',
    description: 'Transform an underperforming website into a powerful business asset. Our AI audits your current site for speed, UX, and accessibility issues — then our developers implement targeted improvements that deliver measurable results.',
    features: ['Core Web Vitals optimisation', 'Modern UX/UI overhaul', 'WCAG accessibility compliance', 'Advanced analytics & tracking'],
  },
  {
    icon: Code2,
    title: 'Custom Software & Portals',
    description: 'Need more than a website? We design and develop bespoke applications — client portals, booking platforms, internal tools — using AI to accelerate delivery without compromising on quality or security.',
    features: ['End-to-end application development', 'Secure user authentication & portals', 'Third-party API integration', 'Scalable cloud infrastructure'],
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
              What We <span className="text-gradient">Do</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              AI-accelerated development, guided by experienced professionals. We deliver premium digital solutions at a fraction of the traditional cost and timeline.
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
