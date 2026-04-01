import { motion } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";
import type { WeddingTemplate } from "@/data/templates";

interface TemplateCardProps {
  template: WeddingTemplate;
  index: number;
  onSelect: (template: WeddingTemplate) => void;
}

const templateImages: Record<string, string> = {};

// Lazy import images
import romanticImg from "@/assets/template-romantic.jpg";
import modernImg from "@/assets/template-modern.jpg";
import tropicalImg from "@/assets/template-tropical.jpg";
import rusticImg from "@/assets/template-rustic.jpg";
import sakuraImg from "@/assets/template-sakura.jpg";

const imageMap: Record<string, string> = {
  romantic: romanticImg,
  modern: modernImg,
  tropical: tropicalImg,
  rustic: rusticImg,
  sakura: sakuraImg,
};

const TemplateCard = ({ template, index, onSelect }: TemplateCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => onSelect(template)}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 bg-card">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={imageMap[template.id]}
            alt={template.nameVi}
            loading="lazy"
            width={800}
            height={1120}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-500 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-3"
            >
              <button className="p-3 rounded-full bg-primary-foreground/90 text-foreground hover:bg-primary-foreground transition-colors">
                <Eye className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full bg-gradient-gold text-primary-foreground hover:opacity-90 transition-opacity">
                <Sparkles className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
          {/* Category badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary-foreground/90 text-foreground text-xs font-body font-semibold">
            {template.category}
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-display text-xl font-semibold text-foreground mb-1">
            {template.nameVi}
          </h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            {template.description}
          </p>
          {/* Color palette */}
          <div className="flex gap-2 mt-3">
            {template.colors.map((color, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border border-border shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
