import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Heart, Calendar, MapPin, Clock, Music as MusicIcon, Camera, ChevronDown, Send, Sparkles, CalendarPlus } from "lucide-react";
import FallingPetals from "@/components/FallingPetals";
import WishesWall from "@/components/WishesWall";
import MusicPlayer from "@/components/MusicPlayer";
import LiveWishToast from "@/components/LiveWishToast";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import SectionDivider from "@/components/SectionDivider";
import ScrollProgress from "@/components/ScrollProgress";
import LoveQuote from "@/components/LoveQuote";
import ScrollToTop from "@/components/ScrollToTop";

import { getTheme, type WeddingTheme } from "@/data/themes";

import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import coupleProposal from "@/assets/couple-proposal.jpg";
import venueImg from "@/assets/venue.jpg";
import ringsImg from "@/assets/rings.jpg";
import heroImg from "@/assets/hero-wedding.jpg";

// ─── Countdown Hook ──────────────────────────────────
const useCountdown = (targetDate: string) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return clearInterval(timer);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return timeLeft;
};

// ─── Nav Bar ──────────────────────────────────────────
const NavBar = ({ accentColor, theme }: { accentColor: string; theme: WeddingTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme.id === "modern" || theme.id === "royal";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Trang chủ", href: "#hero" },
    { label: "Câu chuyện", href: "#story" },
    { label: "Album", href: "#gallery" },
    { label: "Dịch vụ", href: "#services" },
    { label: "Sự kiện", href: "#events" },
    { label: "RSVP", href: "#rsvp" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? "bg-black/80 backdrop-blur-lg shadow-md"
            : "bg-background/90 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-1 sm:gap-6 px-4 py-3">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-xs sm:text-sm font-body font-medium transition-colors px-2 py-1 rounded-full"
            style={{
              color: scrolled ? (isDark ? "#e0e0e0" : undefined) : "rgba(255,255,255,0.85)",
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

// ─── Hero Variants ────────────────────────────────────
const HeroFullscreen = ({ groomName, brideName, date, accentColor, heroOverlay }: HeroProps) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: heroOverlay }} />
      </motion.div>
      <motion.div style={{ opacity }} className="relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
          <Heart className="w-14 h-14 mx-auto mb-6 animate-heartbeat" fill={accentColor} style={{ color: accentColor }} />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-primary-foreground/70 text-xs tracking-[0.5em] uppercase font-body mb-6">
          We're Getting Married
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary-foreground leading-none">
          {groomName}
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="block text-3xl sm:text-4xl italic font-normal my-3" style={{ color: accentColor }}>&</motion.span>
          {brideName}
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.5, duration: 1 }} className="w-32 h-[1px] mx-auto my-8" style={{ backgroundColor: accentColor }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="text-primary-foreground/80 font-body text-lg">
          {date && new Date(date).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </motion.p>
      </motion.div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <ChevronDown className="w-8 h-8 text-primary-foreground/50" />
      </motion.div>
    </section>
  );
};

const HeroCinematic = ({ groomName, brideName, date, accentColor, heroOverlay }: HeroProps) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section id="hero" className="relative h-screen flex items-end justify-center overflow-hidden pb-24">
      <motion.div className="absolute inset-0">
        <motion.img src={heroImg} alt="" className="w-full h-full object-cover" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
        <div className="absolute inset-0" style={{ background: heroOverlay }} />
        {/* Cinematic bars */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-black/60" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/60" />
      </motion.div>
      <motion.div style={{ opacity }} className="relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.2 }} className="mb-8">
          <span className="text-xs tracking-[1em] uppercase font-body text-primary-foreground/50">The Wedding of</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, letterSpacing: "0.5em" }} animate={{ opacity: 1, letterSpacing: "0.15em" }} transition={{ delay: 0.8, duration: 1.5 }} className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-primary-foreground">
          {groomName} <span style={{ color: accentColor }}>&</span> {brideName}
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2, duration: 1.5 }} className="w-48 h-[1px] mx-auto my-8" style={{ backgroundColor: accentColor }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-primary-foreground/60 font-body text-sm tracking-[0.3em] uppercase">
          {date && new Date(date).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </motion.p>
      </motion.div>
    </section>
  );
};

