import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircleHeart, Sparkles, Send, User, PenLine } from "lucide-react";
import { emitWish } from "@/components/LiveWishToast";

interface Wish {
  id: number;
  name: string;
  message: string;
  emoji: string;
  timestamp: string;
}

const sampleWishes: Wish[] = [
  { id: 1, name: "Anh Tuấn", message: "Chúc hai bạn trăm năm hạnh phúc! 🎉", emoji: "💕", timestamp: "2 giờ trước" },
  { id: 2, name: "Chị Mai", message: "Hạnh phúc mãi mãi nhé! Yêu thương hai bạn nhiều!", emoji: "🌸", timestamp: "3 giờ trước" },
  { id: 3, name: "Bạn Hùng", message: "Trăm năm hạnh phúc, sớm có em bé nha! 😍", emoji: "💒", timestamp: "5 giờ trước" },
  { id: 4, name: "Cô Lan", message: "Chúc mừng hạnh phúc! Cô rất vui cho hai cháu.", emoji: "🎊", timestamp: "6 giờ trước" },
  { id: 5, name: "Nhóm bạn thân", message: "Happy Wedding! Mãi bên nhau nha! 🥂", emoji: "🥳", timestamp: "8 giờ trước" },
  { id: 6, name: "Bác Phương", message: "Chúc hai con luôn yêu thương và thấu hiểu nhau.", emoji: "❤️", timestamp: "10 giờ trước" },
  { id: 7, name: "Em Linh", message: "Anh chị đẹp đôi quá! Chúc hạnh phúc!", emoji: "💐", timestamp: "12 giờ trước" },
  { id: 8, name: "Đồng nghiệp", message: "Best wishes for your new journey together! 🌟", emoji: "✨", timestamp: "1 ngày trước" },
];

const emojiOptions = ["💕", "🌸", "💒", "🎊", "🥳", "❤️", "💐", "✨", "🥂", "💍", "🎉", "🦋"];

// ─── Single Wish Card ────────────────────────────
const WishCard = ({ wish, index, accentColor }: { wish: Wish; index: number; accentColor: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ delay: index * 0.05, type: "spring", damping: 20 }}
    className="group"
  >
    <div className="relative bg-card/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-border hover:shadow-xl hover:border-opacity-60 transition-all duration-300">
      {/* Accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex gap-3.5">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg shadow-sm"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          {wish.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-body text-sm font-bold text-foreground">{wish.name}</span>
            <span className="font-body text-[10px] text-muted-foreground/60">{wish.timestamp}</span>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{wish.message}</p>
        </div>

        {/* Heart reaction */}
        <motion.button
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.8 }}
          className="self-end opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4 text-muted-foreground/40 hover:text-red-400 transition-colors" />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

// ─── Wish Form ───────────────────────────────────
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    onSubmit(name, message, selectedEmoji);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", damping: 25 }}
      onSubmit={handleSubmit}
      className="relative bg-card rounded-3xl p-6 md:p-8 shadow-2xl border border-border overflow-hidden"
    >
      {/* Decorative top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <PenLine className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        <div>
          <h4 className="font-display text-lg font-bold text-foreground">Gửi lời chúc</h4>
          <p className="font-body text-xs text-muted-foreground">Chia sẻ niềm vui cùng cô dâu & chú rể</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 transition-shadow"
            style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
          />
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            placeholder="Viết lời chúc tới cô dâu & chú rể..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 resize-none transition-shadow"
            style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
          />
        </div>

        {/* Emoji picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border font-body text-xs text-muted-foreground hover:bg-secondary transition-colors"
          >
            <span className="text-base">{selectedEmoji}</span>
            Chọn biểu tượng
          </button>
          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                className="absolute bottom-full mb-2 left-0 bg-card rounded-xl p-2 shadow-xl border border-border grid grid-cols-6 gap-1 z-10"
              >
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => { setSelectedEmoji(emoji); setShowEmojiPicker(false); }}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-all hover:scale-110 ${
                      selectedEmoji === emoji ? "ring-2 scale-110" : "hover:bg-secondary"
                    }`}
                    style={selectedEmoji === emoji ? { "--tw-ring-color": accentColor } as React.CSSProperties : {}}
                  >
                    {emoji}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 rounded-xl border border-border font-body text-sm text-muted-foreground hover:bg-secondary transition-colors"
          >
            Hủy
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-primary-foreground font-body text-sm font-semibold shadow-lg"
            style={{ backgroundColor: accentColor }}
          >
            <Send className="w-4 h-4" />
            Gửi Lời Chúc
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};

// ─── Main Component ──────────────────────────────
const WishesWall = ({ accentColor }: { accentColor: string }) => {
  const [wishes, setWishes] = useState<Wish[]>(sampleWishes);
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleWishes = showAll ? wishes : wishes.slice(0, 6);

  const handleSubmit = (name: string, message: string, emoji: string) => {
    const wish: Wish = {
      id: Date.now(),
      name,
      message,
      emoji,
      timestamp: "Vừa xong",
    };
    setWishes((prev) => [wish, ...prev]);
    setShowForm(false);
    emitWish(wish);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.03]"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-[0.03]"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}12` }}
          >
            <MessageCircleHeart className="w-7 h-7" style={{ color: accentColor }} />
          </motion.div>
          <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>
            Gửi gắm yêu thương
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            Lời Chúc Phúc
          </h2>
          <p className="text-muted-foreground font-body mt-3 max-w-md mx-auto">
            Những lời yêu thương gửi đến cô dâu và chú rể trong ngày hạnh phúc
          </p>
          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4" style={{ color: accentColor }} />
              <span className="font-body text-sm font-semibold text-foreground">{wishes.length}</span>
              <span className="font-body text-xs text-muted-foreground">lời chúc</span>
            </div>
            <div className="w-[1px] h-4 bg-border" />
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
              <span className="font-body text-xs text-muted-foreground">Đang online</span>
            </div>
          </div>
        </motion.div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <AnimatePresence>
            {visibleWishes.map((wish, i) => (
              <WishCard key={wish.id} wish={wish} index={i} accentColor={accentColor} />
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
            <button
              onClick={() => setShowAll(true)}
              className="font-body text-sm underline underline-offset-4 transition-colors"
              style={{ color: accentColor }}
            >
              Xem thêm {wishes.length - 6} lời chúc
            </button>
          </motion.div>
        )}

        {/* CTA / Form */}
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-primary-foreground font-body font-semibold shadow-xl text-base"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 8px 30px ${accentColor}30`,
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                  Gửi Lời Chúc Phúc
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
