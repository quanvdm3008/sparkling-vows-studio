import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import MagazineGallery from "@/components/cinematic/MagazineGallery";
import GalleryCarousel from "./GalleryCarousel";
import GalleryFilmStrip from "./GalleryFilmStrip";
import GalleryMosaic from "./GalleryMosaic";
import type { WeddingTheme } from "@/data/themes";

import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import coupleProposal from "@/assets/couple-proposal.jpg";
import venueImg from "@/assets/venue.jpg";
import ringsImg from "@/assets/rings.jpg";

const images = [couple1, couple2, couple3, coupleProposal, venueImg, ringsImg];

interface Props {
  theme: WeddingTheme;
  accentColor: string;
}

const titles: Record<string, { eyebrow: string; title: string; sub: string }> = {
  magazine: { eyebrow: "Editorial · Album", title: "Khoảnh khắc không thể quên", sub: "Bộ sưu tập biên tập như tạp chí" },
  carousel: { eyebrow: "Slideshow · Album", title: "Lướt qua từng khung hình", sub: "Trình chiếu xoay vòng đầy mơ mộng" },
  "film-strip": { eyebrow: "Cinéma · Album", title: "Cuộn phim tình yêu", sub: "Như một thước phim cuộn theo từng nhịp cuộn trang" },
  mosaic: { eyebrow: "Mosaic · Album", title: "Bức tranh ghép kỷ niệm", sub: "Mỗi mảnh ghép là một câu chuyện riêng" },
  masonry: { eyebrow: "Album · Memories", title: "Album Ảnh Cưới", sub: "Những khoảnh khắc đáng nhớ nhất" },
  polaroid: { eyebrow: "Polaroid · Memories", title: "Album Polaroid", sub: "Hoài niệm trong từng tấm ảnh chụp lấy liền" },
  "grid-overlap": { eyebrow: "Gallery · Album", title: "Bộ sưu tập ảnh", sub: "Bố cục tinh tế cho từng khung hình" },
};

const GalleryDispatcher = ({ theme, accentColor }: Props) => {
  // Map theme.galleryStyle (may not include all keys) → variant
  // Theme types: "masonry" | "carousel" | "grid-overlap" | "polaroid"
  // Add extra mappings per theme id for richer differentiation.
  let variant: string = theme.galleryStyle;
  // Per-theme overrides for the 6 new visual experiences
  const perTheme: Record<string, string> = {
    romantic: "magazine",
    modern: "film-strip",
    tropical: "polaroid",
    rustic: "polaroid",
    sakura: "carousel",
    minimalist: "mosaic",
    vintage: "polaroid",
    boho: "carousel",
    royal: "film-strip",
    garden: "magazine",
  };
  if (perTheme[theme.id]) variant = perTheme[theme.id];

  const meta = titles[variant] || titles.masonry;

  // magazine has its own full section markup
  if (variant === "magazine") {
    return <MagazineGallery accentColor={accentColor} />;
  }

  const Body = () => {
    switch (variant) {
      case "carousel":
        return <GalleryCarousel images={images} accentColor={accentColor} />;
      case "film-strip":
        return <GalleryFilmStrip images={images} accentColor={accentColor} />;
      case "mosaic":
        return <GalleryMosaic images={images} accentColor={accentColor} />;
      default:
        return <GalleryMosaic images={images} accentColor={accentColor} />;
    }
  };

  // film-strip wants edge-to-edge width
  const fullBleed = variant === "film-strip";

  return (
    <section id="gallery" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 px-4">
        <span className="text-[11px] tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>
          {meta.eyebrow}
        </span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-medium mt-3 text-foreground"
        >
          <Camera className="w-7 h-7 inline-block mr-2 mb-1" style={{ color: accentColor }} />
          {meta.title}
        </motion.h2>
        <p className="text-muted-foreground font-body mt-4">{meta.sub}</p>
      </div>
      <div className={fullBleed ? "w-full" : "max-w-7xl mx-auto px-4"}>
        <Body />
      </div>
    </section>
  );
};

export default GalleryDispatcher;
