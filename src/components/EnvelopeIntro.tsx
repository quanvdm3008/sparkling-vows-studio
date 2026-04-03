import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface EnvelopeIntroProps {
  groomName: string;
  brideName: string;
  accentColor: string;
  decorEmoji: string;
  onComplete: () => void;
}

const EnvelopeIntro = ({ groomName, brideName, accentColor, decorEmoji, onComplete }: EnvelopeIntroProps) => {
  const [phase, setPhase] = useState<"sealed" | "opening" | "done">("sealed");

  const handleOpen = () => {
    setPhase("opening");
    setTimeout(() => setPhase("done"), 1200);
    setTimeout(onComplete, 2000);
  };

  return (
    <AnimatePresence>
      {phase !== "done" ? null : null}
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}08)` }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        animate={phase === "done" ? { opacity: 0, scale: 1.1 } : { opacity: 1 }}
        transition={{ duration: 0.8 }}
        onAnimationComplete={() => { if (phase === "done") onComplete(); }}
      >
        {/* Decorative floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl pointer-events-none"
            style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.4 }}
          >
            {decorEmoji}
          </motion.div>
        ))}

        <motion.div
          className="relative cursor-pointer select-none"
          onClick={handleOpen}
          whileHover={phase === "sealed" ? { scale: 1.03 } : {}}
          whileTap={phase === "sealed" ? { scale: 0.97 } : {}}
        >
          {/* Envelope body */}
          <motion.div
            className="relative w-80 sm:w-96 h-56 sm:h-64 rounded-2xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: `${accentColor}18`, borderColor: `${accentColor}30` }}
            animate={phase === "opening" ? { y: 50, opacity: 0.5 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Envelope texture */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${accentColor} 0px, transparent 1px, transparent 20px)` }} />
            
            {/* Inner card peeking out */}
            <motion.div
              className="absolute inset-x-4 bottom-4 top-8 rounded-xl shadow-lg flex flex-col items-center justify-center gap-3 backdrop-blur-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.95)", border: `1px solid ${accentColor}20` }}
              animate={phase === "opening" ? { y: -120, scale: 1.05 } : {}}
              transition={{ duration: 0.8, type: "spring", damping: 15 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-8 h-8" fill={accentColor} style={{ color: accentColor }} />
              </motion.div>
              <p className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground">Thiệp Mời</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center leading-tight">
                {groomName} <span style={{ color: accentColor }}>&</span> {brideName}
              </h2>
              <div className="w-16 h-[1px] my-1" style={{ backgroundColor: accentColor }} />
              <p className="font-body text-xs text-muted-foreground">Nhấn để mở</p>
            </motion.div>
          </motion.div>

          {/* Envelope flap (top triangle) */}
          <motion.div
            className="absolute -top-0 left-0 right-0 h-32 sm:h-36 origin-top"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backgroundColor: `${accentColor}25`,
              borderBottom: `2px solid ${accentColor}30`,
            }}
            animate={phase === "opening" ? { rotateX: 180, opacity: 0 } : {}}
            transition={{ duration: 0.6 }}
          />

          {/* Seal */}
          {phase === "sealed" && (
            <motion.div
              className="absolute top-24 sm:top-28 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10"
              style={{ backgroundColor: accentColor }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-white" fill="white" />
            </motion.div>
          )}
        </motion.div>

        {/* Tap hint */}
        {phase === "sealed" && (
          <motion.p
            className="absolute bottom-12 font-body text-sm text-muted-foreground"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Nhấn vào phong bì để mở thiệp ✨
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default EnvelopeIntro;
