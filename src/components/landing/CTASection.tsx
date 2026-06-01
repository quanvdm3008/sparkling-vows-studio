import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-28 px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden p-10 md:p-20 text-center shadow-elegant"
          style={{
            background:
              "linear-gradient(135deg, hsl(0 25% 14%) 0%, hsl(346 30% 22%) 60%, hsl(0 25% 14%) 100%)",
          }}
        >
          {/* Decorative ornaments */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full border border-accent/30 hidden md:block" />
          <div className="absolute bottom-10 right-16 w-12 h-12 rounded-full border border-accent/40 hidden md:block" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-7 rounded-full bg-white/10 backdrop-blur border border-white/20">
              <Heart className="w-3.5 h-3.5 fill-accent text-accent" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-background/90">
                Sẵn sàng cho ngày trọng đại?
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-background leading-[1.05] max-w-4xl mx-auto">
              Bắt đầu thiệp cưới <span className="italic text-gradient-gold">của hai bạn</span>
              <br className="hidden md:block" /> ngay hôm nay.
            </h2>

            <p className="mt-6 text-background/75 font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Miễn phí thử nghiệm. Không cần thẻ tín dụng. Chỉ vài phút để có thiệp cưới đẹp như mơ.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#templates" className="btn-luxury">
                <Sparkles className="w-4 h-4" />
                Tạo thiệp ngay
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#templates"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-background/40 text-background font-body font-semibold text-base hover:bg-background/10 transition-all"
              >
                Xem mẫu thiệp
              </a>
            </div>

            <p className="mt-8 font-body text-xs tracking-[0.3em] uppercase text-background/50">
              Đã có 12,000+ cặp đôi tin dùng
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
