import FallingPetals from "@/components/FallingPetals";
import HeroSection from "@/components/HeroSection";
import TemplateGallery from "@/components/TemplateGallery";
import HowItWorks from "@/components/HowItWorks";
import WeddingServices from "@/components/WeddingServices";
import Navbar from "@/components/landing/Navbar";
import PremiumFeatures from "@/components/landing/PremiumFeatures";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <FallingPetals />
      <Navbar />
      <HeroSection />
      <PremiumFeatures />
      <TemplateGallery />
      <HowItWorks />
      <WeddingServices accentColor="hsl(38 47% 50%)" />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
