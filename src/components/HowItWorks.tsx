import { motion } from "framer-motion";
import { MousePointerClick, PenTool, Share2, PartyPopper } from "lucide-react";

const steps = [
  { icon: MousePointerClick, title: "Chọn Mẫu", desc: "Duyệt 50+ mẫu thiệp được nghệ sĩ thiết kế riêng." },
  { icon: PenTool, title: "Tùy Chỉnh", desc: "Thêm tên, ngày, ảnh và chọn nhạc nền cảm xúc." },
  { icon: Share2, title: "Chia Sẻ", desc: "Gửi link qua Zalo, Facebook, Email - đẹp trên mọi máy." },
  { icon: PartyPopper, title: "Tận Hưởng", desc: "Theo dõi RSVP, lời chúc và mừng cưới trong dashboard." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-28 px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="ornament-line max-w-[180px] mx-auto mb-5">
            <span className="font-body text-[11px] tracking-[0.3em] uppercase text-accent font-semibold">
              Quy trình
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-medium text-foreground leading-[1.05]">
            Bốn bước để có thiệp <span className="italic text-gradient-rose">trong mơ</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative text-center group"
            >
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-rose-gold opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative w-full h-full rounded-full bg-card border border-border shadow-card flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-500">
                  <step.icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-foreground text-background font-display text-xs font-semibold grid place-items-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-[220px] mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
