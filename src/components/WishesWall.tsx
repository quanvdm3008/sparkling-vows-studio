import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircleHeart, Sparkles, Send } from "lucide-react";
import { emitWish } from "@/components/LiveWishToast";

interface Wish {
  id: number;
  name: string;
  message: string;
  emoji: string;
  timestamp: string;
}

// Dữ liệu tạm — sẽ thay bằng API sau
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

// Floating wish bubble
const FloatingWish = ({ wish, index }: { wish: Wish; index: number }) => {
  const randomX = Math.random() * 80 + 10; // 10-90%
  const randomDelay = index * 0.8;
  const duration = 12 + Math.random() * 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, x: `${randomX}%` }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [-20, -150 - Math.random() * 200],
        x: `${randomX + (Math.random() - 0.5) * 20}%`,
      }}
      transition={{
        duration,
        delay: randomDelay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5,
        ease: "easeOut",
      }}
      className="absolute pointer-events-none"
      style={{ left: 0, bottom: "10%" }}
    >
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-border max-w-[200px]">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-lg">{wish.emoji}</span>
          <span className="font-body text-xs font-semibold text-foreground truncate">{wish.name}</span>
        </div>
        <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">{wish.message}</p>
      </div>
    </motion.div>
  );
};

const WishesWall = ({ accentColor }: { accentColor: string }) => {
  const [wishes, setWishes] = useState<Wish[]>(sampleWishes);
  const [newWish, setNewWish] = useState({ name: "", message: "" });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim()) return;

    const emojis = ["💕", "🌸", "💒", "🎊", "🥳", "❤️", "💐", "✨"];
    const wish: Wish = {
      id: Date.now(),
      name: newWish.name,
      message: newWish.message,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      timestamp: "Vừa xong",
    };
    setWishes((prev) => [wish, ...prev]);
    setNewWish({ name: "", message: "" });
    setShowForm(false);
    // Emit live notification
    emitWish(wish);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden min-h-[600px]">
      {/* Floating wishes in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {wishes.slice(0, 6).map((wish, i) => (
          <FloatingWish key={wish.id} wish={wish} index={i} />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>
            Gửi gắm yêu thương
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            <MessageCircleHeart className="w-9 h-9 inline-block mr-3 mb-2" style={{ color: accentColor }} />
            Lời Chúc Phúc
          </h2>
          <p className="text-muted-foreground font-body mt-3">
            Những lời yêu thương dành cho cô dâu và chú rể
          </p>
        </motion.div>

        {/* Wish cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {wishes.map((wish, i) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-border hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-3">
                <motion.span
                  className="text-2xl flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {wish.emoji}
                </motion.span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-body text-sm font-bold text-foreground truncate">{wish.name}</span>
                    <span className="font-body text-xs text-muted-foreground flex-shrink-0">{wish.timestamp}</span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{wish.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add wish button & form */}
        <div className="text-center">
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.button
                key="btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-primary-foreground font-body font-semibold shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                <Sparkles className="w-5 h-5" />
                Gửi Lời Chúc
              </motion.button>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="max-w-md mx-auto bg-card rounded-3xl p-6 shadow-xl border border-border space-y-4"
              >
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  value={newWish.name}
                  onChange={(e) => setNewWish((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Viết lời chúc..."
                  value={newWish.message}
                  onChange={(e) => setNewWish((p) => ({ ...p, message: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px] resize-none"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 rounded-xl border border-border font-body text-sm text-muted-foreground hover:bg-secondary transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-primary-foreground font-body text-sm font-semibold"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Send className="w-4 h-4" />
                    Gửi
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default WishesWall;
