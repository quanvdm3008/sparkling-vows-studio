import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Minh Anh & Thanh Hà",
    location: "TP. Hồ Chí Minh",
    rating: 5,
    text: "Thiệp đẹp đến mức bạn bè cứ tưởng tụi mình thuê studio riêng. Khách mời confirm RSVP nhanh, không cần gọi điện hỏi từng người.",
    avatar: "💑",
  },
  {
    name: "Quốc Bảo & Phương Linh",
    location: "Hà Nội",
    rating: 5,
    text: "Mê nhất là QR mừng cưới và phần livestream - ông bà nội ở quê vẫn xem được lễ. Cảm ơn team đã làm rất tâm huyết.",
    avatar: "💖",
  },
  {
    name: "Đức Huy & Mai Trang",
    location: "Đà Nẵng",
    rating: 5,
    text: "Tùy chỉnh dễ, gửi qua Zalo gọn gàng, không cần in giấy. Vừa tiết kiệm vừa sang trọng, đúng vibe đám cưới của tụi mình.",
    avatar: "🌸",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-28 px-5 bg-gradient-blush overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="ornament-line max-w-[180px] mx-auto mb-5">
            <span className="font-body text-[11px] tracking-[0.3em] uppercase text-accent font-semibold">
              Cảm nhận
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-medium text-foreground leading-[1.05]">
            12,000+ cặp đôi đã <span className="italic text-gradient-rose">yêu thích</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative bg-card rounded-3xl p-8 shadow-card border border-border/60 flex flex-col"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/20" strokeWidth={1} />
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="font-display text-lg md:text-xl italic text-foreground/90 leading-relaxed flex-1">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <p className="font-display text-base font-semibold text-foreground">{t.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{t.location}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
