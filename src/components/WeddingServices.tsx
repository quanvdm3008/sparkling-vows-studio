import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, Music, Palette, Mic2, Flower2, MapPin, Sparkles, UserCheck,
  Star, ChevronRight, X, Send, Phone, Mail, CalendarCheck, Check,
  Crown, Utensils, ArrowLeft, Heart, Eye, MessageSquare, Award,
  ThumbsUp, Clock, Image as ImageIcon, ChevronDown
} from "lucide-react";

// ─── Types ──────────────────────────────────────────
interface Provider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  priceRange: string;
  location: string;
  description: string;
  portfolio: string[];
  tags: string[];
  verified: boolean;
  yearsExp: number;
  completedJobs: number;
}

interface ServiceCategory {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  providers: Provider[];
  popular?: boolean;
}

// ─── Data ──────────────────────────────────────────
const serviceCategories: ServiceCategory[] = [
  {
    id: "venue",
    icon: <MapPin className="w-6 h-6" />,
    title: "Nhà Hàng & Rạp Cưới",
    subtitle: "Không gian hoàn hảo",
    description: "Đa dạng địa điểm tổ chức tiệc cưới",
    popular: true,
    providers: [
      {
        id: "v1", name: "White Palace", avatar: "🏛️", rating: 4.9, reviews: 324,
        priceRange: "30 - 80 triệu", location: "Quận 1, TP.HCM",
        description: "Trung tâm hội nghị tiệc cưới cao cấp hàng đầu với sức chứa lên đến 1500 khách.",
        portfolio: ["Sảnh Grand Ballroom", "Sảnh Crystal", "Khu vực outdoor"],
        tags: ["Cao cấp", "Sức chứa lớn", "Trung tâm"], verified: true, yearsExp: 15, completedJobs: 2400,
      },
      {
        id: "v2", name: "GEM Center", avatar: "💎", rating: 4.8, reviews: 256,
        priceRange: "25 - 60 triệu", location: "Quận 1, TP.HCM",
        description: "Không gian sang trọng với kiến trúc hiện đại, view thành phố tuyệt đẹp.",
        portfolio: ["Sky Garden", "Grand Hall", "VIP Lounge"],
        tags: ["View đẹp", "Hiện đại", "Linh hoạt"], verified: true, yearsExp: 10, completedJobs: 1800,
      },
      {
        id: "v3", name: "Capella Garden", avatar: "🌿", rating: 4.7, reviews: 189,
        priceRange: "15 - 40 triệu", location: "Quận 7, TP.HCM",
        description: "Nhà hàng sân vườn lãng mạn, phù hợp tiệc cưới ấm cúng.",
        portfolio: ["Sân vườn chính", "Phòng VIP", "Khu bar"],
        tags: ["Sân vườn", "Lãng mạn", "Giá tốt"], verified: false, yearsExp: 5, completedJobs: 600,
      },
    ],
  },
  {
    id: "photo",
    icon: <Camera className="w-6 h-6" />,
    title: "Chụp Ảnh & Quay Phim",
    subtitle: "Lưu giữ khoảnh khắc",
    description: "Nhiếp ảnh gia & quay phim chuyên nghiệp",
    providers: [
      {
        id: "p1", name: "TuArt Studio", avatar: "📸", rating: 4.9, reviews: 512,
        priceRange: "12 - 35 triệu", location: "Quận 3, TP.HCM",
        description: "Studio chụp ảnh cưới hàng đầu Việt Nam với phong cách nghệ thuật độc đáo.",
        portfolio: ["Album outdoor", "Phóng sự cưới", "Pre-wedding"],
        tags: ["Top 1 VN", "Nghệ thuật", "4K Cinematic"], verified: true, yearsExp: 12, completedJobs: 3200,
      },
      {
        id: "p2", name: "Mắt Ngọc Studio", avatar: "🎥", rating: 4.7, reviews: 287,
        priceRange: "8 - 25 triệu", location: "Quận Bình Thạnh",
        description: "Chuyên quay phim cinematic và chụp phóng sự ngày cưới chân thực.",
        portfolio: ["Cinematic wedding", "Same-day edit", "Drone footage"],
        tags: ["Cinematic", "Drone", "Same-day edit"], verified: true, yearsExp: 8, completedJobs: 1500,
      },
      {
        id: "p3", name: "Ảnh Việt Art", avatar: "🖼️", rating: 4.6, reviews: 156,
        priceRange: "5 - 15 triệu", location: "Quận Tân Bình",
        description: "Dịch vụ chụp ảnh cưới giá tốt, album chất lượng cao.",
        portfolio: ["Album truyền thống", "Ảnh nghệ thuật", "Ảnh gia đình"],
        tags: ["Giá tốt", "Chất lượng", "Nhanh giao"], verified: false, yearsExp: 5, completedJobs: 800,
      },
    ],
  },
  {
    id: "music",
    icon: <Music className="w-6 h-6" />,
    title: "Ban Nhạc & DJ",
    subtitle: "Âm nhạc sống động",
    description: "Ban nhạc sống và DJ chuyên nghiệp",
    providers: [
      {
        id: "m1", name: "Saigon Sound", avatar: "🎵", rating: 4.8, reviews: 198,
        priceRange: "8 - 25 triệu", location: "Quận 1, TP.HCM",
        description: "Ban nhạc acoustic & DJ chuyên tiệc cưới, sự kiện cao cấp.",
        portfolio: ["Acoustic band", "DJ Set", "Live band 6 người"],
        tags: ["Acoustic", "DJ", "Sự kiện lớn"], verified: true, yearsExp: 10, completedJobs: 1200,
      },
      {
        id: "m2", name: "Melody Wedding", avatar: "🎶", rating: 4.6, reviews: 134,
        priceRange: "5 - 15 triệu", location: "Quận 3, TP.HCM",
        description: "Nhóm nhạc trẻ chuyên biểu diễn tiệc cưới với repertoire đa dạng.",
        portfolio: ["Nhạc trẻ", "Nhạc quốc tế", "Nhạc trữ tình"],
        tags: ["Trẻ trung", "Đa dạng", "Giá tốt"], verified: false, yearsExp: 4, completedJobs: 400,
      },
    ],
  },
  {
    id: "mc",
    icon: <Mic2 className="w-6 h-6" />,
    title: "MC Dẫn Chương Trình",
    subtitle: "Dẫn dắt chuyên nghiệp",
    description: "MC song ngữ, kinh nghiệm phong phú",
    providers: [
      {
        id: "mc1", name: "MC Thanh Bạch", avatar: "🎤", rating: 4.9, reviews: 423,
        priceRange: "5 - 15 triệu", location: "TP.HCM",
        description: "MC dẫn chương trình hàng trăm đám cưới, phong cách dí dỏm và ấm áp.",
        portfolio: ["MC song ngữ", "Kịch bản riêng", "Mini game"],
        tags: ["Song ngữ", "Hài hước", "Kinh nghiệm"], verified: true, yearsExp: 15, completedJobs: 2000,
      },
      {
        id: "mc2", name: "MC Minh Tuyết", avatar: "💃", rating: 4.7, reviews: 189,
        priceRange: "3 - 8 triệu", location: "TP.HCM",
        description: "MC nữ trẻ trung, năng động, giọng nói truyền cảm.",
        portfolio: ["MC tiệc cưới", "MC sự kiện", "Dẫn chương trình"],
        tags: ["Nữ MC", "Trẻ trung", "Giọng hay"], verified: true, yearsExp: 6, completedJobs: 500,
      },
    ],
  },
  {
    id: "flower",
    icon: <Flower2 className="w-6 h-6" />,
    title: "Hoa Cưới & Trang Trí",
    subtitle: "Nghệ thuật hoa",
    description: "Hoa tươi và trang trí tiệc cưới",
    providers: [
      {
        id: "f1", name: "Dalat Hasfarm", avatar: "🌸", rating: 4.8, reviews: 267,
        priceRange: "5 - 30 triệu", location: "Quận 1, TP.HCM",
        description: "Hoa nhập khẩu và Đà Lạt tươi, set up trang trí tiệc cưới chuyên nghiệp.",
        portfolio: ["Cổng hoa", "Hoa bàn tiệc", "Bó hoa cô dâu"],
        tags: ["Hoa nhập", "Thiết kế", "Đà Lạt"], verified: true, yearsExp: 20, completedJobs: 5000,
      },
      {
        id: "f2", name: "Bloom Studio", avatar: "💐", rating: 4.6, reviews: 145,
        priceRange: "3 - 15 triệu", location: "Quận 7, TP.HCM",
        description: "Studio hoa cưới phong cách minimalist, hiện đại.",
        portfolio: ["Minimalist bouquet", "Rustic decor", "Boho style"],
        tags: ["Minimalist", "Hiện đại", "Trendy"], verified: false, yearsExp: 3, completedJobs: 300,
      },
    ],
  },
  {
    id: "makeup",
    icon: <Palette className="w-6 h-6" />,
    title: "Trang Điểm Cô Dâu",
    subtitle: "Rạng rỡ ngày cưới",
    description: "Chuyên gia makeup & hairstyling",
    providers: [
      {
        id: "mk1", name: "Tina Lê Makeup", avatar: "💄", rating: 4.9, reviews: 378,
        priceRange: "5 - 20 triệu", location: "Quận 1, TP.HCM",
        description: "Makeup artist hàng đầu, phong cách tự nhiên tôn vinh vẻ đẹp cô dâu.",
        portfolio: ["Makeup Hàn Quốc", "Makeup cổ điển", "Makeup tự nhiên"],
        tags: ["Top artist", "Tự nhiên", "Hàn Quốc"], verified: true, yearsExp: 12, completedJobs: 2500,
      },
      {
        id: "mk2", name: "Hương Bridal", avatar: "✨", rating: 4.5, reviews: 98,
        priceRange: "2 - 8 triệu", location: "Quận Gò Vấp",
        description: "Trang điểm cô dâu tận nơi, combo makeup + áo dài.",
        portfolio: ["Makeup tận nơi", "Combo áo dài", "Makeup party"],
        tags: ["Tận nơi", "Combo", "Giá tốt"], verified: false, yearsExp: 4, completedJobs: 350,
      },
    ],
  },
  {
    id: "planner",
    icon: <Crown className="w-6 h-6" />,
    title: "Wedding Planner",
    subtitle: "Tổ chức trọn gói",
    description: "Lên kế hoạch & điều phối ngày cưới",
    providers: [
      {
        id: "wp1", name: "The Planners", avatar: "👑", rating: 4.9, reviews: 156,
        priceRange: "15 - 50 triệu", location: "Quận 2, TP.HCM",
        description: "Đội ngũ wedding planner chuyên nghiệp, tổ chức đám cưới trong mơ.",
        portfolio: ["Destination wedding", "Beach wedding", "Garden party"],
        tags: ["Cao cấp", "Destination", "Trọn gói"], verified: true, yearsExp: 8, completedJobs: 400,
      },
    ],
  },
  {
    id: "catering",
    icon: <Utensils className="w-6 h-6" />,
    title: "Tiệc Cưới & Catering",
    subtitle: "Ẩm thực tinh tế",
    description: "Thực đơn tiệc cưới đa dạng",
    providers: [
      {
        id: "c1", name: "Golden Gate Catering", avatar: "🍽️", rating: 4.7, reviews: 234,
        priceRange: "20 - 60 triệu", location: "TP.HCM",
        description: "Dịch vụ tiệc cưới cao cấp với menu Á - Âu đa dạng.",
        portfolio: ["Set menu Á", "Buffet cao cấp", "Cocktail party"],
        tags: ["Á - Âu", "Buffet", "Cao cấp"], verified: true, yearsExp: 12, completedJobs: 1800,
      },
      {
        id: "c2", name: "Sài Gòn Banquet", avatar: "🥂", rating: 4.5, reviews: 167,
        priceRange: "10 - 35 triệu", location: "TP.HCM",
        description: "Tiệc cưới truyền thống Việt Nam, phục vụ tận nơi.",
        portfolio: ["Tiệc truyền thống", "Set menu gia đình", "Tráng miệng"],
        tags: ["Truyền thống", "Tận nơi", "Giá hợp lý"], verified: false, yearsExp: 7, completedJobs: 900,
      },
    ],
  },
];

