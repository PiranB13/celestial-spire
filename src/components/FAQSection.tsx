import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

const faqs = [
  {
    q: 'How long does a build take?',
    a: "Basic (one page) ships in 3 to 5 working days. Pro (up to 5 pages) lands in 1 to 2 weeks. Expert builds with 3D, portals, or full retail are scoped individually and usually run 4 to 8 weeks. Full Brand adds 2 weeks for the identity work.",
  },
  {
    q: 'What does it cost?',
    a: "Four packages: Basic from £300, Pro from £500, Expert from £1,000, Full Brand from £2,000. Every quote is fixed-fee in writing before anything starts.",
  },
  {
    q: 'How much of the work is actually AI?',
    a: "Most of it. AI generates the design directions, the copy, and the majority of the code. We direct it, refine the output against the brief, and ship what works. That pipeline is what lets us deliver studio-grade results at a fraction of the price and time.",
  },
  {
    q: "What is included in every tier?",
    a: "Custom design, responsive layouts, SEO and meta setup, contact form with spam protection, real-device QA, and post-launch support. Higher tiers add CMS, analytics, 3D, portals, retail, and brand work. See the pricing section for the per-tier breakdown.",
  },
  {
    q: 'What happens after launch?',
    a: "Support is included in every tier: 14 days on Basic, 30 days on Pro, 90 days on Expert, 6 months on Full Brand. Beyond that we offer a maintenance retainer or hand everything over so your in-house team or developer can take it forward.",
  },
  {
    q: 'Can you redesign or rescue my current site?',
    a: "Yes. We audit performance, accessibility, and the conversion path, then rebuild only what needs rebuilding. Often the content and brand stay; the engine underneath gets replaced.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`glass rounded-xl overflow-hidden transition-colors duration-300 ${
        open ? 'border-primary/40' : 'border-border/50'
      } border`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
      >
        <span className="text-sm font-semibold text-foreground leading-snug">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${open ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-16">
          <RevealItem>
            <span className="font-mono-tech text-xs text-primary tracking-widest uppercase">// FAQ</span>
          </RevealItem>
          <RevealItem>
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-4">
              Common <span className="text-gradient">questions</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Answers to the things people actually ask before signing. Anything missing?{' '}
              <a href="#contact" className="text-primary hover:underline">Send us a note.</a>
            </p>
          </RevealItem>
        </StaggerContainer>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((item) => (
            <RevealItem key={item.q}>
              <FAQItem q={item.q} a={item.a} />
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}
