import { motion } from "framer-motion";
import {
  Sparkles, ClipboardCheck, Users, Image as ImageIcon,
  MapPin, QrCode, Video, Send, Crown, Globe, LayoutDashboard, Music,
  Heart,
} from "lucide-react";

type Feature = {
  icon: any;
  title: string;
  desc: string;
  tint: string; // hex used for icon halo + accent
  featured?: boolean;
  badge?: string;
};

const features: Feature[] = [
  {
    icon: Sparkles, title: "Thiệp cá nhân hóa",
    desc: "Tùy chỉnh tên, ngày, ảnh, màu sắc theo phong cách riêng của hai bạn.",
    tint: "#E8B4B8", featured: true, badge: "Bestseller",
  },
  { icon: ClipboardCheck, title: "RSVP online", desc: "Khách mời xác nhận tham dự ngay trên thiệp, đồng bộ realtime.", tint: "#C9A96E" },
  { icon: Users, title: "Quản lý khách mời", desc: "Danh sách, nhóm bàn, ghi chú món ăn — theo dõi trong một dashboard.", tint: "#B8869C" },
  { icon: ImageIcon, title: "Album ảnh cưới", desc: "Trình bày bộ ảnh pre-wedding với gallery cao cấp, lazy-load mượt.", tint: "#D4A574" },
  { icon: MapPin, title: "Bản đồ chỉ đường", desc: "Tích hợp Google Maps — khách chạm là mở dẫn đường ngay.", tint: "#A8B5A0" },
  { icon: QrCode, title: "QR mừng cưới", desc: "Tạo QR Momo, ZaloPay, ngân hàng — nhận mừng cưới văn minh.", tint: "#C49A8A" },
  { icon: Video, title: "Livestream lễ cưới", desc: "Phát trực tiếp YouTube/Facebook cho người thân ở xa cùng tham dự.", tint: "#9B7BA0" },
  { icon: Send, title: "Gửi qua Zalo/Mail", desc: "Một link gửi qua Zalo, Facebook, Email — đẹp trên mọi máy.", tint: "#C99090" },
  { icon: Crown, title: "Theme cao cấp", desc: "50+ mẫu thiết kế bởi nghệ sĩ — cập nhật mới mỗi tháng.", tint: "#C9A96E", badge: "New" },
  { icon: Globe, title: "Tên miền riêng", desc: "Gắn thiệp cưới vào tên miền của bạn: tencua-em.com.", tint: "#8FA8B5" },
  { icon: LayoutDashboard, title: "Dashboard quản lý", desc: "Theo dõi RSVP, lời chúc, mừng cưới — tất cả ở một nơi.", tint: "#B89D8E" },
  { icon: Music, title: "Nhạc nền cảm xúc", desc: "Chọn bản nhạc yêu thích, khách mở thiệp là vang lên.", tint: "#D4A0B8" },
];