const HeroSplit = ({ groomName, brideName, date, accentColor, heroOverlay }: HeroProps) => (
  <section id="hero" className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
    <div className="flex-1 relative">
      <img src={heroImg} alt="" className="w-full h-full object-cover min-h-[50vh]" />
      <div className="absolute inset-0" style={{ background: heroOverlay }} />
    </div>
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex-1 flex flex-col items-center justify-center p-8 md:p-16">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
        <Heart className="w-10 h-10 mb-6 animate-heartbeat" fill={accentColor} style={{ color: accentColor }} />
      </motion.div>
      <p className="text-xs tracking-[0.5em] uppercase font-body mb-4" style={{ color: accentColor }}>We're Getting Married</p>
      <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground text-center leading-tight">
        {groomName}
        <span className="block text-2xl italic font-normal my-2" style={{ color: accentColor }}>&</span>
        {brideName}
      </h1>
      <div className="w-20 h-[1px] my-6" style={{ backgroundColor: accentColor }} />
      <p className="text-muted-foreground font-body">
        {date && new Date(date).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
      </p>
    </motion.div>
  </section>
);

const HeroMinimal = ({ groomName, brideName, date, accentColor }: HeroProps) => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="relative z-10 text-center px-4">
      <p className="text-xs tracking-[0.6em] uppercase font-body mb-10" style={{ color: accentColor }}>The Wedding of</p>
      <h1 className="font-display text-6xl md:text-9xl font-light text-foreground tracking-tight">
        {groomName}
      </h1>
      <div className="flex items-center justify-center gap-6 my-6">
        <div className="w-20 h-[0.5px] bg-foreground/20" />
        <span className="font-display text-2xl" style={{ color: accentColor }}>&</span>
        <div className="w-20 h-[0.5px] bg-foreground/20" />
      </div>
      <h1 className="font-display text-6xl md:text-9xl font-light text-foreground tracking-tight">
        {brideName}
      </h1>
      <p className="text-muted-foreground font-body mt-10 text-sm tracking-[0.2em]">
        {date && new Date(date).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
      </p>
    </motion.div>
  </section>
);

const HeroElegantFrame = ({ groomName, brideName, date, accentColor, heroOverlay }: HeroProps) => (
  <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
    <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: heroOverlay }} />
    {/* Decorative frame */}
    <div className="absolute inset-6 md:inset-12 border pointer-events-none z-10" style={{ borderColor: `${accentColor}50` }} />
    <div className="absolute inset-8 md:inset-14 border pointer-events-none z-10" style={{ borderColor: `${accentColor}30` }} />
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="relative z-10 text-center px-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mb-4">
        <span className="text-2xl">{["🌸", "🥀", "💜", "✧"][Math.floor(Math.random() * 4)]}</span>
      </motion.div>
      <p className="text-primary-foreground/60 text-xs tracking-[0.5em] uppercase font-body mb-6">We Invite You to Celebrate</p>
      <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-primary-foreground leading-none">
        {groomName}
        <span className="block text-3xl italic font-normal my-4" style={{ color: accentColor }}>&</span>
        {brideName}
      </h1>
      <div className="flex items-center justify-center gap-4 my-8">
        <div className="w-12 h-[1px]" style={{ backgroundColor: accentColor }} />
        <Heart className="w-4 h-4" fill={accentColor} style={{ color: accentColor }} />
        <div className="w-12 h-[1px]" style={{ backgroundColor: accentColor }} />
      </div>
      <p className="text-primary-foreground/70 font-body">
        {date && new Date(date).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
      </p>
    </motion.div>
  </section>
);

interface HeroProps {
  groomName: string;
  brideName: string;
  date: string;
  accentColor: string;
  heroOverlay?: string;
}

const HeroSection = (props: HeroProps & { style: string }) => {
  switch (props.style) {
    case "cinematic": return <HeroCinematic {...props} />;
    case "split": return <HeroSplit {...props} />;
    case "minimal": return <HeroMinimal {...props} />;
    case "elegant-frame": return <HeroElegantFrame {...props} />;
    default: return <HeroFullscreen {...props} />;
  }
};

