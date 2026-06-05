import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-dvh bg-background text-foreground overflow-x-clip">
      <Navbar />
      <HeroSection />
      
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
