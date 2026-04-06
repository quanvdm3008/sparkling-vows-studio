import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface EnvelopeIntroProps {
  groomName: string;
  brideName: string;
  accentColor: string;
  decorEmoji: string;
  onComplete: () => void;
}

const EnvelopeIntro = ({ groomName, brideName, accentColor, decorEmoji, onComplete }: EnvelopeIntroProps) => {
  const [phase, setPhase] = useState<"sealed" | "opening" | "card-rise" | "card-full" | "done">("sealed");

  // Stable random positions
  const floatingPositions = useMemo(() =>
    [...Array(12)].map(() => ({
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      dur: 3 + Math.random() * 3,
      size: 14 + Math.random() * 18,
    })), []
  );

  const sparklePositions = useMemo(() =>
    [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      dur: 1.5 + Math.random() * 2,
    })), []
  );

  const handleOpen = () => {
    if (phase !== "sealed") return;
    setPhase("opening");
    setTimeout(() => setPhase("card-rise"), 800);
    setTimeout(() => setPhase("card-full"), 2200);
    setTimeout(() => setPhase("done"), 3400);
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at center, ${accentColor}20 0%, ${accentColor}08 50%, rgba(0,0,0,0.6) 100%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          transition={{ duration: 0.6 }}
        >
          {/* Background shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${accentColor}08 90deg, transparent 180deg, ${accentColor}05 270deg, transparent 360deg)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating emoji decorations */}
          {floatingPositions.map((pos, i) => (
            <motion.div
              key={`float-${i}`}
              className="absolute pointer-events-none"
              style={{ left: pos.left, top: pos.top, fontSize: pos.size }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.7, 0.3, 0.7, 0],
                scale: [0.5, 1, 0.8, 1, 0.5],
                y: [0, -30, -10, -40, 0],
                rotate: [0, 15, -15, 10, 0],
              }}
              transition={{ duration: pos.dur, repeat: Infinity, delay: i * 0.3 }}
            >
              {decorEmoji}
            </motion.div>
          ))}

          {/* Sparkle particles on open */}
          <AnimatePresence>
            {(phase === "opening" || phase === "card-rise") && sparklePositions.map((sp, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute pointer-events-none"
                style={{ left: sp.left, top: sp.top }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [-20, -80] }}
                exit={{ opacity: 0 }}
                transition={{ duration: sp.dur, delay: sp.delay * 0.5 }}
              >
                <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* === MAIN ENVELOPE CONTAINER === */}
          <div className="relative" style={{ perspective: "1200px" }}>
            {/* THE CARD (behind envelope, rises up) */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-[300px] sm:w-[380px] rounded-2xl shadow-2xl overflow-hidden"
              style={{
                x: "-50%",
                y: "-50%",
                backgroundColor: "rgba(255,255,255,0.97)",
                border: `2px solid ${accentColor}30`,
                boxShadow: `0 25px 60px -15px ${accentColor}40, 0 0 40px ${accentColor}15`,
              }}
              initial={{ y: "-50%", opacity: 0 }}
              animate={
                phase === "card-rise"
                  ? { y: "-130%", opacity: 1, scale: 1 }
                  : phase === "card-full"
                  ? { y: "-50%", opacity: 1, scale: 1.05 }
                  : { y: "-50%", opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 1.2,
                type: "spring",
                stiffness: 80,
                damping: 18,
              }}
            >
              {/* Card inner gold border */}
              <div className="m-3 sm:m-4 p-6 sm:p-8 rounded-xl flex flex-col items-center gap-4"
                style={{ border: `1px solid ${accentColor}25` }}
              >
                {/* Ornament top */}
                <motion.div
                  className="flex items-center gap-2"
                  animate={{ opacity: phase === "card-rise" || phase === "card-full" ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-12 h-[1px]" style={{ backgroundColor: accentColor }} />
                  <span className="text-lg">{decorEmoji}</span>
                  <div className="w-12 h-[1px]" style={{ backgroundColor: accentColor }} />
                </motion.div>

                <motion.p
                  className="font-body text-[10px] tracking-[0.5em] uppercase"
                  style={{ color: `${accentColor}` }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={phase === "card-rise" || phase === "card-full" ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  Trân trọng kính mời
                </motion.p>

                <motion.div
                  animate={phase === "card-rise" || phase === "card-full" ? { scale: [0.8, 1.3, 1], opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Heart className="w-10 h-10" fill={accentColor} style={{ color: accentColor }} />
                </motion.div>

                <motion.h2
                  className="font-display text-3xl sm:text-4xl font-bold text-center leading-tight"
                  style={{ color: "#2d2d2d" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={phase === "card-rise" || phase === "card-full" ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  {groomName}
                  <br />
                  <motion.span
                    className="text-5xl sm:text-6xl font-light"
                    style={{ color: accentColor, fontFamily: "'Great Vibes', cursive" }}
                    animate={phase === "card-full" ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    &
                  </motion.span>
                  <br />
                  {brideName}
                </motion.h2>

                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={phase === "card-rise" || phase === "card-full" ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ delay: 0.9 }}
                >
                  <div className="w-16 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }} />
                  <span style={{ color: accentColor }}>♦</span>
                  <div className="w-16 h-[1px]" style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }} />
                </motion.div>

                <motion.p
                  className="font-body text-xs text-center"
                  style={{ color: "#888" }}
                  initial={{ opacity: 0 }}
                  animate={phase === "card-rise" || phase === "card-full" ? { opacity: 1 } : {}}
                  transition={{ delay: 1.1 }}
                >
                  Nhấn để xem thiệp mời
                </motion.p>

                {/* Ornament bottom */}
                <motion.div
                  className="flex items-center gap-2"
                  animate={{ opacity: phase === "card-rise" || phase === "card-full" ? 1 : 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="w-8 h-[1px]" style={{ backgroundColor: accentColor }} />
                  <span className="text-sm">{decorEmoji}</span>
                  <div className="w-8 h-[1px]" style={{ backgroundColor: accentColor }} />
                </motion.div>
              </div>
            </motion.div>

            {/* === ENVELOPE === */}
            <motion.div
              className="relative cursor-pointer select-none"
              onClick={handleOpen}
              whileHover={phase === "sealed" ? { scale: 1.02, y: -5 } : {}}
              whileTap={phase === "sealed" ? { scale: 0.98 } : {}}
              animate={
                phase === "card-rise" || phase === "card-full"
                  ? { y: 80, opacity: 0, scale: 0.8 }
                  : {}
              }
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Envelope back */}
              <div
                className="relative w-[320px] sm:w-[400px] h-[220px] sm:h-[260px] rounded-b-2xl rounded-t-sm"
                style={{
                  backgroundColor: `${accentColor}22`,
                  boxShadow: `0 20px 50px -10px ${accentColor}30, 0 0 0 1px ${accentColor}15`,
                }}
              >
                {/* Envelope texture pattern */}
                <div className="absolute inset-0 opacity-[0.04] rounded-b-2xl overflow-hidden"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(45deg, ${accentColor} 0px, transparent 1px, transparent 15px),
                      repeating-linear-gradient(-45deg, ${accentColor} 0px, transparent 1px, transparent 15px)
                    `,
                  }}
                />

                {/* Left fold line */}
                <div className="absolute left-0 top-0 bottom-0 w-[45%] opacity-[0.06] rounded-bl-2xl"
                  style={{
                    clipPath: "polygon(0 0, 0 100%, 100% 100%)",
                    backgroundColor: accentColor,
                  }}
                />
                {/* Right fold line */}
                <div className="absolute right-0 top-0 bottom-0 w-[45%] opacity-[0.06] rounded-br-2xl"
                  style={{
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                    backgroundColor: accentColor,
                  }}
                />

                {/* Visible card peek inside envelope */}
                <motion.div
                  className="absolute inset-x-6 top-4 bottom-6 rounded-lg flex flex-col items-center justify-center gap-2"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.85)",
                    border: `1px dashed ${accentColor}25`,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Heart className="w-7 h-7" fill={accentColor} style={{ color: accentColor }} />
                  </motion.div>
                  <p className="font-display text-lg sm:text-xl font-semibold" style={{ color: "#333" }}>
                    {groomName} <span style={{ color: accentColor }}>&</span> {brideName}
                  </p>
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase" style={{ color: accentColor }}>
                    Wedding Invitation
                  </p>
                </motion.div>
              </div>

              {/* Envelope flap (3D flip) */}
              <motion.div
                className="absolute -top-[1px] left-0 right-0 h-[130px] sm:h-[150px]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backgroundColor: `${accentColor}30`,
                  transformOrigin: "top center",
                  backfaceVisibility: "hidden",
                }}
                animate={
                  phase === "opening" || phase === "card-rise" || phase === "card-full"
                    ? { rotateX: -180, opacity: 0 }
                    : { rotateX: 0 }
                }
                transition={{ duration: 0.7, ease: [0.6, 0, 0.2, 1] }}
              >
                {/* Flap inner pattern */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    backgroundImage: `radial-gradient(circle at 50% 0%, ${accentColor} 0%, transparent 70%)`,
                  }}
                />
              </motion.div>

              {/* Wax seal */}
              <AnimatePresence>
                {phase === "sealed" && (
                  <motion.div
                    className="absolute z-20 left-1/2 -translate-x-1/2 flex items-center justify-center"
                    style={{
                      top: "90px",
                      width: 56,
                      height: 56,
                    }}
                    exit={{ scale: 2, opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Seal glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: accentColor, filter: "blur(12px)", opacity: 0.4 }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Seal body */}
                    <motion.div
                      className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, ${accentColor}ee, ${accentColor})`,
                        boxShadow: `0 4px 15px ${accentColor}60, inset 0 1px 2px rgba(255,255,255,0.3)`,
                      }}
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Heart className="w-6 h-6 text-white drop-shadow" fill="white" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Tap hint */}
          {phase === "sealed" && (
            <motion.div
              className="absolute bottom-16 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-2xl">👆</span>
              </motion.div>
              <motion.p
                className="font-body text-sm font-medium"
                style={{ color: accentColor }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Nhấn vào phong bì để mở thiệp
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeIntro;
