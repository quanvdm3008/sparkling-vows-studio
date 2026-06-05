import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  accentColor: string;
}

const GalleryCarousel = ({ images, accentColor }: Props) => {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const visible = [-2, -1, 0, 1, 2].map((o) => ({
    src: images[(index + o + images.length * 2) % images.length],
    offset: o,
  }));

  return (
    <div className="relative w-full h-[420px] md:h-[560px] flex items-center justify-center overflow-hidden">
      <AnimatePresence initial={false}>
        {visible.map(({ src, offset }) => {
          const isActive = offset === 0;
          return (
            <motion.div
              key={`${src}-${offset}`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.25,
                x: offset * 220,
                scale: isActive ? 1 : 0.78 - Math.abs(offset) * 0.05,
                filter: isActive ? "blur(0px)" : `blur(${Math.abs(offset) * 2}px)`,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{ type: "spring", stiffness: 180, damping: 26 }}
              className="absolute w-[260px] h-[360px] md:w-[340px] md:h-[460px] rounded-3xl overflow-hidden shadow-2xl"
              style={{
                boxShadow: isActive ? `0 30px 80px -20px ${accentColor}66` : undefined,
              }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              {!isActive && <div className="absolute inset-0 bg-black/30" />}
            </motion.div>
          );
        })}
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-2 md:left-6 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        <ChevronLeft className="w-5 h-5" style={{ color: accentColor }} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-6 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        <ChevronRight className="w-5 h-5" style={{ color: accentColor }} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === index ? 24 : 8,
              background: i === index ? accentColor : `${accentColor}55`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryCarousel;
