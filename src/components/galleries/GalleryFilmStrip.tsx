import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  images: string[];
  accentColor: string;
}

const GalleryFilmStrip = ({ images, accentColor }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-55%"]);

  return (
    <div ref={ref} className="relative py-12">
      <motion.div style={{ x }} className="flex gap-5 will-change-transform">
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            className="relative flex-none w-[280px] md:w-[360px] h-[380px] md:h-[460px] overflow-hidden bg-black"
            style={{ boxShadow: `0 20px 50px -20px ${accentColor}66` }}
          >
            {/* film perforations */}
            <div className="absolute top-0 left-0 right-0 h-3 flex gap-1 px-2 z-10">
              {Array.from({ length: 18 }).map((_, k) => (
                <span key={k} className="flex-1 bg-black/70 rounded-sm" />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-3 flex gap-1 px-2 z-10">
              {Array.from({ length: 18 }).map((_, k) => (
                <span key={k} className="flex-1 bg-black/70 rounded-sm" />
              ))}
            </div>
            <img src={src} alt="" loading="lazy" className="w-full h-full object-cover py-3" />
            <div className="absolute bottom-5 left-4 right-4 text-[10px] tracking-[0.3em] uppercase font-body text-white/80 z-10">
              Reel · {String((i % images.length) + 1).padStart(2, "0")}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default GalleryFilmStrip;
