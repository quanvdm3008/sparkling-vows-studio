import { motion } from "framer-motion";
import {
  Sparkles, ClipboardCheck, Users, Image as ImageIcon,
  MapPin, QrCode, Video, Send, Crown, Globe, LayoutDashboard, Music
} from "lucide-react";

const features = [
  { icon: Sparkles, title: "Thiệp cá nhân hóa", desc: "Tùy chỉnh tên, ngày, ảnh, màu sắc theo phong cách riêng của hai bạn." },
  { icon: ClipboardCheck, title: "RSVP online", desc: "Khách mời xác nhận tham dự ngay trên thiệp, đồng bộ realtime." },
  { icon: Users, title: "Quản lý khách mời", desc: "Danh sách, nhóm bàn, ghi chú món ăn - theo dõi trong một dashboard." },
  { icon: ImageIcon, title: "Album ảnh cưới", desc: "Trình bày bộ ảnh pre-wedding với gallery cao cấp, lazy-load mượt." },
  { icon: MapPin, title: "Bản đồ chỉ đường", desc: "Tích hợp Google Maps - khách chạm là mở dẫn đường ngay." },
  { icon: QrCode, title: "QR mừng cưới", desc: "Tạo QR Momo, ZaloPay, ngân hàng - nhận mừng cưới văn minh." },
  { icon: Video, title: "Livestream lễ cưới", desc: "Phát trực tiếp YouTube/Facebook cho người thân ở xa cùng tham dự." },
  { icon: Send, title: "Gửi qua Zalo/Mail", desc: "Một link gửi qua Zalo, Facebook Messenger, Email - đẹp trên mọi máy." },
  { icon: Crown, title: "Theme cao cấp", desc: "50+ mẫu thiết kế bởi nghệ sĩ - cập nhật mới mỗi tháng." },
  { icon: Globe, title: "Tên miền riêng", desc: "Gắn thiệp cưới vào tên miền của bạn: tencua-em.com." },
  { icon: LayoutDashboard, title: "Dashboard quản lý", desc: "Theo dõi RSVP, lời chúc, mừng cưới - tất cả ở một nơi." },
  { icon: Music, title: "Nhạc nền cảm xúc", desc: "Chọn bản nhạc yêu thích, khách mở thiệp là vang lên." },
];

const PremiumFeatures = () => {
  return (
    <section id="features" className="relative py-28 px-5 bg-gradient-blush noise-overlay overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="ornament-line max-w-[180px] mx-auto mb-5">
            <span className="font-body text-[11px] tracking-[0.3em] uppercase text-accent font-semibold">
              Tính năng
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-medium text-foreground leading-[1.05]">
            Mọi thứ bạn cần cho <span className="italic text-gradient-rose">ngày trọng đại</span>
          </h2>
          <p className="mt-6 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            Một nền tảng đầy đủ - từ thiệp cưới online, quản lý khách mời tới livestream
            và nhận mừng cưới qua QR. Đẹp, mượt, không cần biết code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              className="premium-card group p-6"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-rose-gold opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-blush flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <f.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 leading-tight">
                  {f.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {f.desc}
                </p>
                <div className="gold-divider mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumFeatures;
