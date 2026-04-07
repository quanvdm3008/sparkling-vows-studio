import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, Music, Palette, Mic2, Flower2, MapPin, Sparkles, UserCheck,
  Star, ChevronRight, X, Send, Phone, Mail, CalendarCheck, Check,
  Crown, Utensils
} from "lucide-react";

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  priceRange: string;
  features: string[];
  popular?: boolean;
}

const services: ServiceItem[] = [
  {
    id: "venue",
    icon: <MapPin className="w-6 h-6" />,
    title: "Nhà Hàng & Rạp Cưới",
    subtitle: "Không gian hoàn hảo",
    description: "Tư vấn & đặt rạp cưới, nhà hàng tiệc cưới phù hợp ngân sách và phong cách.",
    priceRange: "15 - 80 triệu",
    features: ["Tư vấn địa điểm", "Set up trang trí", "Bàn ghế & khăn trải", "Hệ thống ánh sáng"],
    popular: true,
  },
  {
    id: "photo",
    icon: <Camera className="w-6 h-6" />,
    title: "Chụp Ảnh & Quay Phim",
    subtitle: "Lưu giữ khoảnh khắc",
    description: "Đội ngũ nhiếp ảnh gia chuyên nghiệp, quay phim 4K cinematic cho ngày trọng đại.",
    priceRange: "8 - 35 triệu",
    features: ["Chụp ảnh cưới outdoor", "Quay phim 4K cinematic", "Chỉnh sửa chuyên nghiệp", "Album cao cấp"],
  },
  {
    id: "music",
    icon: <Music className="w-6 h-6" />,
    title: "Ban Nhạc & DJ",
    subtitle: "Âm nhạc sống động",
    description: "Ban nhạc sống, DJ chuyên nghiệp tạo không khí sôi động cho tiệc cưới.",
    priceRange: "5 - 25 triệu",
    features: ["Ban nhạc acoustic", "DJ party", "MC dẫn chương trình", "Âm thanh chuyên nghiệp"],
  },
  {
    id: "mc",
    icon: <Mic2 className="w-6 h-6" />,
    title: "MC Dẫn Chương Trình",
    subtitle: "Dẫn dắt chuyên nghiệp",
    description: "MC song ngữ, kinh nghiệm dẫn hàng trăm đám cưới, tạo không khí ấm áp.",
    priceRange: "3 - 12 triệu",
    features: ["MC song ngữ", "Kịch bản riêng", "Minigame tương tác", "Phối hợp ban nhạc"],
  },
  {
    id: "flower",
    icon: <Flower2 className="w-6 h-6" />,
    title: "Hoa Cưới & Trang Trí",
    subtitle: "Hoa tươi nghệ thuật",
    description: "Thiết kế hoa cưới, cổng hoa, bàn tiệc theo concept riêng biệt.",
    priceRange: "5 - 30 triệu",
    features: ["Hoa cầm tay cô dâu", "Cổng hoa đón khách", "Trang trí bàn tiệc", "Backdrop chụp ảnh"],
    popular: true,
  },
  {
    id: "makeup",
    icon: <Palette className="w-6 h-6" />,
    title: "Trang Điểm & Làm Tóc",
    subtitle: "Rạng rỡ ngày cưới",
    description: "Chuyên gia makeup bridal, làm tóc cô dâu phong cách Hàn Quốc, châu Âu.",
    priceRange: "3 - 15 triệu",
    features: ["Makeup cô dâu", "Làm tóc chuyên nghiệp", "Thay đổi look tiệc tối", "Makeup phù dâu"],
  },
  {
    id: "planner",
    icon: <Crown className="w-6 h-6" />,
    title: "Wedding Planner",
    subtitle: "Trọn gói an tâm",
    description: "Đội ngũ wedding planner lên kế hoạch, điều phối toàn bộ đám cưới từ A-Z.",
    priceRange: "10 - 50 triệu",
    features: ["Lên kế hoạch chi tiết", "Quản lý ngân sách", "Điều phối ngày cưới", "Xử lý sự cố"],
  },
  {
    id: "catering",
    icon: <Utensils className="w-6 h-6" />,
    title: "Tiệc Cưới & Catering",
    subtitle: "Ẩm thực tinh tế",
    description: "Menu tiệc cưới đa dạng: Á, Âu, buffet, set menu theo yêu cầu.",
    priceRange: "200K - 1.5 triệu/khách",
    features: ["Thực đơn tùy chỉnh", "Tasting trước tiệc", "Đội ngũ phục vụ", "Cocktail & bar"],
  },
];

