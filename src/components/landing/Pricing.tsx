import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Heart } from "lucide-react";

const tiers = [
  {
    id: "basic",
    icon: Heart,
    name: "Basic",
    tagline: "Khởi đầu lãng mạn",
    highlight: false,
    features: [
      "Chọn từ 15+ mẫu thiệp cơ bản",
      "Tùy chỉnh tên, ngày, ảnh",
      "RSVP online cho khách mời",
      "Gửi qua link / mạng xã hội",
      "Hỗ trợ email trong giờ làm việc",
    ],
  },
  {
    id: "premium",
    icon: Sparkles,
    name: "Premium",
    tagline: "Lựa chọn được yêu thích nhất",
    highlight: true,
    features: [
      "Tất cả tính năng Basic",
      "50+ mẫu thiệp cao cấp",
      "Album ảnh cưới không giới hạn",
      "QR mừng cưới + bản đồ chỉ đường",
      "Quản lý khách mời chuyên sâu",
      "Nhạc nền cảm xúc, hiệu ứng riêng",
    ],
  },
  {
    id: "luxury",
    icon: Crown,
    name: "Luxury",
    tagline: "Đẳng cấp riêng cho hai bạn",
    highlight: false,
    features: [
      "Tất cả tính năng Premium",
      "Tên miền riêng tencua-em.com",
      "Livestream lễ cưới HD",
      "Thiết kế theme riêng theo concept",
      "Wedding planner đồng hành 1-1",
      "Hỗ trợ ưu tiên 24/7",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="relative py-28 px-5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background -z-10" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="ornament-line max-w-[180px] mx-auto mb-5">
            <span className="font-body text-[11px] tracking-[0.3em] uppercase text-accent font-semibold">
              Bảng giá
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-medium text-foreground leading-[1.05]">
            Chọn gói phù hợp với <span className="italic text-gradient-rose">câu chuyện</span> của bạn
          </h2>
          <p className="mt-6 text-muted-foreground font-body text-base md:text-lg">
            Mỗi gói được thiết kế cho từng giai đoạn chuẩn bị. Liên hệ để nhận tư vấn riêng cho ngày cưới của bạn.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative rounded-3xl p-8 lg:p-10 flex flex-col ${
                  tier.highlight
                    ? "bg-foreground text-background shadow-elegant scale-100 md:scale-[1.04] z-10"
                    : "bg-card border border-border shadow-card"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-rose-gold text-primary-foreground font-body text-[11px] font-bold tracking-widest uppercase shadow-gold">
                    Phổ biến nhất
                  </div>
                )}

                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-11 h-11 rounded-2xl grid place-items-center ${
                    tier.highlight ? "bg-accent/20 text-accent" : "bg-secondary text-accent"
                  }`}>
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-3xl font-semibold">{tier.name}</h3>
                </div>
                <p className={`font-body text-sm mb-6 ${tier.highlight ? "text-background/70" : "text-muted-foreground"}`}>
                  {tier.tagline}
                </p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl font-medium">Liên hệ</span>
                  </div>
                  <p className={`mt-2 font-body text-xs ${tier.highlight ? "text-background/60" : "text-muted-foreground"}`}>
                    Tư vấn riêng theo nhu cầu của bạn
                  </p>
                </div>

                <ul className="space-y-3.5 mb-10 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-body text-sm">
                      <span className={`mt-0.5 w-5 h-5 rounded-full grid place-items-center flex-shrink-0 ${
                        tier.highlight ? "bg-accent text-foreground" : "bg-secondary text-accent"
                      }`}>
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span className={tier.highlight ? "text-background/90" : "text-foreground/85"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#templates"
                  className={`text-center py-3.5 rounded-full font-body font-semibold text-sm transition-all ${
                    tier.highlight
                      ? "bg-gradient-rose-gold text-primary-foreground shadow-gold hover:-translate-y-0.5"
                      : "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  Liên hệ tư vấn
                </a>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center mt-12 font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Hoàn tiền 100% trong 7 ngày · Không ràng buộc
        </p>
      </div>
    </section>
  );
};

export default Pricing;
