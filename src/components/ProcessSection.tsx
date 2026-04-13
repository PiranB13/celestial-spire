import { Lightbulb, Cpu, Wrench, Rocket } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Discovery & Strategy',
    description: 'We begin with a free consultation to understand your business, goals, and audience. Our team researches your market and competitors to define a clear digital strategy.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI-Powered Design & Build',
    description: 'Using advanced AI tools, we generate bespoke designs, produce optimised content, and rapidly build your site or application — achieving in days what traditionally takes weeks.',
  },
  {
    number: '03',
    icon: Wrench,
    title: 'Expert Refinement & QA',
    description: 'Every element is then reviewed and refined by our experienced developers and designers. We ensure pixel-perfect quality, accessibility compliance, and flawless performance.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Ongoing Support',
    description: 'We handle deployment, analytics setup, and SEO configuration. After launch, we provide dedicated support and can continue enhancing your platform as your business grows.',
  },
];

export default function ProcessSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_60%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-16">
          <RevealItem>
            <span className="font-mono-tech text-xs text-primary tracking-widest uppercase">// Process</span>
          </RevealItem>
          <RevealItem>
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-4">
              How We <span className="text-gradient">Work</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              AI handles the heavy lifting. Our experts ensure the finished product is exceptional. Here's how we bring your project to life.
            </p>
          </RevealItem>
        </StaggerContainer>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <RevealItem key={step.number} direction="up">
              <div className="group relative glass rounded-2xl p-8 border border-border/50 hover:glow-border transition-all duration-500 h-full">
                {/* Step number */}
                <div className="font-mono-tech text-3xl font-bold text-primary/20 mb-4">{step.number}</div>

                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                {/* Connector line (hidden on last item and on mobile) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 lg:-right-4 w-8 h-[1px] bg-gradient-to-r from-primary/30 to-transparent" />
                )}

                {/* Corner accent */}
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
