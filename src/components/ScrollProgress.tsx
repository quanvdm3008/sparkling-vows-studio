import { motion, useScroll } from "framer-motion";

const ScrollProgress = ({ accentColor }: { accentColor: string }) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[55] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`,
      }}
    />
  );
};

export default ScrollProgress;
