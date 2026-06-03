import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { StaggerContainer, RevealItem } from './ScrollReveal';

const faqs = [
  {
    q: 'How long does it take to build a website?',
    a: 'A Basic single-page site typically takes 3–5 working days. A Pro multi-page site takes 1–2 weeks. Expert builds with 3D, portals, or retail are scoped individually, typically 4–8 weeks. Full Brand engagements add roughly 2 weeks for the identity work. AI dramatically accelerates our workflow compared to traditional agencies.',
  },
  {
    q: 'How much does a website cost?',
    a: 'Our pricing starts at £300 for Basic (single page), £500 for Pro (up to 5 pages), £1,000 for Expert (3D, portals, and retail), and £2,000 for Full Brand (identity plus everything in Expert). All prices are fixed-fee — no hidden costs, no surprises.',
  },
  {
    q: 'Do you use AI to build websites?',
    a: 'Yes. We use AI tools to accelerate design generation, content creation, and code production — achieving in days what traditionally takes weeks. Every output is reviewed and refined by our experienced developers to ensure quality.',
  },
  {
    q: 'What is included in the price?',
    a: 'All packages include AI-assisted design and development, fully responsive layouts, SEO foundations, an integrated contact form, expert QA review, and post-launch support. Pro adds a CMS and analytics; Expert adds 3D, portals, or retail features; Full Brand adds full identity work — see our pricing section.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a: 'Yes. All packages include post-launch support: 14 days for Basic, 30 days for Pro, 90 days for Expert, and 6 months for Full Brand. Ongoing maintenance retainers are also available on request.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Absolutely. Our redesign and optimisation service audits your current site for speed, UX, and accessibility issues, then implements targeted improvements. We can also migrate your content to a new, modern platform.',
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
              Common <span className="text-gradient">Questions</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to know before getting started. Can't find what you're looking for?{' '}
              <a href="#contact" className="text-primary hover:underline">Just ask us.</a>
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
