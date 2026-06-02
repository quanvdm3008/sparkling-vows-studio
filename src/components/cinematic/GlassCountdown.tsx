import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarHeart } from "lucide-react";

const useCountdown = (targetDate: string) => {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return t;
};

const Tile = ({ value, label, accentColor }: { value: number; label: string; accentColor: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -6 }}
    transition={{ duration: 0.6 }}
    className="relative group"
  >
    <div
      className="absolute -inset-2 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity"
      style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }}
    />
    <div
      className="relative w-[88px] sm:w-[120px] md:w-[140px] aspect-[3/4] rounded-3xl border overflow-hidden backdrop-blur-2xl flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))",
        borderColor: "rgba(255,255,255,0.25)",
        boxShadow: `0 20px 60px -20px ${accentColor}55, inset 0 1px 0 rgba(255,255,255,0.4)`,
      }}
    >
      {/* shimmer */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(120deg, transparent 30%, ${accentColor}33 50%, transparent 70%)`,
        }}
      />
      <span
        className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-none tabular-nums"
        style={{ color: accentColor, textShadow: `0 4px 24px ${accentColor}55` }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 text-[10px] sm:text-xs tracking-[0.35em] uppercase font-body text-foreground/70">
        {label}
      </span>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px" style={{ background: accentColor }} />
    </div>
  </motion.div>
);

const GlassCountdown = ({ date, accentColor }: { date: string; accentColor: string }) => {
  const t = useCountdown(date);
  return (
    <section id="countdown" className="relative py-24 sm:py-32 px-4 overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(ellipse at center, ${accentColor}1A, transparent 70%)`,
        }}
      />
      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-xl border mb-6"
          style={{
            background: "rgba(255,255,255,0.15)",
            borderColor: `${accentColor}55`,
          }}
        >
          <CalendarHeart className="w-4 h-4" style={{ color: accentColor }} />
          <span className="text-[11px] tracking-[0.35em] uppercase font-body font-semibold">Save the Date</span>
        </motion.div>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium mb-3 text-foreground">
          Đếm ngược ngày <span className="italic" style={{ color: accentColor }}>trọng đại</span>
        </h2>
        <p className="text-muted-foreground font-body mb-12 text-sm sm:text-base">
          Khoảnh khắc hai trái tim hòa thành một
        </p>
        <div className="flex justify-center gap-3 sm:gap-5 flex-wrap">
          <Tile value={t.days} label="Ngày" accentColor={accentColor} />
          <Tile value={t.hours} label="Giờ" accentColor={accentColor} />
          <Tile value={t.minutes} label="Phút" accentColor={accentColor} />
          <Tile value={t.seconds} label="Giây" accentColor={accentColor} />
        </div>
      </div>
    </section>
  );
};

export default GlassCountdown;
