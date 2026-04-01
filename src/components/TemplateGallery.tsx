import { useState } from "react";
import { motion } from "framer-motion";
import { templates, type WeddingTemplate } from "@/data/templates";
import TemplateCard from "./TemplateCard";
import InvitationEditor from "./InvitationEditor";

const categories = ["Tất cả", "Lãng mạn", "Hiện đại", "Nhiệt đới", "Cổ điển", "Nhật Bản", "Tối giản", "Boho", "Hoàng gia", "Cổ tích"];

const TemplateGallery = () => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [selectedTemplate, setSelectedTemplate] = useState<WeddingTemplate | null>(null);

  const filtered =
    activeCategory === "Tất cả"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  if (selectedTemplate) {
    return <InvitationEditor template={selectedTemplate} onBack={() => setSelectedTemplate(null)} />;
  }

  return (
    <section id="templates" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body font-semibold text-sm tracking-widest uppercase">
            Bộ sưu tập
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Mẫu Thiệp Cưới Đẹp
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Lựa chọn từ những mẫu thiệp được thiết kế tinh tế, phù hợp với mọi phong cách
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={index}
              onSelect={setSelectedTemplate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateGallery;
