import { Lightbulb, Cpu, Wrench, Rocket } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Discovery & Strategy',
    description: 'A free 30-minute call. You walk us through the business, the goal, and who you are trying to reach. We come back the next day with a written scope and a fixed quote.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI-Powered Design & Build',
    description: 'We use AI to draft designs, write the first pass of copy, and assemble the site. What used to take weeks in a studio now takes days, and you see progress every step of the way.',
  },
  {
    number: '03',
    icon: Wrench,
    title: 'Expert Refinement & QA',
    description: 'We go through the build line by line. Visuals get checked, code gets reviewed, and we test on real devices and browsers. Nothing goes live until you have signed off.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Ongoing Support',
    description: 'We push the site live, hook up analytics, and submit to search. After launch we stay on hand for the support window in your tier, and you can keep us on a retainer if you want.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_60%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-12">
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
              AI does the volume. We make sure what ends up on the site is actually good. Four steps from the first call to launch day.
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
