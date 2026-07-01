import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take to build a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Basic (one page) usually takes 3 to 5 working days. Pro (up to 5 pages) is around 1 to 2 weeks. Expert builds with 3D, portals, or e-commerce typically run 2 to 3 weeks depending on scope. Full Brand adds about a week on top. Average lead time across all projects is around 11 days.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a website cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Basic starts at £300, Pro at £500, Expert at £1,000, and Full Brand at £2,000. Whatever we agree is the price; there are no surprise invoices at the end.",
      },
    },
    {
      "@type": "Question",
      name: "How do you deliver so fast?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use a modern toolchain that handles repetitive work, letting us focus on design, strategy, and quality. Every build is hand-reviewed and refined by a person before it ships.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the price?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every package includes custom design, responsive layout, SEO setup, contact form, a QA pass, and post-launch support. Pro adds a CMS and analytics. Expert adds 3D, portals, or e-commerce. Full Brand adds full identity work.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer ongoing support after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Basic gets 14 days, Pro gets 30, Expert gets 90, Full Brand gets 6 months. After that you can put us on a maintenance retainer or take everything in-house.",
      },
    },
    {
      "@type": "Question",
      name: "Can you redesign my existing website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We audit your current site for speed, layout, and accessibility, then fix the parts that are hurting it. If you need to move to a different platform we handle the migration too.",
      },
    },
  ],
};

const serviceSchemas = [
  { name: "Basic", price: "300", description: "Single-page website, custom design, responsive, SEO setup." },
  { name: "Pro", price: "500", description: "Multi-page website (up to 5 pages) with CMS and analytics." },
  { name: "Expert", price: "1000", description: "Advanced build with 3D, portals, or e-commerce." },
  { name: "Full Brand", price: "2000", description: "Full identity work plus an Expert-tier website." },
].map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  description: s.description,
  provider: { "@type": "Organization", name: "AI Web Solutions" },
  offers: { "@type": "Offer", price: s.price, priceCurrency: "GBP" },
}));

const Index = () => {
  return (
    <div className="min-h-dvh bg-background text-foreground overflow-x-clip">
      <Helmet>
        <title>AI Web Solutions — Expert Web Design & Development, Delivered in Days</title>
        <meta
          name="description"
          content="Professional web design and development for UK small businesses. Custom websites, redesigns, e-commerce and portals — fixed prices from £300, average delivery in 11 days."
        />
        <link rel="canonical" href="https://aiwebsolution.lovable.app/" />
        <meta property="og:title" content="AI Web Solutions — Expert Web Design & Development, Delivered in Days" />
        <meta
          property="og:description"
          content="Custom websites, redesigns, e-commerce and portals for UK small businesses. Fixed prices from £300, average delivery in 11 days."
        />
        <meta property="og:url" content="https://aiwebsolution.lovable.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AI Web Solutions" />
        <meta property="og:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b1084178-bfd6-4c77-ac5f-79df63d7217e/id-preview-04f93c32--2362c53b-2f6e-4ce0-a599-4b0aa2150535.lovable.app-1780690349413.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Web Solutions — Expert Web Design & Development, Delivered in Days" />
        <meta name="twitter:description" content="Custom websites, redesigns, e-commerce and portals for UK small businesses. Fixed prices from £300, average delivery in 11 days." />
        <meta name="twitter:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b1084178-bfd6-4c77-ac5f-79df63d7217e/id-preview-04f93c32--2362c53b-2f6e-4ce0-a599-4b0aa2150535.lovable.app-1780690349413.png" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        {serviceSchemas.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>
      <Navbar />
      <main id="main">
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
