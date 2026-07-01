import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { RevealItem, StaggerContainer } from './ScrollReveal';
import SectionHeading from './SectionHeading';

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

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className={`glass rounded-xl overflow-hidden transition-colors duration-300 ${open ? 'border-primary/40' : ''}`}>
      <h3>
        <button
          id={buttonId}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
        >
          <span className="text-sm sm:text-base font-semibold text-foreground leading-snug">{q}</span>
          <ChevronDown
            className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative py-20 lg:py-28">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={<span id="faq-heading">Web design questions, <span className="text-gradient">answered</span></span>}
          description={
            <>
              The stuff people actually ask before signing. Anything missing?{' '}
              <a href="#contact" className="text-primary hover:underline">Drop us a note.</a>
            </>
          }
        />

        <StaggerContainer className="max-w-3xl mx-auto flex flex-col gap-3" staggerDelay={0.06}>
          {faqs.map((item, i) => (
            <RevealItem key={item.q}>
              <FAQItem q={item.q} a={item.a} index={i} />
            </RevealItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