const PremiumFeatures = () => {
  return (
    <section
      id="features"
      className="relative py-20 md:py-32 px-5 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 15% 10%, hsl(345 80% 96%) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 0%, hsl(38 70% 95%) 0%, transparent 55%),
          radial-gradient(ellipse at 50% 100%, hsl(18 100% 98%) 0%, transparent 60%),
          linear-gradient(180deg, hsl(345 65% 96%) 0%, hsl(30 60% 98%) 60%, hsl(18 100% 99%) 100%)
        `,
      }}
    >
      {/* Decorative floating blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, hsl(346 60% 80% / 0.5), transparent 70%)", filter: "blur(40px)" }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-24 w-[460px] h-[460px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, hsl(38 70% 75% / 0.55), transparent 70%)", filter: "blur(50px)" }}
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[380px] h-[380px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, hsl(346 55% 78% / 0.45), transparent 70%)", filter: "blur(50px)" }}
          animate={{ x: [0, 20, 0], y: [0, -25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        {/* tiny sparkle dots */}
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute block w-1 h-1 rounded-full bg-accent/60"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 47) % 100}%`,
              boxShadow: "0 0 10px hsl(var(--accent))",
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: (i % 5) * 0.4 }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          <div className="ornament-line max-w-[200px] mx-auto mb-5">
            <span className="font-body text-[11px] tracking-[0.4em] uppercase text-accent font-semibold">
              <Sparkles className="inline w-3 h-3 mr-1.5 -mt-0.5" />
              Tính năng
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-foreground leading-[1.05]">
            Mọi thứ bạn cần cho{" "}
            <span className="italic text-gradient-rose relative inline-block">
              ngày trọng đại
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                style={{ background: "var(--gradient-rose-gold)" }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            Một nền tảng đầy đủ — từ thiệp cưới online, quản lý khách mời tới livestream
            và nhận mừng cưới qua QR. Đẹp, mượt, không cần biết code.
          </p>
        </motion.div>

        {/* Bento grid: featured spans 2 cols on lg, others single */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-fr">
          {features.map((f, i) => {
            const Icon = f.icon;
            const isFeatured = !!f.featured;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 4) * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-3xl border border-border/70 bg-card/85 backdrop-blur-xl p-6 md:p-7 transition-all duration-500 hover:border-accent/40 hover:shadow-elegant ${
                  isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                }`}
                style={{
                  boxShadow: "0 1px 0 hsl(0 0% 100% / 0.6) inset, var(--shadow-card)",
                }}
              >
                {/* Tint glow */}
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
                  style={{ background: `${f.tint}` }}
                />

                {/* Corner shine for featured */}
                {isFeatured && (
                  <>
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage: `radial-gradient(circle at 20% 20%, ${f.tint} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${f.tint} 0%, transparent 50%)`,
                      }}
                    />
                    <motion.div
                      aria-hidden
                      className="absolute -inset-[1px] rounded-3xl pointer-events-none"
                      style={{
                        background: `linear-gradient(120deg, transparent 40%, ${f.tint}55 50%, transparent 60%)`,
                        WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                        WebkitMaskComposite: "xor" as any,
                        padding: 1,
                      }}
                      animate={{ backgroundPosition: ["-200% 0%", "200% 0%"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />
                  </>
                )}

                <div className="relative h-full flex flex-col">
                  {/* Badge */}
                  {f.badge && (
                    <span
                      className="absolute top-0 right-0 -mt-1 -mr-1 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold tracking-wider uppercase text-white shadow-md"
                      style={{ background: `linear-gradient(135deg, ${f.tint}, ${f.tint}cc)` }}
                    >
                      {f.badge}
                    </span>
                  )}

                  {/* Icon */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]"
                      style={{
                        background: `linear-gradient(135deg, ${f.tint}25, ${f.tint}10)`,
                        boxShadow: `inset 0 1px 0 hsl(0 0% 100% / 0.7), 0 6px 18px -10px ${f.tint}`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-500"
                        strokeWidth={1.6}
                        style={{ color: f.tint, filter: `drop-shadow(0 1px 4px ${f.tint}80)` }}
                      />
                      {/* tiny twinkle */}
                      <motion.span
                        className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-white"
                        style={{ boxShadow: `0 0 8px ${f.tint}` }}
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: (i % 5) * 0.4 }}
                      />
                    </div>
                    {isFeatured && (
                      <Heart className="w-4 h-4 ml-auto animate-heartbeat" fill={f.tint} style={{ color: f.tint }} />
                    )}
                  </div>

                  {/* Text */}
                  <h3
                    className={`font-display font-semibold text-foreground leading-tight mb-2 ${
                      isFeatured ? "text-2xl md:text-3xl" : "text-xl"
                    }`}
                  >
                    {f.title}
                  </h3>
                  <p
                    className={`text-muted-foreground font-body leading-relaxed ${
                      isFeatured ? "text-base md:text-[15px] max-w-md" : "text-sm"
                    }`}
                  >
                    {f.desc}
                  </p>

                  {/* Featured extra content */}
                  {isFeatured && (
                    <div className="mt-auto pt-6">
                      <div className="flex flex-wrap gap-2">
                        {["Tên & ngày", "Màu sắc", "Ảnh cưới", "Nhạc nền", "Câu chuyện"].map((chip) => (
                          <span
                            key={chip}
                            className="px-3 py-1.5 rounded-full text-xs font-body font-medium border border-border bg-background/60 backdrop-blur text-foreground/80"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hover divider */}
                  <div
                    className="mt-5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
                    style={{ background: `linear-gradient(90deg, ${f.tint}, transparent)` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PremiumFeatures;
