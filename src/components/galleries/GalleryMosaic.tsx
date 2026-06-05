import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  images: string[];
  accentColor: string;
}

// Asymmetric mosaic with bento layout
const GalleryMosaic = ({ images, accentColor }: Props) => {
  const [active, setActive] = useState<string | null>(null);
  const layout = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
  ];

  return (
    <>
      <div className="grid grid-cols-4 auto-rows-[140px] md:auto-rows-[180px] gap-3 md:gap-4">
        {images.slice(0, 6).map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className={`${layout[i]} relative overflow-hidden rounded-2xl cursor-pointer group`}
            style={{ boxShadow: `0 20px 50px -25px ${accentColor}66` }}
            onClick={() => setActive(src)}
          >
            <img src={src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${accentColor}33, transparent)` }}
            />
          </motion.div>
        ))}
      </div>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActive(null)}
        >
          <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} src={active} alt="" className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain" />
        </motion.div>
      )}
    </>
  );
};

export default GalleryMosaic;
