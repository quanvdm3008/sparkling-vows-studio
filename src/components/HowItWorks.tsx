import { motion } from "framer-motion";
import { MousePointerClick, PenTool, Share2, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    title: "Chọn Mẫu",
    desc: "Duyệt qua bộ sưu tập mẫu thiệp đa dạng",
  },
  {
    icon: PenTool,
    title: "Tùy Chỉnh",
    desc: "Thêm thông tin, chọn màu sắc và phông chữ",
  },
  {
    icon: Share2,
    title: "Chia Sẻ",
    desc: "Gửi thiệp qua link hoặc mạng xã hội",
  },
  {
    icon: PartyPopper,
    title: "Chúc Mừng!",
    desc: "Sẵn sàng cho ngày trọng đại của bạn",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-secondary/30 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body font-semibold text-sm tracking-widest uppercase">
            Hướng dẫn
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            Đơn Giản & Nhanh Chóng
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="text-2xl font-display font-bold text-foreground/20 mb-2">
                0{i + 1}
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
