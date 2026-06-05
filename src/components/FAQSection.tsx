import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

const faqs = [
  {
    q: 'How long does it take to build a website?',
    a: 'Basic (one page) usually takes 3 to 5 working days. Pro (up to 5 pages) is around 1 to 2 weeks. Expert builds with 3D, portals, or e-commerce typically run 2 to 3 weeks depending on scope. Full Brand adds about a week on top for the identity work. Average lead time across all projects is around 11 days.',
  },
  {
    q: 'How much does a website cost?',
    a: 'Basic starts at £300, Pro at £500, Expert at £1,000, and Full Brand at £2,000. Whatever we agree is the price; there are no surprise invoices at the end.',
  },
  {
    q: 'How do you deliver so fast?',
    a: "We use a modern toolchain that handles a lot of the repetitive work, which lets us focus on design, strategy, and quality. Every build is hand-reviewed and refined by a person before it ships, so you get the speed of modern tools with the polish of a proper studio.",
  },
  {
    q: 'What is included in the price?',
    a: 'Every package: custom design, responsive layout, SEO setup, contact form, a QA pass, and post-launch support. Pro adds a CMS and analytics. Expert adds 3D, portals, or e-commerce. Full Brand adds full identity work. See the pricing section for the full split.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a: 'Yes. Basic gets 14 days, Pro gets 30, Expert gets 90, Full Brand gets 6 months. After that you can put us on a maintenance retainer or take everything in-house. Either is fine.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Yes. We audit your current site for speed, layout, and accessibility, then fix the parts that are actually hurting it. If you need to move to a different platform we handle the migration too.',
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
    <section id="faq" className="relative py-16 lg:py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="text-center mb-12">
          <RevealItem>
            <span className="font-mono-tech text-xs text-primary tracking-widest uppercase">// FAQ</span>
          </RevealItem>
          <RevealItem>
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-4">
              Common <span className="text-gradient">Questions</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The stuff people actually ask before signing. Anything missing?{' '}
              <a href="#contact" className="text-primary hover:underline">Drop us a note.</a>
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
