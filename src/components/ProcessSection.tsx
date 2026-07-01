import { Lightbulb, Cpu, Wrench, Rocket } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';
import SectionHeading from './SectionHeading';

const steps = [
  {
    icon: Lightbulb,
    title: 'Discovery & Strategy',
    description: 'A free 30-minute call. You walk us through the business, the goal, and who you are trying to reach. We come back the next day with a written scope and a fixed quote.',
  },
  {
    icon: Cpu,
    title: 'Design & Build',
    description: 'We draft designs, shape the first pass of copy, and assemble the site using a modern toolchain that compresses weeks of studio work into days. You see progress every step of the way.',
  },
  {
    icon: Wrench,
    title: 'Expert Refinement & QA',
    description: 'We go through the build line by line. Visuals get checked, code gets reviewed, and we test on real devices and browsers. Nothing goes live until you have signed off.',
  },
  {
    icon: Rocket,
    title: 'Launch & Ongoing Support',
    description: 'We push the site live, hook up analytics, and submit to search engines. After launch we stay on hand for the support window in your tier, and you can keep us on a retainer if you want.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-heading" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_60%)]" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Process"
          title={<span id="process-heading">Our web design <span className="text-gradient">process</span></span>}
          description="Four steps from first call to launch day, in a fraction of the usual time — without cutting corners on quality."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <RevealItem key={step.title} direction="up" className="h-full">
              <article className="group relative glass card-hover rounded-2xl p-8 h-full">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <span className="font-mono-tech text-3xl font-bold text-primary/20" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-primary/30 to-transparent"
                    aria-hidden="true"
                  />
                )}
              </article>
            </RevealItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