// ─── Countdown Variants ───────────────────────────────
const CountdownCards = ({ items, accentColor, theme }: CountdownProps) => (
  <div className="grid grid-cols-4 gap-4 md:gap-8">
    {items.map((item, i) => (
      <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
        <div className={`bg-card ${theme.cardRadius} p-4 md:p-6 shadow-lg border border-border`}>
          <span className="font-display text-4xl md:text-5xl font-bold" style={{ color: accentColor }}>{String(item.value).padStart(2, "0")}</span>
          <p className="text-muted-foreground font-body text-xs md:text-sm mt-2 uppercase tracking-wider">{item.label}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

const CountdownCircles = ({ items, accentColor }: CountdownProps) => (
  <div className="grid grid-cols-4 gap-4 md:gap-8">
    {items.map((item, i) => (
      <motion.div key={item.label} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, type: "spring" }} className="text-center">
        <div className="relative w-20 h-20 md:w-28 md:h-28 mx-auto">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
            <motion.circle cx="50" cy="50" r="45" fill="none" stroke={accentColor} strokeWidth="3" strokeLinecap="round" strokeDasharray={283} initial={{ strokeDashoffset: 283 }} whileInView={{ strokeDashoffset: 283 - (item.value / item.max) * 283 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: i * 0.2 }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl md:text-3xl font-bold" style={{ color: accentColor }}>{String(item.value).padStart(2, "0")}</span>
          </div>
        </div>
        <p className="text-muted-foreground font-body text-xs mt-2 uppercase tracking-wider">{item.label}</p>
      </motion.div>
    ))}
  </div>
);

const CountdownFlip = ({ items, accentColor, theme }: CountdownProps) => (
  <div className="grid grid-cols-4 gap-3 md:gap-6">
    {items.map((item, i) => (
      <motion.div key={item.label} initial={{ opacity: 0, rotateX: -90 }} whileInView={{ opacity: 1, rotateX: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, type: "spring", damping: 15 }} className="text-center perspective-500">
        <div className={`bg-card ${theme.cardRadius} overflow-hidden shadow-xl border border-border`}>
          <div className="relative py-4 md:py-6">
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-border/50 z-10" />
            <span className="font-display text-4xl md:text-6xl font-bold relative z-0" style={{ color: accentColor }}>{String(item.value).padStart(2, "0")}</span>
          </div>
          <div className="py-2 border-t border-border/50" style={{ backgroundColor: `${accentColor}10` }}>
            <p className="text-muted-foreground font-body text-xs uppercase tracking-wider">{item.label}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const CountdownMinimalLine = ({ items, accentColor }: CountdownProps) => (
  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center justify-center gap-2 md:gap-6 text-center">
    {items.map((item, i) => (
      <div key={item.label} className="flex items-center gap-2 md:gap-6">
        <div>
          <span className="font-display text-4xl md:text-6xl font-light" style={{ color: accentColor }}>{String(item.value).padStart(2, "0")}</span>
          <p className="text-muted-foreground font-body text-[10px] uppercase tracking-widest mt-1">{item.label}</p>
        </div>
        {i < items.length - 1 && <span className="text-2xl md:text-4xl font-light text-muted-foreground/30">:</span>}
      </div>
    ))}
  </motion.div>
);

interface CountdownItem { value: number; label: string; max: number }
interface CountdownProps { items: CountdownItem[]; accentColor: string; theme: WeddingTheme }

const CountdownSection = ({ date, accentColor, sectionBg, theme }: { date: string; accentColor: string; sectionBg?: string; theme: WeddingTheme }) => {
  const countdown = useCountdown(date);
  const items: CountdownItem[] = [
    { value: countdown.days, label: "Ngày", max: 365 },
    { value: countdown.hours, label: "Giờ", max: 24 },
    { value: countdown.minutes, label: "Phút", max: 60 },
    { value: countdown.seconds, label: "Giây", max: 60 },
  ];

  const renderCountdown = () => {
    switch (theme.countdownStyle) {
      case "circles": return <CountdownCircles items={items} accentColor={accentColor} theme={theme} />;
      case "flip": return <CountdownFlip items={items} accentColor={accentColor} theme={theme} />;
      case "minimal-line": return <CountdownMinimalLine items={items} accentColor={accentColor} theme={theme} />;
      default: return <CountdownCards items={items} accentColor={accentColor} theme={theme} />;
    }
  };

  return (
    <section className="py-20 px-4" style={{ backgroundColor: sectionBg }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Đếm Ngược Ngày Trọng Đại
        </motion.h2>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} className="w-16 h-[2px] mx-auto mb-10" style={{ backgroundColor: accentColor }} />
        {renderCountdown()}
      </div>
    </section>
  );
};

// ─── Couple Section ───────────────────────────────────
const CoupleSection = ({ groomName, brideName, accentColor, theme }: { groomName: string; brideName: string; accentColor: string; theme: WeddingTheme }) => {
  const isAsymmetric = theme.sectionVariant === "asymmetric";
  
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>Giới thiệu</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">Cô Dâu & Chú Rể</h2>
        </motion.div>
        <div className={`grid md:grid-cols-2 gap-16 items-center ${isAsymmetric ? "md:gap-8" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: isAsymmetric ? 0 : -40, y: isAsymmetric ? 40 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="relative w-56 h-56 mx-auto mb-6">
              <motion.div
                className={`absolute inset-0 ${theme.cardRadius === "rounded-none" ? "" : "rounded-full"}`}
                style={{ border: `3px solid ${accentColor}`, transform: "rotate(6deg)" }}
                animate={theme.animationIntensity === "dramatic" ? { rotate: [6, -6, 6] } : {}}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <img src={couple1} alt="Chú rể" loading="lazy" className={`w-full h-full object-cover shadow-xl ${theme.cardRadius === "rounded-none" ? "" : "rounded-full"}`} />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">{groomName}</h3>
            <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed max-w-xs mx-auto">
              Một chàng trai lãng mạn, luôn mong muốn mang đến hạnh phúc cho người mình yêu thương.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: isAsymmetric ? 0 : 40, y: isAsymmetric ? -40 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="relative w-56 h-56 mx-auto mb-6">
              <motion.div
                className={`absolute inset-0 ${theme.cardRadius === "rounded-none" ? "" : "rounded-full"}`}
                style={{ border: `3px solid ${accentColor}`, transform: "rotate(-6deg)" }}
                animate={theme.animationIntensity === "dramatic" ? { rotate: [-6, 6, -6] } : {}}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <img src={couple1} alt="Cô dâu" loading="lazy" className={`w-full h-full object-cover shadow-xl ${theme.cardRadius === "rounded-none" ? "" : "rounded-full"}`} />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">{brideName}</h3>
            <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed max-w-xs mx-auto">
              Một cô gái dịu dàng, luôn tỏa sáng với nụ cười ấm áp và trái tim nhân hậu.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── Story Events ─────────────────────────────────────
const storyEvents = [
  { date: "Tháng 3, 2020", title: "Lần Đầu Gặp Gỡ", desc: "Chúng tôi gặp nhau lần đầu tại một quán cà phê nhỏ. Ánh mắt đầu tiên đã nói lên tất cả.", image: couple3 },
  { date: "Tháng 9, 2021", title: "Buổi Hẹn Đầu Tiên", desc: "Buổi tối đi dạo bên bờ sông, nắm tay nhau và cảm nhận nhịp đập trái tim đồng điệu.", image: couple2 },
  { date: "Tháng 12, 2023", title: "Lời Cầu Hôn", desc: "Trên bãi biển hoàng hôn, anh quỳ xuống và nói: 'Em có muốn cùng anh đi hết cuộc đời này không?'", image: coupleProposal },
  { date: "Tháng 12, 2025", title: "Ngày Trọng Đại", desc: "Chúng tôi chính thức trở thành một gia đình, bắt đầu hành trình mới đầy yêu thương.", image: ringsImg },
];

// Timeline: Alternating (default)
const TimelineAlternating = ({ accentColor, theme }: { accentColor: string; theme: WeddingTheme }) => (
  <div className="relative">
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-border hidden md:block" />
    {storyEvents.map((event, i) => (
      <motion.div key={event.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
        className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
        <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
          <span className="font-body text-xs font-semibold tracking-wider uppercase" style={{ color: accentColor }}>{event.date}</span>
          <h3 className="font-display text-2xl font-bold text-foreground mt-1 mb-2">{event.title}</h3>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">{event.desc}</p>
        </div>
        <div className="hidden md:flex items-center justify-center relative z-10">
          <motion.div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: accentColor }} animate={theme.animationIntensity === "dramatic" ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 2, repeat: Infinity }} />
        </div>
        <div className="flex-1">
          <motion.div whileHover={{ scale: 1.05 }} className={`${theme.cardRadius} overflow-hidden shadow-xl`}>
            <img src={event.image} alt={event.title} loading="lazy" className="w-full h-48 md:h-56 object-cover" />
          </motion.div>
        </div>
      </motion.div>
    ))}
  </div>
);

// Timeline: Left aligned
const TimelineLeftAligned = ({ accentColor, theme }: { accentColor: string; theme: WeddingTheme }) => (
  <div className="relative pl-8 md:pl-16 border-l-2 border-border">
    {storyEvents.map((event, i) => (
      <motion.div key={event.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative mb-12">
        <div className="absolute -left-[41px] md:-left-[65px] w-4 h-4 rounded-full shadow" style={{ backgroundColor: accentColor }} />
        <div className={`bg-card ${theme.cardRadius} p-5 shadow-lg border border-border flex flex-col md:flex-row gap-4`}>
          <img src={event.image} alt={event.title} loading="lazy" className={`w-full md:w-48 h-32 object-cover ${theme.cardRadius}`} />
          <div>
            <span className="font-body text-xs font-semibold tracking-wider uppercase" style={{ color: accentColor }}>{event.date}</span>
            <h3 className="font-display text-xl font-bold text-foreground mt-1 mb-1">{event.title}</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">{event.desc}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

// Timeline: Center cards
const TimelineCenterCards = ({ accentColor, theme }: { accentColor: string; theme: WeddingTheme }) => (
  <div className="space-y-8 max-w-2xl mx-auto">
    {storyEvents.map((event, i) => (
      <motion.div key={event.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }}
        className={`bg-card ${theme.cardRadius} overflow-hidden shadow-xl border border-border`}>
        <div className="relative h-48">
          <img src={event.image} alt={event.title} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-xs tracking-wider uppercase text-white/70 font-body">{event.date}</span>
            <h3 className="font-display text-xl font-bold text-white">{event.title}</h3>
          </div>
        </div>
        <div className="p-5">
          <p className="text-muted-foreground font-body text-sm leading-relaxed">{event.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

// Timeline: Horizontal Carousel (center big, sides small, auto-rotate)
const TimelineHorizontal = ({ accentColor, theme }: { accentColor: string; theme: WeddingTheme }) => {
  const [active, setActive] = useState(0);
  const total = storyEvents.length;

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % total), 4000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-4 md:gap-6 py-8" style={{ minHeight: 380 }}>
        {storyEvents.map((event, i) => {
          const offset = (i - active + total) % total;
          const isCenter = offset === 0;
          const isLeft = offset === total - 1;
          const isRight = offset === 1;
          const isVisible = isCenter || isLeft || isRight;

          if (!isVisible) return null;

          return (
            <motion.div
              key={event.title}
              layout
              animate={{
                scale: isCenter ? 1 : 0.75,
                opacity: isCenter ? 1 : 0.5,
                zIndex: isCenter ? 10 : 1,
                x: isLeft ? -40 : isRight ? 40 : 0,
              }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`cursor-pointer ${isCenter ? "w-80 md:w-[420px]" : "w-56 md:w-72"} flex-shrink-0 bg-card ${theme.cardRadius} overflow-hidden shadow-xl border border-border`}
              onClick={() => setActive(i)}
            >
              <div className="relative">
                <img src={event.image} alt={event.title} loading="lazy" className={`w-full object-cover ${isCenter ? "h-48 md:h-56" : "h-32 md:h-40"}`} />
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                  />
                )}
              </div>
              <div className={`p-4 ${isCenter ? "" : "hidden md:block"}`}>
                <span className="font-body text-xs font-semibold uppercase" style={{ color: accentColor }}>{event.date}</span>
                <h3 className={`font-display font-bold text-foreground mt-1 ${isCenter ? "text-lg" : "text-sm"}`}>{event.title}</h3>
                {isCenter && <p className="text-muted-foreground font-body text-xs leading-relaxed mt-1">{event.desc}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {storyEvents.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className="w-2.5 h-2.5 rounded-full transition-all duration-300" style={{ backgroundColor: i === active ? accentColor : `${accentColor}30`, transform: i === active ? "scale(1.3)" : "scale(1)" }} />
        ))}
      </div>
    </div>
  );
};

const StorySection = ({ accentColor, sectionBg, theme }: { accentColor: string; sectionBg?: string; theme: WeddingTheme }) => {
  const renderTimeline = () => {
    switch (theme.timelineStyle) {
      case "left-aligned": return <TimelineLeftAligned accentColor={accentColor} theme={theme} />;
      case "center-cards": return <TimelineCenterCards accentColor={accentColor} theme={theme} />;
      case "horizontal": return <TimelineHorizontal accentColor={accentColor} theme={theme} />;
      default: return <TimelineAlternating accentColor={accentColor} theme={theme} />;
    }
  };

  return (
    <section id="story" className="py-24 px-4" style={{ backgroundColor: sectionBg }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>Hành trình yêu thương</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">Câu Chuyện Tình Yêu</h2>
        </motion.div>
        {renderTimeline()}
      </div>
    </section>
  );
};

// ─── Gallery Variants ─────────────────────────────────
const galleryImages = [couple1, couple2, couple3, coupleProposal, venueImg, ringsImg];

const GalleryMasonry = ({ accentColor, theme }: GalleryProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((img, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -3 : 3 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring" }}
            whileHover={{ scale: 1.06, zIndex: 10 }} className={`cursor-pointer ${theme.cardRadius} overflow-hidden shadow-md ${i === 0 || i === 5 ? "row-span-2" : ""}`} onClick={() => setSelected(img)}>
            <motion.img src={img} alt={`Photo ${i + 1}`} loading="lazy" className={`w-full object-cover ${i === 0 || i === 5 ? "h-full" : "h-48 md:h-64"}`} whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} />
          </motion.div>
        ))}
      </div>
      <Lightbox image={selected} onClose={() => setSelected(null)} />
    </>
  );
};

const GalleryPolaroid = ({ accentColor, theme }: GalleryProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const rotations = [-3, 2, -1, 3, -2, 1];
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {galleryImages.map((img, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30, rotate: rotations[i] * 2 }} whileInView={{ opacity: 1, y: 0, rotate: rotations[i] }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ rotate: 0, scale: 1.05, y: -10 }} className="cursor-pointer bg-white p-3 pb-12 shadow-xl relative" onClick={() => setSelected(img)}>
            <img src={img} alt={`Photo ${i + 1}`} loading="lazy" className="w-full h-40 md:h-52 object-cover" />
            <p className="absolute bottom-3 left-0 right-0 text-center font-body text-xs text-gray-500 italic">khoảnh khắc {i + 1}</p>
          </motion.div>
        ))}
      </div>
      <Lightbox image={selected} onClose={() => setSelected(null)} />
    </>
  );
};

const GalleryGridOverlap = ({ accentColor, theme }: GalleryProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[500px] md:h-[600px]">
        {galleryImages.map((img, i) => {
          const spans = ["col-span-2 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-2 row-span-1", "col-span-1 row-span-2"];
          return (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, zIndex: 10 }} className={`${spans[i % 6]} cursor-pointer ${theme.cardRadius} overflow-hidden relative group`} onClick={() => setSelected(img)}>
              <img src={img} alt={`Photo ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          );
        })}
      </div>
      <Lightbox image={selected} onClose={() => setSelected(null)} />
    </>
  );
};

const Lightbox = ({ image, onClose }: { image: string | null; onClose: () => void }) => {
  if (!image) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer" onClick={onClose}>
      <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} src={image} alt="Full" className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain" />
    </motion.div>
  );
};

interface GalleryProps { accentColor: string; theme: WeddingTheme }

const GallerySection = ({ accentColor, theme }: GalleryProps) => {
  const renderGallery = () => {
    switch (theme.galleryStyle) {
      case "polaroid": return <GalleryPolaroid accentColor={accentColor} theme={theme} />;
      case "grid-overlap": return <GalleryGridOverlap accentColor={accentColor} theme={theme} />;
      default: return <GalleryMasonry accentColor={accentColor} theme={theme} />;
    }
  };

  return (
    <section id="gallery" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>Khoảnh khắc đẹp</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            <Camera className="w-8 h-8 inline-block mr-3 mb-1" style={{ color: accentColor }} />
            Album Ảnh Cưới
          </h2>
        </motion.div>
        {renderGallery()}
      </div>
    </section>
  );
};

// ─── Event Details ────────────────────────────────────
const EventsSection = ({ date, time, venue, address, accentColor, theme }: { date: string; time: string; venue: string; address: string; accentColor: string; theme: WeddingTheme }) => {
  const formattedDate = date ? new Date(date).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "";
  
  return (
    <section id="events" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={venueImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>Chi tiết</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">Sự Kiện Cưới</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`bg-card/80 backdrop-blur-sm ${theme.cardRadius} p-8 md:p-10 shadow-xl border border-border text-center`}>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor + "20" }}>
              <Heart className="w-7 h-7" style={{ color: accentColor }} />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Lễ Thành Hôn</h3>
            <div className="space-y-3 text-muted-foreground font-body">
              <div className="flex items-center justify-center gap-2"><Calendar className="w-4 h-4" style={{ color: accentColor }} /><span>{formattedDate}</span></div>
              <div className="flex items-center justify-center gap-2"><Clock className="w-4 h-4" style={{ color: accentColor }} /><span>{time}</span></div>
              <div className="flex items-center justify-center gap-2"><MapPin className="w-4 h-4" style={{ color: accentColor }} /><span>{venue}</span></div>
              <p className="text-sm pt-2">{address}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className={`bg-card/80 backdrop-blur-sm ${theme.cardRadius} p-8 md:p-10 shadow-xl border border-border text-center`}>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor + "20" }}>
              <MusicIcon className="w-7 h-7" style={{ color: accentColor }} />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Tiệc Cưới</h3>
            <div className="space-y-3 text-muted-foreground font-body">
              <div className="flex items-center justify-center gap-2"><Calendar className="w-4 h-4" style={{ color: accentColor }} /><span>{formattedDate}</span></div>
              <div className="flex items-center justify-center gap-2"><Clock className="w-4 h-4" style={{ color: accentColor }} /><span>18:00</span></div>
              <div className="flex items-center justify-center gap-2"><MapPin className="w-4 h-4" style={{ color: accentColor }} /><span>{venue}</span></div>
              <p className="text-sm pt-2">Cocktail, tiệc tối & nhảy cùng DJ</p>
            </div>
          </motion.div>
        </div>

        {/* Add to Calendar */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 text-center">
          <motion.a
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Đám cưới tại ${venue}`)}&dates=${date.replace(/-/g, "")}T${time.replace(":", "")}00/${date.replace(/-/g, "")}T235900&location=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-primary-foreground font-body font-semibold shadow-lg"
            style={{ backgroundColor: accentColor }}
          >
            <CalendarPlus className="w-4 h-4" />
            Thêm vào Lịch Google
          </motion.a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`mt-12 ${theme.cardRadius} overflow-hidden shadow-2xl`}>
          <img src={venueImg} alt="Venue" loading="lazy" className="w-full h-64 md:h-80 object-cover" />
        </motion.div>
      </div>
    </section>
  );
};

// ─── RSVP Section ─────────────────────────────────────
const RSVPSection = ({ accentColor, sectionBg, theme }: { accentColor: string; sectionBg?: string; theme: WeddingTheme }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", guests: "1", attending: "yes", message: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="rsvp" className="py-24 px-4" style={{ backgroundColor: sectionBg }}>
      <div className="max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>Xác nhận tham dự</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">RSVP</h2>
          <p className="text-muted-foreground font-body mt-3">Vui lòng xác nhận sự hiện diện của bạn</p>
        </motion.div>
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`text-center bg-card ${theme.cardRadius} p-10 shadow-xl border border-border`}>
            <Heart className="w-16 h-16 mx-auto mb-4 animate-heartbeat" fill={accentColor} style={{ color: accentColor }} />
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">Cảm Ơn Bạn!</h3>
            <p className="text-muted-foreground font-body">Chúng tôi rất vui khi nhận được phản hồi của bạn. Hẹn gặp bạn tại ngày trọng đại! 💕</p>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className={`bg-card ${theme.cardRadius} p-8 shadow-xl border border-border space-y-5`}>
            <div>
              <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Họ và Tên</label>
              <input type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={`w-full px-4 py-3 ${theme.cardRadius} border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary`} placeholder="Nhập tên của bạn" />
            </div>
            <div>
              <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Bạn sẽ tham dự?</label>
              <div className="flex gap-3">
                {[{ value: "yes", label: "Có, tôi sẽ đến! 🎉" }, { value: "no", label: "Rất tiếc, tôi không thể 😢" }].map((opt) => (
                  <button key={opt.value} type="button" onClick={() => setForm((f) => ({ ...f, attending: opt.value }))}
                    className={`flex-1 px-4 py-3 ${theme.cardRadius} font-body text-sm transition-all border ${form.attending === opt.value ? "border-transparent text-primary-foreground shadow-md" : "border-border text-foreground hover:border-primary"}`}
                    style={form.attending === opt.value ? { backgroundColor: accentColor } : {}}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Số khách</label>
              <select value={form.guests} onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))} className={`w-full px-4 py-3 ${theme.cardRadius} border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary`}>
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} người</option>)}
              </select>
            </div>
            <div>
              <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Lời nhắn</label>
              <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className={`w-full px-4 py-3 ${theme.cardRadius} border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px] resize-none`} placeholder="Gửi lời chúc đến cô dâu & chú rể..." />
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`w-full flex items-center justify-center gap-2 py-4 ${theme.cardRadius} text-primary-foreground font-body font-semibold text-base shadow-lg`} style={{ backgroundColor: accentColor }}>
              <Send className="w-4 h-4" />Gửi Xác Nhận
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────
const WeddingFooter = ({ groomName, brideName, accentColor, decorEmoji, date }: { groomName: string; brideName: string; accentColor: string; decorEmoji?: string; date?: string }) => (
  <footer className="py-20 px-4 text-center relative overflow-hidden">
    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${accentColor}08, transparent)` }} />
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10">
      <motion.div
        className="text-5xl mb-6"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {decorEmoji || "❤️"}
      </motion.div>
      <p className="font-body text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">Forever & Always</p>
      <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground">{groomName} & {brideName}</h3>
      <div className="flex items-center justify-center gap-4 my-6">
        <div className="w-12 h-[1px]" style={{ backgroundColor: `${accentColor}40` }} />
        <Heart className="w-4 h-4" fill={accentColor} style={{ color: accentColor }} />
        <div className="w-12 h-[1px]" style={{ backgroundColor: `${accentColor}40` }} />
      </div>
      {date && (
        <p className="font-body text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      )}
      <p className="text-muted-foreground font-body text-xs mt-6 opacity-50">
        Được tạo với 💕 bởi Wedding Cards Online
      </p>
    </motion.div>
  </footer>
);

// ─── Special Effects ──────────────────────────────────
const SpecialEffects = ({ effect, accentColor }: { effect?: string; accentColor: string }) => {
  if (!effect) return null;

  if (effect === "geometric-lines") {
    return (
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-5">
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} className="absolute h-[1px] w-full" style={{ top: `${20 + i * 15}%`, backgroundColor: accentColor }}
            animate={{ scaleX: [0, 1, 0], x: ["-50%", "0%", "50%"] }} transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }} />
        ))}
      </div>
    );
  }

  if (effect === "gold-particles") {
    return (
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{ backgroundColor: accentColor, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }} transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }} />
        ))}
      </div>
    );
  }

  return null;
};

