import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, PartyPopper } from "lucide-react";

export interface LiveWish {
  id: number;
  name: string;
  message: string;
  emoji: string;
}

interface LiveWishToastProps {
  accentColor: string;
}

// Global event emitter for wishes
type WishListener = (wish: LiveWish) => void;
const listeners: Set<WishListener> = new Set();

export const emitWish = (wish: LiveWish) => {
  listeners.forEach((fn) => fn(wish));
};

const LiveWishToast = ({ accentColor }: LiveWishToastProps) => {
  const [queue, setQueue] = useState<LiveWish[]>([]);
  const [current, setCurrent] = useState<LiveWish | null>(null);

  const onWish = useCallback((wish: LiveWish) => {
    setQueue((q) => [...q, wish]);
  }, []);

  useEffect(() => {
    listeners.add(onWish);
    return () => { listeners.delete(onWish); };
  }, [onWish]);

  // Process queue
  useEffect(() => {
    if (current || queue.length === 0) return;
    const [next, ...rest] = queue;
    setCurrent(next);
    setQueue(rest);
    const timer = setTimeout(() => setCurrent(null), 4000);
    return () => clearTimeout(timer);
  }, [current, queue]);

  return (
    <div className="fixed top-20 right-4 z-[60] pointer-events-none max-w-xs w-full">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 120, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 120, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="pointer-events-auto"
          >
            <div
              className="rounded-2xl p-4 shadow-2xl border border-white/20 backdrop-blur-xl flex items-start gap-3 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                borderColor: `${accentColor}40`,
              }}
            >
              {/* Animated background shimmer */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              {/* Live dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="relative">
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${accentColor}30` }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {current.emoji}
                  </motion.div>
                  {/* Live indicator */}
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#22c55e" }}
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <PartyPopper className="w-3.5 h-3.5" style={{ color: accentColor }} />
                  <span className="font-body text-xs font-bold" style={{ color: accentColor }}>
                    Lời chúc mới!
                  </span>
                </div>
                <p className="font-body text-sm font-semibold text-foreground truncate">{current.name}</p>
                <p className="font-body text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-0.5">
                  {current.message}
                </p>
              </div>

              {/* Floating hearts */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xs pointer-events-none"
                  style={{ bottom: "20%", right: `${10 + i * 15}%` }}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -40 - i * 10 }}
                  transition={{ duration: 1.5, delay: 0.3 + i * 0.3 }}
                >
                  <Heart className="w-3 h-3" fill={accentColor} style={{ color: accentColor }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveWishToast;
