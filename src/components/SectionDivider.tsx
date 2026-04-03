import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface SectionDividerProps {
  accentColor: string;
  variant?: "ornament" | "wave" | "dots" | "line";
}

const SectionDivider = ({ accentColor, variant = "ornament" }: SectionDividerProps) => {
  if (variant === "wave") {
    return (
      <div className="relative h-16 overflow-hidden">
        <svg viewBox="0 0 1440 100" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <motion.path
            d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,25 1440,50 L1440,100 L0,100 Z"
            fill={`${accentColor}08`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <motion.div
        className="flex items-center justify-center gap-3 py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              backgroundColor: accentColor,
              width: i === 2 ? 8 : 4,
              height: i === 2 ? 8 : 4,
              opacity: i === 2 ? 0.8 : 0.3,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          />
        ))}
      </motion.div>
    );
  }

  if (variant === "line") {
    return (
      <motion.div
        className="flex items-center justify-center gap-4 py-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="h-[1px] w-20"
          style={{ backgroundColor: `${accentColor}40` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.5 }} />
        <motion.div
          className="h-[1px] w-20"
          style={{ backgroundColor: `${accentColor}40` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />
      </motion.div>
    );
  }

  // ornament (default)
  return (
    <motion.div
      className="flex items-center justify-center gap-4 py-8"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="h-[1px] w-16 md:w-24"
        style={{ backgroundColor: `${accentColor}30` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Heart className="w-4 h-4" fill={`${accentColor}60`} style={{ color: `${accentColor}60` }} />
      </motion.div>
      <motion.div
        className="h-[1px] w-16 md:w-24"
        style={{ backgroundColor: `${accentColor}30` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
};

export default SectionDivider;