// ─── Booking Modal ──────────────────────────────────
const BookingModal = ({
  service,
  accentColor,
  cardRadius,
  onClose,
}: {
  service: ServiceItem;
  accentColor: string;
  cardRadius: string;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(0); // 0: form, 1: success
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
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`relative bg-card ${cardRadius} shadow-2xl border border-border w-full max-w-md max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-border">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-secondary transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
              {service.icon}
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground">{service.title}</h3>
              <p className="text-muted-foreground font-body text-xs">{service.priceRange}</p>
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
                <input
                  type="text" required value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={`w-full px-4 py-3 ${cardRadius} border border-border bg-background font-body text-sm focus:outline-none focus:ring-2`}
                  style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
                  placeholder="Nhập họ tên"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-sm font-semibold text-foreground mb-1.5">
                    <Phone className="w-3.5 h-3.5 inline mr-1.5" style={{ color: accentColor }} />
                    Số điện thoại
                  </label>
                  <input
                    type="tel" required value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className={`w-full px-4 py-3 ${cardRadius} border border-border bg-background font-body text-sm focus:outline-none focus:ring-2`}
                    placeholder="0901..."
                  />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-foreground mb-1.5">
                    <Mail className="w-3.5 h-3.5 inline mr-1.5" style={{ color: accentColor }} />
                    Email
                  </label>
                  <input
                    type="email" value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={`w-full px-4 py-3 ${cardRadius} border border-border bg-background font-body text-sm focus:outline-none focus:ring-2`}
                    placeholder="email@..."
                  />
                </div>
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-foreground mb-1.5">
                  <CalendarCheck className="w-3.5 h-3.5 inline mr-1.5" style={{ color: accentColor }} />
                  Ngày cưới dự kiến
                </label>
                <input
                  type="date" required value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className={`w-full px-4 py-3 ${cardRadius} border border-border bg-background font-body text-sm focus:outline-none focus:ring-2`}
                />
              </div>
              <div>
                <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Ghi chú thêm</label>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  className={`w-full px-4 py-3 ${cardRadius} border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 min-h-[80px] resize-none`}
                  placeholder="Yêu cầu đặc biệt, số lượng khách..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center gap-2 py-3.5 ${cardRadius} text-primary-foreground font-body font-semibold shadow-lg`}
                style={{ backgroundColor: accentColor }}
              >
                <Send className="w-4 h-4" />
                Gửi Yêu Cầu Đặt Dịch Vụ
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}15` }}
              >
                <Check className="w-10 h-10" style={{ color: accentColor }} />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Đã Gửi Thành Công!</h3>
              <p className="text-muted-foreground font-body text-sm mb-6">
                Chúng tôi sẽ liên hệ bạn trong vòng 24 giờ để tư vấn chi tiết về dịch vụ <strong>{service.title}</strong>.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className={`px-8 py-3 ${cardRadius} font-body font-semibold text-primary-foreground shadow-lg`}
                style={{ backgroundColor: accentColor }}
              >
                Đóng
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// ─── Service Card ──────────────────────────────────
const ServiceCard = ({
  service,
  index,
  accentColor,
  cardRadius,
  onBook,
}: {
  service: ServiceItem;
  index: number;
  accentColor: string;
  cardRadius: string;
  onBook: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.08, type: "spring", damping: 20 }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className={`relative group bg-card ${cardRadius} border border-border shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden`}
  >
    {/* Popular badge */}
    {service.popular && (
      <div
        className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-primary-foreground font-body text-[10px] font-bold uppercase tracking-wider"
        style={{ backgroundColor: accentColor }}
      >
        <Star className="w-3 h-3" fill="currentColor" />
        Hot
      </div>
    )}

    {/* Gradient accent top bar */}
    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}60)` }} />

    <div className="p-6">
      {/* Icon */}
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300"
        style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
      >
        {service.icon}
      </motion.div>

      <h3 className="font-display text-lg font-bold text-foreground mb-0.5">{service.title}</h3>
      <p className="font-body text-xs mb-3" style={{ color: accentColor }}>{service.subtitle}</p>
      <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{service.description}</p>

      {/* Features */}
      <ul className="space-y-1.5 mb-5">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 font-body text-xs text-muted-foreground">
            <Check className="w-3 h-3 flex-shrink-0" style={{ color: accentColor }} />
            {f}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-body text-xs text-muted-foreground">Từ</span>
        <span className="font-display text-lg font-bold" style={{ color: accentColor }}>{service.priceRange}</span>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onBook}
        className={`w-full flex items-center justify-center gap-2 py-3 ${cardRadius} font-body font-semibold text-sm transition-all duration-300 border-2`}
        style={{
          borderColor: accentColor,
          color: accentColor,
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = accentColor;
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = accentColor;
        }}
      >
        Đặt Dịch Vụ
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </div>
  </motion.div>
);

// ─── Main Section ──────────────────────────────────
const WeddingServices = ({ accentColor, cardRadius = "rounded-2xl" }: { accentColor: string; cardRadius?: string }) => {
  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.03]" style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.03]" style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}12` }}
          >
            <Sparkles className="w-7 h-7" style={{ color: accentColor }} />
          </motion.div>
          <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>Dịch vụ cưới trọn gói</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-3">
            Dịch Vụ Đám Cưới
          </h2>
          <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto">
            Chúng tôi cung cấp trọn bộ dịch vụ cưới chuyên nghiệp, giúp bạn có một ngày trọng đại hoàn hảo và đáng nhớ.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              accentColor={accentColor}
              cardRadius={cardRadius}
              onBook={() => setBookingService(service)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className={`inline-flex items-center gap-3 px-8 py-4 ${cardRadius} bg-card border border-border shadow-lg`}>
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
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingService && (
          <BookingModal
            service={bookingService}
            accentColor={accentColor}
            cardRadius={cardRadius}
            onClose={() => setBookingService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default WeddingServices;
