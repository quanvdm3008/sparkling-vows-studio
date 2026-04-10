import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Heart, MessageCircleHeart, Sparkles, Send, User, PenLine, ThumbsUp, Star, PartyPopper } from "lucide-react";
import { emitWish } from "@/components/LiveWishToast";

interface Wish {
  id: number;
  name: string;
  message: string;
  emoji: string;
  timestamp: string;
  likes: number;
  liked: boolean;
}

const sampleWishes: Wish[] = [
  { id: 1, name: "Anh Tuấn", message: "Chúc hai bạn trăm năm hạnh phúc! 🎉", emoji: "💕", timestamp: "2 giờ trước", likes: 12, liked: false },
  { id: 2, name: "Chị Mai", message: "Hạnh phúc mãi mãi nhé! Yêu thương hai bạn nhiều!", emoji: "🌸", timestamp: "3 giờ trước", likes: 8, liked: false },
  { id: 3, name: "Bạn Hùng", message: "Trăm năm hạnh phúc, sớm có em bé nha! 😍", emoji: "💒", timestamp: "5 giờ trước", likes: 15, liked: false },
  { id: 4, name: "Cô Lan", message: "Chúc mừng hạnh phúc! Cô rất vui cho hai cháu.", emoji: "🎊", timestamp: "6 giờ trước", likes: 6, liked: false },
  { id: 5, name: "Nhóm bạn thân", message: "Happy Wedding! Mãi bên nhau nha! 🥂", emoji: "🥳", timestamp: "8 giờ trước", likes: 20, liked: false },
  { id: 6, name: "Bác Phương", message: "Chúc hai con luôn yêu thương và thấu hiểu nhau.", emoji: "❤️", timestamp: "10 giờ trước", likes: 9, liked: false },
  { id: 7, name: "Em Linh", message: "Anh chị đẹp đôi quá! Chúc hạnh phúc!", emoji: "💐", timestamp: "12 giờ trước", likes: 4, liked: false },
  { id: 8, name: "Đồng nghiệp", message: "Best wishes for your new journey together! 🌟", emoji: "✨", timestamp: "1 ngày trước", likes: 11, liked: false },
];

const emojiOptions = ["💕", "🌸", "💒", "🎊", "🥳", "❤️", "💐", "✨", "🥂", "💍", "🎉", "🦋"];

const reactionEmojis = ["❤️", "😍", "🥳", "👏", "💐"];

// ─── Floating Hearts Animation ────────────────────
const FloatingHearts = ({ accentColor }: { accentColor: string }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-lg opacity-20"
        style={{ left: `${10 + i * 15}%`, bottom: 0 }}
        animate={{
          y: [0, -400 - Math.random() * 200],
          x: [0, (Math.random() - 0.5) * 80],
          opacity: [0, 0.3, 0],
          rotate: [0, (Math.random() - 0.5) * 60],
        }}
        transition={{
          duration: 6 + Math.random() * 4,
          repeat: Infinity,
          delay: i * 1.5,
          ease: "easeOut",
        }}
      >
        {["💕", "💗", "✨", "🌸", "💖", "🤍"][i]}
      </motion.div>
    ))}
  </div>
);