// ─── Main Component ───────────────────────────────────
interface WeddingPageProps {
  groomName?: string;
  brideName?: string;
  date?: string;
  time?: string;
  venue?: string;
  address?: string;
  message?: string;
  accentColor?: string;
  templateId?: string;
}

const WeddingFullPage = ({
  groomName = "Minh Anh",
  brideName = "Thanh Hà",
  date = "2025-12-20",
  time = "17:30",
  venue = "White Palace Convention Center",
  address = "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
  message = "",
  accentColor: accentColorProp = "#E8B4B8",
  templateId = "romantic",
}: WeddingPageProps) => {
  const theme = getTheme(templateId);
  const accentColor = theme.textAccent;
  const isDark = templateId === "modern" || templateId === "royal";
  const [introComplete, setIntroComplete] = useState(false);

  // Divider variants per theme style
  const dividerVariant = theme.fontStyle === "modern" ? "line" as const
    : theme.fontStyle === "playful" ? "dots" as const
    : theme.fontStyle === "elegant" ? "wave" as const
    : "ornament" as const;

  const sectionComponents: Record<string, JSX.Element> = {
    countdown: <CountdownSection key="countdown" date={date} accentColor={accentColor} sectionBg={theme.sectionBg1} theme={theme} />,
    couple: <CoupleSection key="couple" groomName={groomName} brideName={brideName} accentColor={accentColor} theme={theme} />,
    story: <StorySection key="story" accentColor={accentColor} sectionBg={theme.sectionBg2} theme={theme} />,
    gallery: <GallerySection key="gallery" accentColor={accentColor} theme={theme} />,
    
    events: <EventsSection key="events" date={date} time={time} venue={venue} address={address} accentColor={accentColor} theme={theme} />,
    wishes: <WishesWall key="wishes" accentColor={accentColor} />,
    rsvp: <RSVPSection key="rsvp" accentColor={accentColor} sectionBg={theme.sectionBg1} theme={theme} />,
  };

  const orderedSections = theme.sectionOrder.map((key) => sectionComponents[key]);

  return (
    <>
      {/* Envelope intro - hides everything behind it */}
      {!introComplete && (
        <EnvelopeIntro
          groomName={groomName}
          brideName={brideName}
          accentColor={accentColor}
          decorEmoji={theme.decorEmoji}
          onComplete={() => setIntroComplete(true)}
        />
      )}

      {/* Main content only renders after envelope is opened */}
      {introComplete && (
        <motion.div
          className={`min-h-screen relative overflow-x-hidden ${isDark ? "dark" : ""}`}
          style={{ background: theme.bgGradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <ScrollProgress accentColor={accentColor} />
          <SpecialEffects effect={theme.specialEffect} accentColor={accentColor} />
          <FallingPetals emojis={theme.petalEmojis} />
          <NavBar accentColor={accentColor} theme={theme} />
          <LiveWishToast accentColor={accentColor} />
          <HeroSection groomName={groomName} brideName={brideName} date={date} accentColor={accentColor} heroOverlay={theme.heroOverlay} style={theme.heroStyle} />

          <LoveQuote accentColor={accentColor} />

          {orderedSections.map((section, i) => (
            <div key={i}>
              {i > 0 && <SectionDivider accentColor={accentColor} variant={dividerVariant} />}
              {section}
            </div>
          ))}

          <WeddingFooter groomName={groomName} brideName={brideName} accentColor={accentColor} decorEmoji={theme.decorEmoji} date={date} />
          <MusicPlayer accentColor={accentColor} />
          <ScrollToTop accentColor={accentColor} />
        </motion.div>
      )}
    </>
  );
};

export default WeddingFullPage;
