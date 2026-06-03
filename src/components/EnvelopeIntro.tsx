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

type Phase = "sealed" | "opening" | "card-rise" | "card-full" | "done";

const EnvelopeIntro = ({ groomName, brideName, accentColor, decorEmoji, onComplete }: EnvelopeIntroProps) => {
  const [phase, setPhase] = useState<Phase>("sealed");

  // Pre-computed positions
  const floatingEmojis = useMemo(() =>
    [...Array(14)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      dur: 6 + Math.random() * 6,
      delay: Math.random() * 4,
      size: 10 + Math.random() * 18,
    })), []
  );

  const goldenDust = useMemo(() =>
    [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2.5,
      dur: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    })), []
  );

  const sparkles = useMemo(() =>
    [...Array(36)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 1.2,
      dur: 1 + Math.random() * 1.8,
      size: 8 + Math.random() * 10,
    })), []
  );

  const confettiPieces = useMemo(() =>
    [...Array(50)].map(() => ({
      left: `${15 + Math.random() * 70}%`,
      delay: Math.random() * 0.9,
      dur: 1.8 + Math.random() * 2.2,
      rotate: Math.random() * 720 - 360,
      xDrift: (Math.random() - 0.5) * 280,
      w: 4 + Math.random() * 6,
      h: 6 + Math.random() * 10,
    })), []
  );

  const lightBeams = useMemo(() =>
    [...Array(6)].map((_, i) => ({
      angle: i * 60 + Math.random() * 20,
      delay: Math.random() * 0.5,
    })), []
  );

  const handleOpen = () => {
    if (phase !== "sealed") return;
    setPhase("opening");
    setTimeout(() => setPhase("card-rise"), 950);
    setTimeout(() => setPhase("card-full"), 2500);
    setTimeout(() => setPhase("done"), 4200);
  };

  const cardOpen = phase === "card-rise" || phase === "card-full";

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 50% 38%, ${accentColor}22 0%, rgba(20,12,8,0.95) 65%, rgba(5,2,2,0.98) 100%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          transition={{ duration: 0.8 }}
        >
          {/* ── Layer 1: Rotating conic light ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg at 50% 45%, transparent 0deg, ${accentColor}08 50deg, transparent 110deg, ${accentColor}05 180deg, transparent 240deg, ${accentColor}08 300deg, transparent 360deg)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          {/* ── Layer 2: Golden dust drifting up ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {goldenDust.map((d, i) => (
              <motion.div
                key={`dust-${i}`}
                className="absolute rounded-full"
                style={{
                  left: d.left,
                  top: d.top,
                  width: d.size,
                  height: d.size,
                  backgroundColor: accentColor,
                  boxShadow: `0 0 ${d.size * 3}px ${accentColor}`,
                }}
                animate={{
                  y: [0, -120, -240],
                  opacity: [0, 0.9, 0],
                  scale: [0.5, 1.2, 0.3],
                }}
                transition={{
                  duration: d.dur,
                  repeat: Infinity,
                  delay: d.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* ── Layer 3: Soft vignette ── */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(circle at 50% 50%, transparent 35%, rgba(0,0,0,0.5) 100%)`,
          }} />

          {/* ── Layer 4: Light beams burst on open ── */}
          <AnimatePresence>
            {phase !== "sealed" && lightBeams.map((b, i) => (
              <motion.div
                key={`beam-${i}`}
                className="absolute top-1/2 left-1/2 origin-left pointer-events-none"
                style={{
                  width: "60vmax",
                  height: 2,
                  background: `linear-gradient(to right, ${accentColor}80, transparent)`,
                  transform: `rotate(${b.angle}deg)`,
                  filter: `blur(1px)`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: [0, 1, 0.8], opacity: [0, 0.7, 0] }}
                transition={{ duration: 2.4, delay: b.delay, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>

          {/* ── Layer 5: Floating decorative emojis ── */}
          {floatingEmojis.map((pos, i) => (
            <motion.div
              key={`float-${i}`}
              className="absolute pointer-events-none select-none"
              style={{ left: pos.left, top: pos.top, fontSize: pos.size, opacity: 0.4 }}
              animate={{
                y: [0, -50, -10, -60, 0],
                rotate: [0, 25, -15, 15, 0],
                opacity: [0.2, 0.5, 0.3, 0.5, 0.2],
              }}
              transition={{ duration: pos.dur, repeat: Infinity, delay: pos.delay }}
            >
              {decorEmoji}
            </motion.div>
          ))}

          {/* ── Layer 6: Sparkle burst ── */}
          <AnimatePresence>
            {(phase === "opening" || phase === "card-rise") && sparkles.map((sp, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute pointer-events-none"
                style={{ left: sp.left, top: sp.top }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 0.8, 0],
                  scale: [0, 1.6, 1, 0],
                  rotate: [0, 180],
                  y: [-10, -80],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: sp.dur, delay: sp.delay * 0.3 }}
              >
                <Sparkles style={{ width: sp.size, height: sp.size, color: accentColor, filter: `drop-shadow(0 0 6px ${accentColor})` }} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ── Layer 7: Confetti ── */}
          <AnimatePresence>
            {cardOpen && confettiPieces.map((cp, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute pointer-events-none"
                style={{
                  left: cp.left,
                  top: "45%",
                  width: cp.w,
                  height: cp.h,
                  borderRadius: i % 4 === 0 ? "50%" : "2px",
                  backgroundColor: i % 3 === 0 ? accentColor : i % 3 === 1 ? `${accentColor}99` : "#FFD89B",
                  boxShadow: `0 0 8px ${accentColor}60`,
                }}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.4, 1, 0.4],
                  y: [0, -180 - Math.random() * 120, -60, 240],
                  x: [0, cp.xDrift * 0.4, cp.xDrift],
                  rotate: [0, cp.rotate],
                }}
                transition={{ duration: cp.dur, delay: cp.delay, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>

          {/* ═════════ MAIN ENVELOPE STAGE ═════════ */}
          <div className="relative" style={{ perspective: "1600px" }}>

            {/* THE CARD (behind envelope, rises up) */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-[300px] sm:w-[380px] rounded-3xl overflow-hidden"
              style={{
                x: "-50%",
                y: "-50%",
                background: `linear-gradient(145deg, rgba(255,255,255,0.99) 0%, rgba(255,250,245,0.97) 100%)`,
                boxShadow: `0 40px 100px -20px ${accentColor}60, 0 0 80px ${accentColor}25, 0 0 0 1px ${accentColor}30, inset 0 1px 0 rgba(255,255,255,0.9)`,
              }}
              initial={{ y: "-50%", opacity: 0 }}
              animate={
                phase === "card-rise"
                  ? { y: "-150%", opacity: 1, scale: 1 }
                  : phase === "card-full"
                  ? { y: "-50%", opacity: 1, scale: 1.1 }
                  : { y: "-50%", opacity: 0, scale: 0.85 }
              }
              transition={{ duration: 1.5, type: "spring", stiffness: 65, damping: 15 }}
            >
              {/* Card glass shine sweep */}
              {cardOpen && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)`,
                  }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.6, delay: 0.8, ease: "easeInOut" }}
                />
              )}

              <div className="m-3 sm:m-4 rounded-2xl overflow-hidden relative"
                style={{
                  border: `1.5px solid ${accentColor}25`,
                  background: `linear-gradient(180deg, ${accentColor}07 0%, transparent 40%)`,
                }}
              >
                {/* Top ornament */}
                <div className="flex justify-center pt-6 pb-2">
                  <motion.div
                    className="flex items-center gap-3"
                    animate={{ opacity: cardOpen ? 1 : 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="h-[1px] w-10 sm:w-14" style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }} />
                    <motion.span
                      className="text-lg"
                      animate={cardOpen ? { rotate: [0, 360] } : {}}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    >
                      {decorEmoji}
                    </motion.span>
                    <div className="h-[1px] w-10 sm:w-14" style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }} />
                  </motion.div>
                </div>

                <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex flex-col items-center gap-3">
                  <motion.p
                    className="font-body text-[9px] tracking-[0.6em] uppercase"
                    style={{ color: accentColor }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={cardOpen ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    Trân trọng kính mời
                  </motion.p>

                  <motion.div
                    animate={cardOpen ? { scale: [0.5, 1.5, 1], opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6, duration: 1, type: "spring" }}
                  >
                    <Heart className="w-10 h-10" fill={accentColor} style={{ color: accentColor, filter: `drop-shadow(0 2px 12px ${accentColor}80)` }} />
                  </motion.div>

                  <motion.h2
                    className="font-display text-3xl sm:text-4xl font-bold text-center leading-tight"
                    style={{ color: "#1a1a1a" }}
                    initial={{ opacity: 0, y: 25 }}
                    animate={cardOpen ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.7 }}
                  >
                    {groomName}
                    <br />
                    <motion.span
                      className="inline-block text-5xl sm:text-6xl font-light my-1"
                      style={{ color: accentColor, fontFamily: "'Great Vibes', cursive", filter: `drop-shadow(0 2px 10px ${accentColor}60)` }}
                      animate={phase === "card-full" ? { scale: [1, 1.15, 1], rotate: [0, 4, -4, 0] } : {}}
                      transition={{ duration: 3.5, repeat: Infinity }}
                    >
                      &
                    </motion.span>
                    <br />
                    {brideName}
                  </motion.h2>

                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={cardOpen ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    <div className="w-14 sm:w-20 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }} />
                    <motion.span
                      style={{ color: accentColor, fontSize: 11 }}
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
                    animate={cardOpen ? { opacity: [0, 1, 0.6, 1] } : {}}
                    transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
                  >
                    Nhấn để xem thiệp mời ✨
                  </motion.p>

                  <motion.div
                    className="flex items-center gap-2 mt-1"
                    animate={{ opacity: cardOpen ? 1 : 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="w-6 h-[1px]" style={{ backgroundColor: `${accentColor}40` }} />
                    <span className="text-xs">{decorEmoji}</span>
                    <div className="w-6 h-[1px]" style={{ backgroundColor: `${accentColor}40` }} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ═══ ENVELOPE ═══ */}
            <motion.div
              className="relative cursor-pointer select-none"
              onClick={handleOpen}
              whileHover={phase === "sealed" ? { scale: 1.04, y: -10 } : {}}
              whileTap={phase === "sealed" ? { scale: 0.96 } : {}}
              animate={
                cardOpen
                  ? { y: 120, opacity: 0, scale: 0.65, rotateZ: -3 }
                  : {}
              }
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {/* Envelope ambient glow */}
              {phase === "sealed" && (
                <>
                  <motion.div
                    className="absolute -inset-12 rounded-3xl pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 50%, ${accentColor}25 0%, transparent 70%)` }}
                    animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.95, 1.08, 0.95] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -inset-6 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 30%, ${accentColor}18 0%, transparent 70%)` }}
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </>
              )}

              {/* Envelope body */}
              <div
                className="relative w-[320px] sm:w-[400px] h-[220px] sm:h-[260px] rounded-b-3xl rounded-t-sm overflow-hidden"
                style={{
                  background: `linear-gradient(160deg, ${accentColor}35 0%, ${accentColor}18 40%, ${accentColor}28 100%)`,
                  boxShadow: `0 30px 70px -15px rgba(0,0,0,0.6), 0 0 0 1px ${accentColor}30, inset 0 1px 0 ${accentColor}25, inset 0 -2px 8px rgba(0,0,0,0.15)`,
                }}
              >
                {/* Linen texture */}
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(45deg, ${accentColor} 0px, transparent 1px, transparent 12px),
                      repeating-linear-gradient(-45deg, ${accentColor} 0px, transparent 1px, transparent 12px)
                    `,
                  }}
                />

                {/* Shimmer on sealed */}
                {phase === "sealed" && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(105deg, transparent 40%, ${accentColor}40 50%, transparent 60%)`,
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                  />
                )}

                {/* Inner edge */}
                <div className="absolute inset-0">
                  <div className="absolute left-0 top-0 bottom-0 w-[45%] opacity-[0.07]"
                    style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)", backgroundColor: accentColor }}
                  />
                  <div className="absolute right-0 top-0 bottom-0 w-[45%] opacity-[0.07]"
                    style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)", backgroundColor: accentColor }}
                  />
                </div>

                {/* Card peek inside */}
                <motion.div
                  className="absolute inset-x-5 top-3 bottom-5 rounded-xl flex flex-col items-center justify-center gap-3"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.92)",
                    border: `1px dashed ${accentColor}25`,
                    boxShadow: `inset 0 0 24px ${accentColor}10`,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Heart className="w-8 h-8" fill={accentColor} style={{ color: accentColor, filter: `drop-shadow(0 2px 6px ${accentColor}50)` }} />
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
                  background: `linear-gradient(180deg, ${accentColor}45 0%, ${accentColor}25 100%)`,
                  transformOrigin: "top center",
                  backfaceVisibility: "hidden",
                  boxShadow: `inset 0 -8px 16px rgba(0,0,0,0.1)`,
                }}
                animate={
                  phase === "opening" || cardOpen
                    ? { rotateX: -180, opacity: 0 }
                    : { rotateX: 0 }
                }
                transition={{ duration: 0.85, ease: [0.6, 0, 0.2, 1] }}
              >
                <div className="absolute inset-0 opacity-20"
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
                    style={{ top: "85px", width: 68, height: 68 }}
                    exit={{ scale: 3.5, opacity: 0, rotate: 360 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    {/* Outer pulse glow */}
                    <motion.div
                      className="absolute -inset-4 rounded-full"
                      style={{ backgroundColor: accentColor, filter: "blur(20px)", opacity: 0.4 }}
                      animate={{ scale: [1, 1.6, 1], opacity: [0.25, 0.6, 0.25] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Rotating ornament ring */}
                    <motion.div
                      className="absolute -inset-2 rounded-full"
                      style={{
                        border: `2px dashed ${accentColor}60`,
                        boxShadow: `0 0 18px ${accentColor}40`,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Inner ring */}
                    <motion.div
                      className="absolute -inset-0.5 rounded-full"
                      style={{ border: `1px solid ${accentColor}80` }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Seal body */}
                    <motion.div
                      className="relative w-[68px] h-[68px] rounded-full flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle at 35% 30%, ${accentColor}ee, ${accentColor}),
                                     radial-gradient(circle at 65% 70%, ${accentColor}cc, ${accentColor})`,
                        boxShadow: `0 8px 24px ${accentColor}80, inset 0 2px 6px rgba(255,255,255,0.3), inset 0 -3px 6px rgba(0,0,0,0.2)`,
                      }}
                      animate={{ scale: [1, 1.07, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    >
                      <Mail className="w-6 h-6 text-white drop-shadow-lg" />
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
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-3xl drop-shadow-lg">👆</span>
              </motion.div>
              <motion.p
                className="font-body text-sm font-medium tracking-wide"
                style={{ color: `${accentColor}dd` }}
                animate={{ opacity: [0.5, 1, 0.5], textShadow: [`0 0 8px ${accentColor}40`, `0 0 16px ${accentColor}80`, `0 0 8px ${accentColor}40`] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Nhấn vào phong bì để mở thiệp
              </motion.p>
              <motion.div
                className="flex gap-1.5 mt-1"
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
                    animate={{ scale: [1, 1.6, 1] }}
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
