import FallingPetals from "@/components/FallingPetals";
import HeroSection from "@/components/HeroSection";
import TemplateGallery from "@/components/TemplateGallery";
import HowItWorks from "@/components/HowItWorks";
import { Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FallingPetals />
      <HeroSection />
      <TemplateGallery />
      <HowItWorks />

      {/* Footer */}
      <footer className="py-12 px-4 text-center relative z-10 border-t border-border">
        <div className="flex items-center justify-center gap-2 text-muted-foreground font-body text-sm">
          <span>Được tạo với</span>
          <Heart className="w-4 h-4 text-primary fill-primary" />
          <span>bởi Wedding Cards Online</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