// ─── Star Rating ──────────────────────────────────
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className="w-3 h-3"
        fill={i <= Math.round(rating) ? "#F59E0B" : "none"}
        style={{ color: i <= Math.round(rating) ? "#F59E0B" : "hsl(var(--muted-foreground))" }}
      />
    ))}
    <span className="ml-1 font-body text-xs font-bold text-foreground">{rating}</span>
  </div>
);

// ─── Provider Card ──────────────────────────────────
const ProviderCard = ({
  provider,
  index,
  accentColor,
  onBook,
}: {
  provider: Provider;
  index: number;
  accentColor: string;
  onBook: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, type: "spring", damping: 20 }}
    className="group bg-card rounded-2xl border border-border shadow-md hover:shadow-xl transition-all duration-400 overflow-hidden"
  >
    <div className="p-5">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="text-3xl">{provider.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-display text-base font-bold text-foreground truncate">{provider.name}</h4>
            {provider.verified && (
              <div className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating rating={provider.rating} />
            <span className="text-muted-foreground font-body text-[10px]">({provider.reviews} đánh giá)</span>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground font-body text-sm leading-relaxed mb-3 line-clamp-2">{provider.description}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-3 text-muted-foreground">
        <span className="flex items-center gap-1 font-body text-[11px]">
          <MapPin className="w-3 h-3" /> {provider.location}
        </span>
        <span className="flex items-center gap-1 font-body text-[11px]">
          <Clock className="w-3 h-3" /> {provider.yearsExp} năm
        </span>
        <span className="flex items-center gap-1 font-body text-[11px]">
          <ThumbsUp className="w-3 h-3" /> {provider.completedJobs}+
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {provider.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-full font-body text-[10px] font-medium"
            style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Portfolio preview */}
      <div className="flex gap-1.5 mb-4">
        {provider.portfolio.map((item, i) => (
          <div
            key={i}
            className="flex-1 py-2 px-2 rounded-lg bg-secondary/50 text-center"
          >
            <p className="font-body text-[10px] text-muted-foreground truncate">{item}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div>
          <p className="font-body text-[10px] text-muted-foreground">Báo giá</p>
          <p className="font-display text-base font-bold" style={{ color: accentColor }}>{provider.priceRange}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBook}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-body text-sm font-semibold text-white shadow-md"
          style={{ backgroundColor: accentColor }}
        >
          <Send className="w-3.5 h-3.5" />
          Liên hệ
        </motion.button>
      </div>
    </div>
  </motion.div>
);

// ─── Booking Modal ──────────────────────────────────
const BookingModal = ({
  provider,
  serviceName,
  accentColor,
  onClose,
}: {
  provider: Provider;
  serviceName: string;
  accentColor: string;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", note: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-card rounded-3xl shadow-2xl border border-border w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-border">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-secondary transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{provider.avatar}</span>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                {provider.name}
                {provider.verified && (
                  <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                )}
              </h3>
              <p className="text-muted-foreground font-body text-xs">{serviceName} • {provider.priceRange}</p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block font-body text-sm font-semibold text-foreground mb-1.5">
                  <UserCheck className="w-3.5 h-3.5 inline mr-1.5" style={{ color: accentColor }} />
                  Họ và Tên
                </label>
                <input type="text" required value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
                  placeholder="Nhập họ tên" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-sm font-semibold text-foreground mb-1.5">
                    <Phone className="w-3.5 h-3.5 inline mr-1.5" style={{ color: accentColor }} />
                    Số điện thoại
                  </label>
                  <input type="tel" required value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2"
                    placeholder="0901..." />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-foreground mb-1.5">
                    <Mail className="w-3.5 h-3.5 inline mr-1.5" style={{ color: accentColor }} />
                    Email
                  </label>
                  <input type="email" value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2"
                    placeholder="email@..." />
                </div>
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-foreground mb-1.5">
                  <CalendarCheck className="w-3.5 h-3.5 inline mr-1.5" style={{ color: accentColor }} />
                  Ngày cưới dự kiến
                </label>
                <input type="date" required value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2" />
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Ghi chú</label>
                <textarea value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 min-h-[80px] resize-none"
                  placeholder="Yêu cầu đặc biệt, số lượng khách..." />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-body font-semibold shadow-lg"
                style={{ backgroundColor: accentColor }}>
                <Send className="w-4 h-4" />
                Gửi Yêu Cầu Báo Giá
              </motion.button>
            </motion.form>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accentColor}15` }}>
                <Check className="w-10 h-10" style={{ color: accentColor }} />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Đã Gửi Thành Công!</h3>
              <p className="text-muted-foreground font-body text-sm mb-6">
                <strong>{provider.name}</strong> sẽ liên hệ bạn trong vòng 24 giờ.
              </p>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClose}
                className="px-8 py-3 rounded-xl font-body font-semibold text-white shadow-lg" style={{ backgroundColor: accentColor }}>
                Đóng
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// ─── Category Card ──────────────────────────────────
const CategoryCard = ({
  category,
  index,
  accentColor,
  onSelect,
}: {
  category: ServiceCategory;
  index: number;
  accentColor: string;
  onSelect: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ delay: index * 0.06, type: "spring", damping: 20 }}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    onClick={onSelect}
    className="relative group bg-card rounded-2xl border border-border shadow-lg hover:shadow-2xl transition-all duration-400 overflow-hidden cursor-pointer"
  >
    {category.popular && (
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-white font-body text-[10px] font-bold uppercase tracking-wider"
        style={{ backgroundColor: accentColor }}>
        <Star className="w-3 h-3" fill="currentColor" /> Hot
      </div>
    )}

    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}60)` }} />

    <div className="p-6">
      <motion.div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
        whileHover={{ rotate: [0, -10, 10, 0] }}>
        {category.icon}
      </motion.div>

      <h3 className="font-display text-lg font-bold text-foreground mb-0.5">{category.title}</h3>
      <p className="font-body text-xs mb-3" style={{ color: accentColor }}>{category.subtitle}</p>
      <p className="text-muted-foreground font-body text-sm mb-4">{category.description}</p>

      {/* Provider count & avatars */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            {category.providers.slice(0, 3).map((p, i) => (
              <span key={p.id} className="text-lg" style={{ zIndex: 3 - i }}>{p.avatar}</span>
            ))}
          </div>
          <span className="font-body text-xs text-muted-foreground ml-1">
            {category.providers.length} nhà cung cấp
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" style={{ color: accentColor }} />
      </div>
    </div>
  </motion.div>
);

// ─── Main Section ──────────────────────────────────
const WeddingServices = ({ accentColor, cardRadius = "rounded-2xl" }: { accentColor: string; cardRadius?: string }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [bookingProvider, setBookingProvider] = useState<{ provider: Provider; serviceName: string } | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "price" | "reviews">("rating");

  const sortedProviders = selectedCategory
    ? [...selectedCategory.providers].sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "reviews") return b.reviews - a.reviews;
        return 0;
      })
    : [];

  return (
    <section id="services" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.03]" style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.03]" style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Header */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.2 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accentColor}12` }}>
                  <Sparkles className="w-7 h-7" style={{ color: accentColor }} />
                </motion.div>
                <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>Marketplace dịch vụ cưới</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-3">Dịch Vụ Đám Cưới</h2>
                <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto">
                  So sánh và chọn nhà cung cấp phù hợp nhất từ hàng trăm đối tác uy tín.
                </p>
              </motion.div>

              {/* Category Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {serviceCategories.map((cat, i) => (
                  <CategoryCard key={cat.id} category={cat} index={i} accentColor={accentColor} onSelect={() => setSelectedCategory(cat)} />
                ))}
              </div>

              {/* Bottom CTA */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center">
                <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-card border border-border shadow-lg">
                  <Phone className="w-5 h-5" style={{ color: accentColor }} />
                  <div className="text-left">
                    <p className="font-body text-xs text-muted-foreground">Hotline tư vấn</p>
                    <p className="font-display text-lg font-bold text-foreground">0901 234 567</p>
                  </div>
                  <div className="w-[1px] h-8 bg-border mx-2" />
                  <div className="text-left">
                    <p className="font-body text-xs text-muted-foreground">Combo trọn gói</p>
                    <p className="font-body text-sm font-semibold" style={{ color: accentColor }}>Giảm đến 20%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="providers" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              {/* Back + Title */}
              <div className="mb-8">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm mb-4 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Quay lại danh mục
                </motion.button>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}12`, color: accentColor }}>
                    {selectedCategory.icon}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{selectedCategory.title}</h2>
                    <p className="text-muted-foreground font-body text-sm">{selectedCategory.providers.length} nhà cung cấp</p>
                  </div>
                </div>
              </div>

              {/* Sort bar */}
              <div className="flex items-center gap-2 mb-6">
                <span className="font-body text-xs text-muted-foreground mr-1">Sắp xếp:</span>
                {([
                  { key: "rating", label: "Đánh giá cao", icon: <Star className="w-3 h-3" /> },
                  { key: "reviews", label: "Nhiều review", icon: <MessageSquare className="w-3 h-3" /> },
                ] as const).map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSortBy(s.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all ${
                      sortBy === s.key
                        ? "text-white shadow-md"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                    style={sortBy === s.key ? { backgroundColor: accentColor } : undefined}
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>

              {/* Providers list */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sortedProviders.map((provider, i) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    index={i}
                    accentColor={accentColor}
                    onBook={() => setBookingProvider({ provider, serviceName: selectedCategory.title })}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingProvider && (
          <BookingModal
            provider={bookingProvider.provider}
            serviceName={bookingProvider.serviceName}
            accentColor={accentColor}
            onClose={() => setBookingProvider(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default WeddingServices;
