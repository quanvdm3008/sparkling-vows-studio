import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Mail } from "lucide-react";

interface EnvelopeIntroProps {
  groomName: string;
  brideName: string;
  accentColor: string;
  decorEmoji: string;
  onComplete: () => void;
}

const EnvelopeIntro = ({ groomName, brideName, accentColor, decorEmoji, onComplete }: EnvelopeIntroProps) => {
  const [phase, setPhase] = useState<"sealed" | "opening" | "card-rise" | "card-full" | "done">("sealed");

  const floatingPositions = useMemo(() =>
    [...Array(16)].map(() => ({
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      dur: 3 + Math.random() * 4,
      size: 12 + Math.random() * 20,
    })), []
  );

  const sparklePositions = useMemo(() =>
    [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 1.5,
      dur: 1 + Math.random() * 2,
    })), []
  );

  const confettiPieces = useMemo(() =>
    [...Array(40)].map(() => ({
      left: `${20 + Math.random() * 60}%`,
      delay: Math.random() * 0.8,
      dur: 1.5 + Math.random() * 2,
      rotate: Math.random() * 720 - 360,
      xDrift: (Math.random() - 0.5) * 200,
    })), []
  );

  const handleOpen = () => {
    if (phase !== "sealed") return;
    setPhase("opening");
    setTimeout(() => setPhase("card-rise"), 900);
    setTimeout(() => setPhase("card-full"), 2400);
    setTimeout(() => setPhase("done"), 3800);
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${accentColor}18 0%, rgba(15,10,5,0.92) 70%, rgba(5,0,0,0.97) 100%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          transition={{ duration: 0.8 }}
        >
          {/* Ambient light rays */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg at 50% 45%, transparent 0deg, ${accentColor}06 60deg, transparent 120deg, ${accentColor}04 180deg, transparent 240deg, ${accentColor}06 300deg, transparent 360deg)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          {/* Soft vignette overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)`,
          }} />

          {/* Floating emoji decorations */}
          {floatingPositions.map((pos, i) => (
            <motion.div
              key={`float-${i}`}
              className="absolute pointer-events-none select-none"
              style={{ left: pos.left, top: pos.top, fontSize: pos.size }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.5, 0.2, 0.5, 0],
                scale: [0.5, 1, 0.8, 1, 0.5],
                y: [0, -40, -15, -50, 0],
                rotate: [0, 20, -15, 10, 0],
              }}
              transition={{ duration: pos.dur, repeat: Infinity, delay: i * 0.25 }}
            >
              {decorEmoji}
            </motion.div>
          ))}

          {/* Sparkle burst on open */}
          <AnimatePresence>
            {(phase === "opening" || phase === "card-rise") && sparklePositions.map((sp, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute pointer-events-none"
                style={{ left: sp.left, top: sp.top }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.8, 0],
                  scale: [0, 1.8, 1, 0],
                  y: [-10, -100],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: sp.dur, delay: sp.delay * 0.4 }}
              >
                <Sparkles className="w-3 h-3" style={{ color: accentColor, filter: `drop-shadow(0 0 4px ${accentColor})` }} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Confetti on card reveal */}
          <AnimatePresence>
            {(phase === "card-rise" || phase === "card-full") && confettiPieces.map((cp, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute pointer-events-none"
                style={{
                  left: cp.left,
                  top: "45%",
                  width: 6 + Math.random() * 6,
                  height: 6 + Math.random() * 6,
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                  backgroundColor: i % 3 === 0 ? accentColor : i % 3 === 1 ? `${accentColor}88` : "#FFD700",
                }}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.5, 1, 0.5],
                  y: [0, -150 - Math.random() * 100, -80, 200],
                  x: [0, cp.xDrift * 0.5, cp.xDrift],
                  rotate: [0, cp.rotate],
                }}
                transition={{ duration: cp.dur, delay: cp.delay, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>

          {/* === MAIN ENVELOPE CONTAINER === */}
          <div className="relative" style={{ perspective: "1400px" }}>

            {/* THE CARD (behind envelope, rises up) */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-[300px] sm:w-[380px] rounded-3xl overflow-hidden"
              style={{
                x: "-50%",
                y: "-50%",
                background: `linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(255,250,245,0.96) 100%)`,
                boxShadow: `0 30px 80px -20px ${accentColor}50, 0 0 60px ${accentColor}15, 0 0 0 1px ${accentColor}20`,
              }}
              initial={{ y: "-50%", opacity: 0 }}
              animate={
                phase === "card-rise"
                  ? { y: "-140%", opacity: 1, scale: 1 }
                  : phase === "card-full"
                  ? { y: "-50%", opacity: 1, scale: 1.08 }
                  : { y: "-50%", opacity: 0, scale: 0.85 }
              }
              transition={{
                duration: 1.4,
                type: "spring",
                stiffness: 70,
                damping: 16,
              }}
            >
              {/* Card decorative border */}
              <div className="m-3 sm:m-4 rounded-2xl overflow-hidden"
                style={{
                  border: `1.5px solid ${accentColor}20`,
                  background: `linear-gradient(180deg, ${accentColor}05 0%, transparent 40%)`,
                }}
              >
                {/* Top ornamental pattern */}
                <div className="flex justify-center pt-6 pb-2">
                  <motion.div
                    className="flex items-center gap-3"
                    animate={{ opacity: phase === "card-rise" || phase === "card-full" ? 1 : 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="h-[1px] w-10 sm:w-14" style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }} />
                    <span className="text-lg">{decorEmoji}</span>
                    <div className="h-[1px] w-10 sm:w-14" style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }} />
                  </motion.div>
                </div>

                <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex flex-col items-center gap-3">
                  <motion.p
                    className="font-body text-[9px] tracking-[0.6em] uppercase"
                    style={{ color: accentColor }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={phase === "card-rise" || phase === "card-full" ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    Trân trọng kính mời
                  </motion.p>

                  <motion.div
                    animate={phase === "card-rise" || phase === "card-full" ? { scale: [0.5, 1.4, 1], opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6, duration: 0.9, type: "spring" }}
                  >
                    <Heart className="w-10 h-10" fill={accentColor} style={{ color: accentColor, filter: `drop-shadow(0 2px 8px ${accentColor}60)` }} />
                  </motion.div>

                  <motion.h2
                    className="font-display text-3xl sm:text-4xl font-bold text-center leading-tight"
                    style={{ color: "#1a1a1a" }}
                    initial={{ opacity: 0, y: 25 }}
                    animate={phase === "card-rise" || phase === "card-full" ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.7 }}
                  >
                    {groomName}
                    <br />
                    <motion.span
                      className="inline-block text-5xl sm:text-6xl font-light my-1"
                      style={{ color: accentColor, fontFamily: "'Great Vibes', cursive", filter: `drop-shadow(0 2px 6px ${accentColor}40)` }}
                      animate={phase === "card-full" ? { scale: [1, 1.12, 1], rotate: [0, 3, -3, 0] } : {}}
                      transition={{ duration: 3, repeat: Infinity }}
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
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <div className="w-14 sm:w-20 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }} />
                    <motion.span
                      style={{ color: accentColor, fontSize: 10 }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      ✦
                    </motion.span>
                    <div className="w-14 sm:w-20 h-[1px]" style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }} />
                  </motion.div>

                  <motion.p
                    className="font-body text-xs text-center mt-2"
                    style={{ color: "#999" }}
                    initial={{ opacity: 0 }}
                    animate={phase === "card-rise" || phase === "card-full" ? { opacity: [0, 1, 0.6, 1] } : {}}
                    transition={{ delay: 1.1, duration: 1.5, repeat: Infinity }}
                  >
                    Nhấn để xem thiệp mời ✨
                  </motion.p>

                  {/* Bottom ornament */}
                  <motion.div
                    className="flex items-center gap-2 mt-1"
                    animate={{ opacity: phase === "card-rise" || phase === "card-full" ? 1 : 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="w-6 h-[1px]" style={{ backgroundColor: `${accentColor}40` }} />
                    <span className="text-xs">{decorEmoji}</span>
                    <div className="w-6 h-[1px]" style={{ backgroundColor: `${accentColor}40` }} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* === ENVELOPE === */}
            <motion.div
              className="relative cursor-pointer select-none"
              onClick={handleOpen}
              whileHover={phase === "sealed" ? { scale: 1.03, y: -8 } : {}}
              whileTap={phase === "sealed" ? { scale: 0.97 } : {}}
              animate={
                phase === "card-rise" || phase === "card-full"
                  ? { y: 100, opacity: 0, scale: 0.7 }
                  : {}
              }
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              {/* Envelope glow */}
              {phase === "sealed" && (
                <motion.div
                  className="absolute -inset-8 rounded-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${accentColor}15 0%, transparent 70%)`,
                  }}
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}

              {/* Envelope body */}
              <div
                className="relative w-[320px] sm:w-[400px] h-[220px] sm:h-[260px] rounded-b-3xl rounded-t-sm overflow-hidden"
                style={{
                  background: `linear-gradient(160deg, ${accentColor}28 0%, ${accentColor}15 40%, ${accentColor}22 100%)`,
                  boxShadow: `0 25px 60px -15px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}20, inset 0 1px 0 ${accentColor}15`,
                }}
              >
                {/* Envelope linen texture */}
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(45deg, ${accentColor} 0px, transparent 1px, transparent 12px),
                      repeating-linear-gradient(-45deg, ${accentColor} 0px, transparent 1px, transparent 12px)
                    `,
                  }}
                />

                {/* Inner edge highlights */}
                <div className="absolute inset-0">
                  <div className="absolute left-0 top-0 bottom-0 w-[45%] opacity-[0.05]"
                    style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)", backgroundColor: accentColor }}
                  />
                  <div className="absolute right-0 top-0 bottom-0 w-[45%] opacity-[0.05]"
                    style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)", backgroundColor: accentColor }}
                  />
                </div>

                {/* Card peek inside envelope */}
                <motion.div
                  className="absolute inset-x-5 top-3 bottom-5 rounded-xl flex flex-col items-center justify-center gap-3"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: `1px dashed ${accentColor}20`,
                    boxShadow: `inset 0 0 20px ${accentColor}08`,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Heart className="w-8 h-8" fill={accentColor} style={{ color: accentColor, filter: `drop-shadow(0 2px 4px ${accentColor}40)` }} />
                  </motion.div>
                  <p className="font-display text-lg sm:text-xl font-semibold" style={{ color: "#2a2a2a" }}>
                    {groomName} <span style={{ color: accentColor }}>&</span> {brideName}
                  </p>
                  <p className="font-body text-[9px] tracking-[0.4em] uppercase" style={{ color: accentColor }}>
                    Wedding Invitation
                  </p>
                </motion.div>
              </div>

              {/* Envelope flap (3D flip) */}
              <motion.div
                className="absolute -top-[1px] left-0 right-0 h-[130px] sm:h-[150px]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: `linear-gradient(180deg, ${accentColor}35 0%, ${accentColor}20 100%)`,
                  transformOrigin: "top center",
                  backfaceVisibility: "hidden",
                }}
                animate={
                  phase === "opening" || phase === "card-rise" || phase === "card-full"
                    ? { rotateX: -180, opacity: 0 }
                    : { rotateX: 0 }
                }
                transition={{ duration: 0.8, ease: [0.6, 0, 0.2, 1] }}
              >
                <div className="absolute inset-0 opacity-15"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: `radial-gradient(circle at 50% 0%, ${accentColor} 0%, transparent 70%)`,
                  }}
                />
              </motion.div>

              {/* Wax seal */}
              <AnimatePresence>
                {phase === "sealed" && (
                  <motion.div
                    className="absolute z-20 left-1/2 -translate-x-1/2 flex items-center justify-center"
                    style={{ top: "85px", width: 64, height: 64 }}
                    exit={{ scale: 3, opacity: 0, rotate: 270 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {/* Seal outer glow */}
                    <motion.div
                      className="absolute -inset-3 rounded-full"
                      style={{ backgroundColor: accentColor, filter: "blur(16px)", opacity: 0.3 }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Seal ring */}
                    <motion.div
                      className="absolute -inset-1 rounded-full"
                      style={{
                        border: `2px solid ${accentColor}40`,
                        boxShadow: `0 0 15px ${accentColor}30`,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Seal body */}
                    <motion.div
                      className="relative w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle at 35% 30%, ${accentColor}dd, ${accentColor}),
                                     radial-gradient(circle at 65% 70%, ${accentColor}bb, ${accentColor})`,
                        boxShadow: `0 6px 20px ${accentColor}70, inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.15)`,
                      }}
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Mail className="w-6 h-6 text-white drop-shadow" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Tap hint */}
          {phase === "sealed" && (
            <motion.div
              className="absolute bottom-12 sm:bottom-16 flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-3xl drop-shadow-lg">👆</span>
              </motion.div>
              <motion.p
                className="font-body text-sm font-medium tracking-wide"
                style={{ color: `${accentColor}cc` }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Nhấn vào phong bì để mở thiệp
              </motion.p>
              <motion.div
                className="flex gap-1 mt-1"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeIntro;
