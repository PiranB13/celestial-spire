import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, X, Clock, Wallet, Sparkles, ShieldCheck } from 'lucide-react';

const PUBLISHED_AT = '2026-06-05';
const URL = 'https://aiwebsolution.lovable.app/guides/build-vs-hire';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Build a Website: DIY vs. Hiring a Professional Agency',
  description:
    'A practical comparison of DIY website builders and hiring a professional web design agency, focused on time to market, total cost, and long-term quality.',
  datePublished: PUBLISHED_AT,
  dateModified: PUBLISHED_AT,
  author: { '@type': 'Organization', name: 'AI Web Solutions' },
  publisher: { '@type': 'Organization', name: 'AI Web Solutions' },
  mainEntityOfPage: URL,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aiwebsolution.lovable.app/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://aiwebsolution.lovable.app/guides' },
    { '@type': 'ListItem', position: 3, name: 'DIY vs. Hire', item: URL },
  ],
};

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function BuildVsHire() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground overflow-x-clip">
      <Helmet>
        <title>How to Build a Website: DIY vs. Hire a Pro (2026 Guide)</title>
        <meta
          name="description"
          content="Should you build your own website or hire a professional agency? A clear comparison of time, cost, and quality — and how a modern agency ships expert sites in around 11 days."
        />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content="How to Build a Website: DIY vs. Hire a Pro" />
        <meta
          property="og:description"
          content="DIY website builder or professional agency? Compare time to market, total cost, and long-term quality."
        />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <article className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <Section>
          <span className="font-mono-tech text-xs text-primary tracking-widest uppercase">// Guide</span>
          <h1 className="text-3xl lg:text-5xl font-bold mt-4 mb-5 leading-tight">
            How to Build a Website:{' '}
            <span className="text-gradient">DIY vs. Hiring a Professional Agency</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            If you're starting a business website in 2026, you have two real options: build it yourself
            on a drag-and-drop platform, or hire a professional team. Both can get you online. Only one
            of them gets you online <em>well</em>, fast, and without eating weeks of your own time.
          </p>
        </Section>

        <Section className="mt-14">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">The short answer</h2>
          <div className="glass rounded-2xl border border-border/50 p-6 leading-relaxed text-muted-foreground">
            <p>
              DIY builders make sense for hobby sites and very early experiments where the design
              doesn't matter yet. For anything that represents a business, hiring a professional team
              is almost always cheaper once you count your own time — and the gap has shrunk
              dramatically. Modern agencies using a proper toolchain now ship expert-grade websites in
              roughly the same window a DIY build takes a non-designer, with results that actually
              look the part. Our own average lead time is around <strong className="text-foreground">11 days</strong>.
            </p>
          </div>
        </Section>

        <Section className="mt-14">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">Side by side</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass rounded-2xl border border-border/50 p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" /> DIY website builder
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <Row good={false}>40–120 hours of your own time to learn the tool and finish a real site</Row>
                <Row good={false}>Templates that look like every other small-business site</Row>
                <Row good={false}>Monthly subscription, paid forever, that climbs with usage</Row>
                <Row good={false}>You own every bug, every broken form, every performance issue</Row>
                <Row good={true}>Low upfront cost</Row>
              </ul>
            </div>
            <div className="glass rounded-2xl border border-primary/40 p-6 glow-static">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Professional agency (modern)
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <Row good={true}>Around 11 days from kickoff to launch on a typical build</Row>
                <Row good={true}>Custom design tuned to your brand and audience</Row>
                <Row good={true}>Fixed starting price agreed in writing — no surprise invoices</Row>
                <Row good={true}>Hand-reviewed by a person before it ships, plus post-launch support</Row>
                <Row good={false}>Higher upfront cost than a DIY subscription's first month</Row>
              </ul>
            </div>
          </div>
        </Section>

        <Section className="mt-14">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary" /> Time to market is the real cost
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The headline price of a DIY builder hides the part that actually hurts: your time.
              A non-designer building a five-page business site usually spends 40 to 120 hours
              learning the editor, wrestling templates, writing copy, sourcing images, fixing
              mobile layout, and chasing little quirks. Even at a conservative £30/hour for your
              own time, that's £1,200 to £3,600 before you've paid the platform a penny.
            </p>
            <p>
              While you spend a month and a half on the build, you're not selling, you're not
              talking to customers, and your business looks like it doesn't exist yet. That's the
              hidden invoice no one talks about.
            </p>
            <p>
              A professional agency using a modern toolchain compresses that window dramatically.
              We launch most builds in about <strong className="text-foreground">11 days</strong>,
              and you spend a handful of hours on it — kickoff, a feedback round, sign-off. Your
              time goes back into the business.
            </p>
          </div>
        </Section>

        <Section className="mt-14">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-primary" /> Quality compounds
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A DIY site is "good enough" on day one and slowly looks worse as your competitors
            invest in design. A professionally-built site is good on day one and stays good — the
            structure, accessibility, performance, and SEO setup carry you through years of
            growth without needing a rebuild. That's the part you're really paying for.
          </p>
        </Section>

        <Section className="mt-14">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">When DIY genuinely wins</h2>
          <p className="text-muted-foreground leading-relaxed">
            We won't pretend there are no cases. If you're testing a brand-new idea and don't
            even know what you're selling yet, spinning up a one-page DIY site for a week makes
            sense. The moment the idea is real, though, the maths flips fast.
          </p>
        </Section>

        <Section className="mt-16">
          <div className="glass rounded-2xl border border-primary/40 p-8 text-center glow-static">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">
              Ready for an expert site in around 11 days?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Fixed starting prices, hand-reviewed by a person before it ships, no surprise
              invoices at the end.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
            >
              Start your project
            </a>
          </div>
        </Section>
      </article>
    </main>
  );
}

function Row({ children, good }: { children: React.ReactNode; good: boolean }) {
  const Icon = good ? Check : X;
  return (
    <li className="flex gap-3">
      <Icon
        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${good ? 'text-primary' : 'text-muted-foreground/60'}`}
      />
      <span>{children}</span>
    </li>
  );
}
