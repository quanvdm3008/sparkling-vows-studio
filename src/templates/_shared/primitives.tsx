import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

/* ─── Tilt3D: mouse-follow parallax tilt ─────────────────────────────── */
export const Tilt3D = ({
  children,
  className = "",
  max = 12,
  style,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  style?: CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transformStyle: "preserve-3d", perspective: 1000, rotateX: rx, rotateY: ry, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Reveal: scroll-in animation wrapper ────────────────────────────── */
export const Reveal = ({
  children,
  delay = 0,
  y = 30,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Floating decorative particles ──────────────────────────────────── */
export const FloatingDecor = ({
  emojis,
  count = 24,
  size = 18,
}: {
  emojis: string[];
  count?: number;
  size?: number;
}) => {
  const items = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 14 + Math.random() * 10,
    emoji: emojis[i % emojis.length],
    scale: 0.6 + Math.random() * 0.9,
  }));
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {items.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: "-10%", x: 0, opacity: 0 }}
          animate={{ y: "110vh", x: [0, 40, -40, 0], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", left: `${p.left}%`, fontSize: size * p.scale }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
};

/* ─── Countdown hook ─────────────────────────────────────────────────── */
export const useCountdown = (target: string) => {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const d = new Date(target).getTime() - Date.now();
      if (d <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setT({
        days: Math.floor(d / 864e5),
        hours: Math.floor((d / 36e5) % 24),
        minutes: Math.floor((d / 6e4) % 60),
        seconds: Math.floor((d / 1e3) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
};

/* ─── Font loader (per-template Google Fonts) ────────────────────────── */
export const useGoogleFonts = (families: string[]) => {
  useEffect(() => {
    const id = `gf-${families.join("-").replace(/\s+/g, "-")}`;
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${families
      .map((f) => `family=${encodeURIComponent(f)}:wght@300;400;500;600;700`)
      .join("&")}&display=swap`;
    document.head.appendChild(link);
  }, [families]);
};

/* ─── Sparkle field ──────────────────────────────────────────────────── */
export const SparkleField = ({ color = "#fff", count = 40 }: { color?: string; count?: number }) => {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 3,
    delay: Math.random() * 4,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
          transition={{ duration: 2 + Math.random() * 2, delay: d.delay, repeat: Infinity }}
          style={{
            position: "absolute",
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            borderRadius: 999,
            background: color,
            boxShadow: `0 0 ${d.size * 4}px ${color}`,
          }}
        />
      ))}
    </div>
  );
};

/* ─── Common props shape used across templates ───────────────────────── */
export interface TemplateProps {
  groomName: string;
  brideName: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  message: string;
  accentColor: string;
}

/* ─── Format date VN ─────────────────────────────────────────────────── */
export const formatVN = (date: string) =>
  date && new Date(date).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

/* ─── Re-export motion helpers ───────────────────────────────────────── */
export { motion };
export type { MotionValue };
