import { Globe, Zap, Code2 } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

const services = [
  {
    icon: Globe,
    title: 'AI-Powered Website Creation',
    description: 'We use AI tools to research your industry, generate designs, and build stunning websites — then our team refines every detail to ensure it\'s perfect for your business.',
    features: ['Custom design with AI assistance', 'SEO-optimised from day one', 'Mobile-first architecture', 'CMS integration'],
  },
  {
    icon: Zap,
    title: 'Website Redesign & Enhancement',
    description: 'Already have a site? We use AI to audit performance, identify improvements, and implement upgrades — with human expertise guiding every decision.',
    features: ['Performance optimisation', 'UX/UI modernisation', 'Accessibility compliance', 'Analytics integration'],
  },
  {
    icon: Code2,
    title: 'Custom Software & Portals',
    description: 'From booking systems to client portals and internal tools — we leverage AI to accelerate development while our engineers ensure quality and scalability.',
    features: ['Full-stack development', 'AI-assisted workflows', 'Cloud deployment', 'Ongoing maintenance'],
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
              We combine cutting-edge AI tools with hands-on expertise to deliver exceptional digital products — faster and more affordably.
            </p>
          </RevealItem>
        </StaggerContainer>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.18}>
          {services.map((service) => (
            <RevealItem key={service.title} direction="scale">
              <div className="group relative glass rounded-2xl p-8 hover:glow-border transition-all duration-500 cursor-default h-full">
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
        </StaggerContainer>
      </div>
    </section>
  );
}
