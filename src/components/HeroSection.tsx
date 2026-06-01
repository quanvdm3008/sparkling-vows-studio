import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles, ChevronDown, Star } from "lucide-react";
import { useRef } from "react";
import heroImage from "@/assets/hero-wedding.jpg";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.7]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Parallax background image */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 will-change-transform">
        <img
          src={heroImage}
          alt="Lễ cưới lãng mạn"
          className="w-full h-[120%] object-cover"
          loading="eager"
        />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-light/40 via-transparent to-cream/30 mix-blend-soft-light" />
      </motion.div>

      {/* Decorative gold ornaments */}
      <div className="absolute top-32 left-10 w-32 h-32 rounded-full border border-accent/30 hidden md:block animate-float" />
      <div className="absolute bottom-32 right-12 w-20 h-20 rounded-full border border-accent/20 hidden md:block animate-float" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <motion.div style={{ y: contentY }} className="relative z-10 text-center px-5 max-w-5xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-7 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-soft"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="font-body text-xs font-semibold tracking-widest uppercase text-foreground/80">
            Premium Wedding Invitations · 2026
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="ornament-line max-w-md mx-auto mb-6"
        >
          <Heart className="w-4 h-4 fill-accent text-accent animate-heartbeat" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display text-[14vw] sm:text-7xl md:text-8xl lg:text-[7.5rem] font-medium text-primary-foreground leading-[0.95] tracking-tight"
        >
          Thiệp Cưới
          <span className="block italic font-light text-[10vw] sm:text-5xl md:text-6xl lg:text-7xl mt-1 text-gradient-gold">
            của riêng hai người
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-base md:text-lg text-primary-foreground/90 font-body mt-8 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Studio thiệp cưới online cao cấp. Tùy chỉnh trong vài phút, gửi qua link,
          quản lý khách mời và lưu lại từng lời chúc cho ngày trọng đại.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#templates" className="btn-luxury">
            <Sparkles className="w-4 h-4" />
            Tạo thiệp ngay
          </a>
          <a
            href="#templates"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/50 text-primary-foreground font-body font-semibold text-base backdrop-blur-md hover:bg-white/15 transition-all"
          >
            Xem mẫu thiệp
          </a>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-primary-foreground/90"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["👰", "🤵", "💍"].map((e, i) => (
                <span key={i} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur border border-white/40 grid place-items-center text-sm">
                  {e}
                </span>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                ))}
                <span className="ml-1.5 font-body text-xs font-bold">4.9/5</span>
              </div>
              <p className="font-body text-[11px] opacity-80">12,000+ cặp đôi tin dùng</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/30 hidden sm:block" />
          <div className="text-left">
            <p className="font-display text-xl font-semibold">98%</p>
            <p className="font-body text-[11px] opacity-80">Khách hài lòng</p>
          </div>
          <div className="h-8 w-px bg-white/30 hidden sm:block" />
          <div className="text-left">
            <p className="font-display text-xl font-semibold">50+</p>
            <p className="font-body text-[11px] opacity-80">Mẫu thiệp cao cấp</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#templates"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase">Khám phá</span>
        <ChevronDown className="w-5 h-5" />
      </motion.a>
    </section>
  );
};

export default HeroSection;
