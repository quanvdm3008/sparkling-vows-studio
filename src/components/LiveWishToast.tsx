import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const MAX_VISIBLE = 6;
const DISPLAY_DURATION = 6000;

const LiveWishToast = ({ accentColor }: LiveWishToastProps) => {
  const [messages, setMessages] = useState<(LiveWish & { addedAt: number })[]>([]);

  const onWish = useCallback((wish: LiveWish) => {
    setMessages((prev) => {
      const next = [...prev, { ...wish, addedAt: Date.now() }];
      return next.slice(-MAX_VISIBLE);
    });
  }, []);

  useEffect(() => {
    listeners.add(onWish);
    return () => { listeners.delete(onWish); };
  }, [onWish]);

  // Auto-remove old messages
  useEffect(() => {
    if (messages.length === 0) return;
    const timer = setInterval(() => {
      const now = Date.now();
      setMessages((prev) => prev.filter((m) => now - m.addedAt < DISPLAY_DURATION));
    }, 500);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="fixed bottom-24 left-4 z-[60] pointer-events-none w-72 flex flex-col-reverse gap-2">
      <AnimatePresence>
        {messages.map((msg, i) => {
          const age = Date.now() - msg.addedAt;
          const fadeRatio = Math.max(0, 1 - age / DISPLAY_DURATION);
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -80, scale: 0.8 }}
              animate={{ opacity: fadeRatio * (0.5 + 0.5 * (i / Math.max(messages.length - 1, 1))), x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto"
            >
              <div
                className="rounded-2xl px-3 py-2 backdrop-blur-md flex items-center gap-2"
                style={{
                  background: `linear-gradient(135deg, rgba(0,0,0,0.45), rgba(0,0,0,0.3))`,
                }}
              >
                <span className="text-base flex-shrink-0">{msg.emoji}</span>
                <div className="min-w-0 flex-1">
                  <span className="font-body text-xs font-bold text-white/90 mr-1.5">{msg.name}</span>
                  <span className="font-body text-xs text-white/70 line-clamp-1">{msg.message}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default LiveWishToast;