// ─── Chat Bubble Wish Card ───────────────────────
const WishBubble = ({
  wish,
  index,
  accentColor,
  onLike,
  animStyle,
}: {
  wish: Wish;
  index: number;
  accentColor: string;
  onLike: (id: number) => void;
  animStyle: "slide" | "pop" | "flip" | "wave" | "float";
}) => {
  const isEven = index % 2 === 0;
  const [showReactions, setShowReactions] = useState(false);
  const [particles, setParticles] = useState<{ id: number; emoji: string }[]>([]);

  const variants = {
    slide: {
      initial: { opacity: 0, x: isEven ? -60 : 60, y: 10 },
      animate: { opacity: 1, x: 0, y: 0 },
      transition: { type: "spring", damping: 20, stiffness: 200, delay: index * 0.08 },
    },
    pop: {
      initial: { opacity: 0, scale: 0.3, rotate: -5 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      transition: { type: "spring", damping: 15, stiffness: 300, delay: index * 0.06 },
    },
    flip: {
      initial: { opacity: 0, rotateY: 90, scale: 0.8 },
      animate: { opacity: 1, rotateY: 0, scale: 1 },
      transition: { type: "spring", damping: 18, delay: index * 0.1 },
    },
    wave: {
      initial: { opacity: 0, y: 40, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { type: "spring", damping: 12, stiffness: 150, delay: index * 0.07 },
    },
    float: {
      initial: { opacity: 0, y: 50, x: (Math.random() - 0.5) * 40 },
      animate: { opacity: 1, y: 0, x: 0 },
      transition: { type: "spring", damping: 20, delay: index * 0.09 },
    },
  };

  const v = variants[animStyle];

  const handleLike = () => {
    onLike(wish.id);
    // Burst particles
    const newParticles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      emoji: reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)],
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1500);
  };

  return (
    <motion.div
      initial={v.initial}
      whileInView={v.animate as any}
      viewport={{ once: true, margin: "-30px" }}
      transition={v.transition}
      className="group relative"
      style={{ perspective: 800 }}
    >
      {/* Like particles */}
      <AnimatePresence>
        {particles.map((p, pi) => (
          <motion.span
            key={p.id}
            className="absolute text-base pointer-events-none z-20"
            style={{ left: "50%", top: "50%" }}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{
              opacity: 0,
              scale: 1.5,
              x: (Math.random() - 0.5) * 120,
              y: -60 - Math.random() * 80,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: pi * 0.05 }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="relative overflow-hidden rounded-2xl border border-border/60 shadow-sm hover:shadow-xl transition-shadow duration-500"
        style={{
          background: `linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))`,
        }}
      >
        {/* Accent gradient top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accentColor} 50%, transparent 100%)`,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.08 + 0.3 }}
        />

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(105deg, transparent 40%, ${accentColor}08 45%, ${accentColor}12 50%, ${accentColor}08 55%, transparent 60%)`,
            }}
          />
        </div>

        <div className="relative p-4 md:p-5">
          <div className="flex gap-3.5">
            {/* Avatar with animated ring */}
            <div className="relative flex-shrink-0">
              <motion.div
                className="w-11 h-11 rounded-full flex items-center justify-center text-lg shadow-sm border-2"
                style={{
                  backgroundColor: `${accentColor}10`,
                  borderColor: `${accentColor}30`,
                }}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                {wish.emoji}
              </motion.div>
              {/* Online dot */}
              <motion.div
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white"
                style={{ backgroundColor: "#4ade80" }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-body text-sm font-bold text-foreground">{wish.name}</span>
                <span className="font-body text-[10px] text-muted-foreground/50 bg-muted/30 px-1.5 py-0.5 rounded-full">
                  {wish.timestamp}
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground/80 leading-relaxed">{wish.message}</p>

              {/* Reactions row */}
              <div className="flex items-center gap-3 mt-3">
                <motion.button
                  onClick={handleLike}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 border ${
                    wish.liked
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-transparent bg-muted/30 text-muted-foreground/60 hover:bg-muted/50"
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-all ${wish.liked ? "fill-red-500 text-red-500" : ""}`}
                  />
                  {wish.likes > 0 && <span>{wish.likes}</span>}
                </motion.button>

                <div className="relative">
                  <motion.button
                    onClick={() => setShowReactions(!showReactions)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-muted/30 text-muted-foreground/50 hover:bg-muted/50 transition-colors"
                  >
                    <Star className="w-3 h-3" />
                  </motion.button>
                  <AnimatePresence>
                    {showReactions && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        className="absolute bottom-full mb-1 left-0 flex gap-1 bg-card rounded-full px-2 py-1 shadow-lg border border-border z-10"
                      >
                        {reactionEmojis.map((emoji) => (
                          <motion.button
                            key={emoji}
                            whileHover={{ scale: 1.4, y: -3 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => setShowReactions(false)}
                            className="w-7 h-7 flex items-center justify-center text-sm hover:bg-muted/30 rounded-full transition-colors"
                          >
                            {emoji}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Wish Form (Chat-style) ─────────────────────
const WishForm = ({
  accentColor,
  onSubmit,
  onCancel,
}: {
  accentColor: string;
  onSubmit: (name: string, message: string, emoji: string) => void;
  onCancel: () => void;
}) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("💕");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setIsSending(true);
    // Brief animation pause
    await new Promise((r) => setTimeout(r, 600));
    onSubmit(name, message, selectedEmoji);
    setIsSending(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.92 }}
      transition={{ type: "spring", damping: 22, stiffness: 260 }}
      onSubmit={handleSubmit}
      className="relative bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-border overflow-hidden"
    >
      {/* Animated gradient border top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
        style={{
          background: `linear-gradient(90deg, ${accentColor}00, ${accentColor}, ${accentColor}00)`,
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Header */}
      <div className="p-6 pb-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: `${accentColor}12` }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <PenLine className="w-5 h-5" style={{ color: accentColor }} />
          </motion.div>
          <div>
            <h4 className="font-display text-lg font-bold text-foreground">Gửi lời chúc</h4>
            <p className="font-body text-xs text-muted-foreground">Chia sẻ niềm vui cùng cô dâu & chú rể</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Name field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-foreground transition-colors" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border/60 bg-background/50 font-body text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
            style={{ "--tw-ring-color": `${accentColor}60` } as React.CSSProperties}
          />
        </motion.div>

        {/* Message field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <textarea
            placeholder="Viết lời chúc tới cô dâu & chú rể..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
            className="w-full px-4 py-3.5 rounded-xl border border-border/60 bg-background/50 font-body text-sm focus:outline-none focus:ring-2 resize-none transition-all"
            style={{ "--tw-ring-color": `${accentColor}60` } as React.CSSProperties}
          />
          {/* Character indicator */}
          <span className="absolute bottom-2 right-3 font-body text-[10px] text-muted-foreground/30">
            {message.length}/200
          </span>
        </motion.div>

        {/* Emoji picker */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/60 font-body text-xs text-muted-foreground hover:border-border hover:bg-muted/30 transition-all"
          >
            <motion.span
              className="text-lg"
              animate={showEmojiPicker ? { rotate: [0, 20, -20, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {selectedEmoji}
            </motion.span>
            Chọn biểu tượng
          </button>
          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.9 }}
                className="absolute bottom-full mb-2 left-0 bg-card rounded-2xl p-3 shadow-2xl border border-border grid grid-cols-6 gap-1.5 z-10"
              >
                {emojiOptions.map((emoji, i) => (
                  <motion.button
                    key={emoji}
                    type="button"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ scale: 1.3, y: -4 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => {
                      setSelectedEmoji(emoji);
                      setShowEmojiPicker(false);
                    }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
                      selectedEmoji === emoji
                        ? "ring-2 scale-110 bg-muted/40"
                        : "hover:bg-muted/30"
                    }`}
                    style={
                      selectedEmoji === emoji
                        ? ({ "--tw-ring-color": accentColor } as React.CSSProperties)
                        : {}
                    }
                  >
                    {emoji}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 pt-2"
        >
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3.5 rounded-xl border border-border/60 font-body text-sm text-muted-foreground hover:bg-muted/30 transition-all"
          >
            Hủy
          </motion.button>
          <motion.button
            type="submit"
            disabled={isSending}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-body text-sm font-semibold shadow-lg disabled:opacity-70 transition-all"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 6px 24px ${accentColor}30`,
            }}
          >
            {isSending ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Gửi Lời Chúc
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </motion.form>
  );
};

// ─── Animation style selector ────────────────────
const animStyles: Array<"slide" | "pop" | "flip" | "wave" | "float"> = ["slide", "pop", "flip", "wave", "float"];

// ─── Main Component ──────────────────────────────
const WishesWall = ({ accentColor }: { accentColor: string }) => {
  const [wishes, setWishes] = useState<Wish[]>(sampleWishes);
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [animStyle, setAnimStyle] = useState<(typeof animStyles)[number]>("slide");

  const visibleWishes = showAll ? wishes : wishes.slice(0, 6);

  const handleSubmit = (name: string, message: string, emoji: string) => {
    const wish: Wish = {
      id: Date.now(),
      name,
      message,
      emoji,
      timestamp: "Vừa xong",
      likes: 0,
      liked: false,
    };
    setWishes((prev) => [wish, ...prev]);
    setShowForm(false);
    emitWish(wish);
  };

  const handleLike = (id: number) => {
    setWishes((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, liked: !w.liked, likes: w.liked ? w.likes - 1 : w.likes + 1 }
          : w
      )
    );
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <FloatingHearts accentColor={accentColor} />

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
          animate={{ scale: [1.3, 1, 1.3] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2, damping: 12 }}
            className="w-18 h-18 mx-auto mb-5 rounded-full flex items-center justify-center relative"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <MessageCircleHeart className="w-8 h-8" style={{ color: accentColor }} />
            {/* Ripple rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: `${accentColor}20` }}
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: `${accentColor}15` }}
              animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xs uppercase font-body block mb-3"
            style={{ color: accentColor }}
          >
            Gửi gắm yêu thương
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground"
          >
            Lời Chúc Phúc
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-20 h-[2px] mx-auto mt-4 rounded-full"
            style={{ backgroundColor: accentColor }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground font-body mt-4 max-w-md mx-auto text-sm"
          >
            Những lời yêu thương gửi đến cô dâu và chú rể trong ngày hạnh phúc
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-6 mt-6"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/30">
              <Heart className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span className="font-body text-xs font-semibold text-foreground">{wishes.length}</span>
              <span className="font-body text-[10px] text-muted-foreground">lời chúc</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/30">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#4ade80" }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-body text-[10px] text-muted-foreground">Đang online</span>
            </div>
          </motion.div>

          {/* Animation style picker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-2 mt-5"
          >
            <span className="font-body text-[10px] text-muted-foreground/50 mr-1">Hiệu ứng:</span>
            {animStyles.map((style) => (
              <button
                key={style}
                onClick={() => setAnimStyle(style)}
                className={`font-body text-[10px] px-2.5 py-1 rounded-full capitalize transition-all ${
                  animStyle === style
                    ? "text-white shadow-sm"
                    : "text-muted-foreground/50 hover:text-foreground bg-muted/20 hover:bg-muted/40"
                }`}
                style={animStyle === style ? { backgroundColor: accentColor } : {}}
              >
                {style}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <AnimatePresence mode="popLayout">
            {visibleWishes.map((wish, i) => (
              <WishBubble
                key={wish.id}
                wish={wish}
                index={i}
                accentColor={accentColor}
                onLike={handleLike}
                animStyle={animStyle}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Show more */}
        {wishes.length > 6 && !showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="font-body text-sm px-6 py-2 rounded-full border border-border/60 hover:bg-muted/30 transition-all"
              style={{ color: accentColor }}
            >
              Xem thêm {wishes.length - 6} lời chúc ✨
            </motion.button>
          </motion.div>
        )}

        {/* CTA / Form */}
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-body font-semibold text-base overflow-hidden group"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 8px 32px ${accentColor}35`,
                  }}
                >
                  {/* Shine sweep */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)`,
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <PartyPopper className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Gửi Lời Chúc Phúc</span>
                </motion.button>
              </motion.div>
            ) : (
              <WishForm
                key="form"
                accentColor={accentColor}
                onSubmit={handleSubmit}
                onCancel={() => setShowForm(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default WishesWall;
