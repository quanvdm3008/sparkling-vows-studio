import { motion } from "framer-motion";

/**
 * Cinematic chapter transition between sections.
 * Thin gold filaments + chapter number revealed on scroll-in.
 */
const ChapterTransition = ({
  chapter,
  label,
  accentColor,
}: {
  chapter: number;
  label: string;
  accentColor: string;
}) => {
  return (
    <div className="relative py-10 md:py-14 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 h-px origin-center"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />
      <motion.div
        initial={{ opacity: 0, y: 12, letterSpacing: "0.6em" }}
        whileInView={{ opacity: 1, y: 0, letterSpacing: "0.35em" }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative bg-background px-5 text-center"
      >
        <div className="font-body text-[10px] uppercase tracking-[0.35em]" style={{ color: accentColor }}>
          Chapter {String(chapter).padStart(2, "0")}
        </div>
        <div className="font-display italic text-sm md:text-base text-muted-foreground mt-1">{label}</div>
      </motion.div>
    </div>
  );
};

export default ChapterTransition;
