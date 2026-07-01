import type { ComponentType } from "react";
import type { TemplateProps } from "./_shared/primitives";
import LuxuryGold from "./luxury-gold";
import PolaroidScrapbook from "./polaroid-scrapbook";
import GlassmorphismAurora from "./glassmorphism-aurora";

export interface TemplateMeta {
  id: string;
  name: string;
  nameVi: string;
  description: string;
  category: string;
  archetype: string; // layout family
  colors: string[];
  accent: string;
  Component: ComponentType<TemplateProps>;
}

/**
 * Template registry — each entry is a fully self-contained invitation experience
 * with its own layout archetype, typography, palette, decorations, and gallery.
 */
export const templateRegistry: Record<string, TemplateMeta> = {
  "luxury-gold": {
    id: "luxury-gold",
    name: "Luxury Gold",
    nameVi: "Vàng Xa Hoa",
    description: "Bố cục tạp chí biên tập với chữ vàng cổ điển, drop-cap lớn, khung ornate và bộ sưu tập ảnh magazine spread.",
    category: "Hoàng gia",
    archetype: "Magazine editorial",
    colors: ["#0a0604", "#D4AF37", "#f5e9c8"],
    accent: "#D4AF37",
    Component: LuxuryGold,
  },
  "polaroid-scrapbook": {
    id: "polaroid-scrapbook",
    name: "Polaroid Scrapbook",
    nameVi: "Sổ Kỷ Niệm Polaroid",
    description: "Sổ tay handmade với polaroid xoay nghiêng, băng dính washi, chữ viết tay và thư giãn xếp lộn xộn đầy cảm xúc.",
    category: "Boho",
    archetype: "Scrapbook collage",
    colors: ["#f4e9d4", "#d97757", "#3a2617"],
    accent: "#d97757",
    Component: PolaroidScrapbook,
  },
  "glassmorphism-aurora": {
    id: "glassmorphism-aurora",
    name: "Glass Aurora",
    nameVi: "Kính Aurora",
    description: "Kính mờ hiện đại nổi trên nền aurora chuyển động, ảnh quỹ đạo, carousel toàn màn hình và font sans điện tử.",
    category: "Hiện đại",
    archetype: "Glass + circular",
    colors: ["#0a0a1a", "#ff6ec7", "#6ec7ff"],
    accent: "#ff6ec7",
    Component: GlassmorphismAurora,
  },
};

export const registryTemplates = Object.values(templateRegistry);
