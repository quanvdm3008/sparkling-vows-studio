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
import CinematicLightBG from "@/components/cinematic/CinematicLightBG";
import GlassCountdown from "@/components/cinematic/GlassCountdown";
import ScrollStoryTimeline from "@/components/cinematic/ScrollStoryTimeline";
import MagazineGallery from "@/components/cinematic/MagazineGallery";
import GalleryDispatcher from "@/components/galleries/GalleryDispatcher";
import TravelMap from "@/components/cinematic/TravelMap";
import WeatherWidget from "@/components/cinematic/WeatherWidget";
import MemoriesSection from "@/components/cinematic/MemoriesSection";
import ChapterTransition from "@/components/cinematic/ChapterTransition";

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

// ─── Couple Variants ──────────────────────────────────
interface CoupleProps { groomName: string; brideName: string; accentColor: string; theme: WeddingTheme }

const PersonAvatar = ({ name, img, accentColor, rotate, theme, desc, animate }: { name: string; img: string; accentColor: string; rotate: number; theme: WeddingTheme; desc: string; animate?: boolean }) => (
  <div className="text-center">
    <div className="relative w-56 h-56 mx-auto mb-6">
      <motion.div
        className={`absolute inset-0 ${theme.cardRadius === "rounded-none" ? "" : "rounded-full"}`}
        style={{ border: `3px solid ${accentColor}`, transform: `rotate(${rotate}deg)` }}
        animate={animate ? { rotate: [rotate, -rotate, rotate] } : {}}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <img src={img} alt={name} loading="lazy" className={`w-full h-full object-cover shadow-xl ${theme.cardRadius === "rounded-none" ? "" : "rounded-full"}`} />
    </div>
    <h3 className="font-display text-2xl font-bold text-foreground">{name}</h3>
    <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed max-w-xs mx-auto">{desc}</p>
  </div>
);

const CoupleSideBySide = ({ groomName, brideName, accentColor, theme }: CoupleProps) => (
  <div className="grid md:grid-cols-2 gap-16 items-center">
    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
      <PersonAvatar name={groomName} img={couple1} accentColor={accentColor} rotate={6} theme={theme} desc="Một chàng trai lãng mạn, luôn mong muốn mang đến hạnh phúc cho người mình yêu thương." animate={theme.animationIntensity === "dramatic"} />
    </motion.div>
    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
      <PersonAvatar name={brideName} img={couple2} accentColor={accentColor} rotate={-6} theme={theme} desc="Một cô gái dịu dàng, luôn tỏa sáng với nụ cười ấm áp và trái tim nhân hậu." animate={theme.animationIntensity === "dramatic"} />
    </motion.div>
  </div>
);

const CoupleStackedOverlap = ({ groomName, brideName, accentColor, theme }: CoupleProps) => (
  <div className="relative max-w-2xl mx-auto min-h-[560px] py-8">
    <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:absolute md:left-0 md:top-0 z-10">
      <PersonAvatar name={groomName} img={couple1} accentColor={accentColor} rotate={-4} theme={theme} desc="Chàng trai của em." />
    </motion.div>
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:absolute md:right-0 md:bottom-0 z-20 mt-8 md:mt-0">
      <PersonAvatar name={brideName} img={couple2} accentColor={accentColor} rotate={4} theme={theme} desc="Cô gái của anh." />
    </motion.div>
    <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
      <Heart className="w-20 h-20 animate-heartbeat" fill={accentColor} style={{ color: accentColor }} />
    </div>
  </div>
);

const CoupleDiagonal = ({ groomName, brideName, accentColor, theme }: CoupleProps) => (
  <div className="grid md:grid-cols-5 gap-8 items-center">
    <motion.div initial={{ opacity: 0, x: -60, rotate: -8 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true }} className="md:col-span-2 md:translate-y-[-30px]">
      <PersonAvatar name={groomName} img={couple1} accentColor={accentColor} rotate={-8} theme={theme} desc="Chú rể của ngày trọng đại." />
    </motion.div>
    <div className="hidden md:flex items-center justify-center md:col-span-1">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="text-5xl" style={{ color: accentColor }}>✦</motion.div>
    </div>
    <motion.div initial={{ opacity: 0, x: 60, rotate: 8 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true }} className="md:col-span-2 md:translate-y-[30px]">
      <PersonAvatar name={brideName} img={couple2} accentColor={accentColor} rotate={8} theme={theme} desc="Cô dâu xinh đẹp." />
    </motion.div>
  </div>
);

const CoupleCircularOrbit = ({ groomName, brideName, accentColor, theme }: CoupleProps) => (
  <div className="relative max-w-3xl mx-auto min-h-[600px] flex items-center justify-center py-10">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-dashed pointer-events-none" style={{ borderColor: `${accentColor}40` }} />
    <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute inset-12 rounded-full border pointer-events-none" style={{ borderColor: `${accentColor}20` }} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
      <motion.div initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.1 }}>
        <PersonAvatar name={groomName} img={couple1} accentColor={accentColor} rotate={0} theme={theme} desc="Chú rể." />
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.3 }}>
        <PersonAvatar name={brideName} img={couple2} accentColor={accentColor} rotate={0} theme={theme} desc="Cô dâu." />
      </motion.div>
    </div>
  </div>
);

const CoupleSplitFrame = ({ groomName, brideName, accentColor, theme }: CoupleProps) => (
  <div className="grid md:grid-cols-2 max-w-4xl mx-auto border" style={{ borderColor: `${accentColor}40` }}>
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="p-10 border-b md:border-b-0 md:border-r" style={{ borderColor: `${accentColor}40` }}>
      <PersonAvatar name={groomName} img={couple1} accentColor={accentColor} rotate={0} theme={theme} desc="Một nửa của em." />
    </motion.div>
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-10">
      <PersonAvatar name={brideName} img={couple2} accentColor={accentColor} rotate={0} theme={theme} desc="Một nửa của anh." />
    </motion.div>
  </div>
);

const CoupleSection = ({ groomName, brideName, accentColor, theme }: CoupleProps) => {
  const renderLayout = () => {
    switch (theme.coupleLayout) {
      case "stacked-overlap": return <CoupleStackedOverlap groomName={groomName} brideName={brideName} accentColor={accentColor} theme={theme} />;
      case "diagonal":        return <CoupleDiagonal groomName={groomName} brideName={brideName} accentColor={accentColor} theme={theme} />;
      case "circular-orbit":  return <CoupleCircularOrbit groomName={groomName} brideName={brideName} accentColor={accentColor} theme={theme} />;
      case "split-frame":     return <CoupleSplitFrame groomName={groomName} brideName={brideName} accentColor={accentColor} theme={theme} />;
      default:                return <CoupleSideBySide groomName={groomName} brideName={brideName} accentColor={accentColor} theme={theme} />;
    }
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>Giới thiệu</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">Cô Dâu & Chú Rể</h2>
        </motion.div>
        {renderLayout()}
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
interface EventInfo { icon: JSX.Element; title: string; date: string; time: string; venue: string; address: string }

const EventCard = ({ ev, accentColor, theme, variant = "default" }: { ev: EventInfo; accentColor: string; theme: WeddingTheme; variant?: "default" | "compact" | "row" }) => {
  if (variant === "row") {
    return (
      <div className={`flex items-center gap-5 bg-card/80 backdrop-blur-sm ${theme.cardRadius} p-5 border border-border shadow-md`}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColor + "20" }}>{ev.icon}</div>
        <div className="text-left flex-1">
          <h3 className="font-display text-lg font-bold text-foreground">{ev.title}</h3>
          <p className="text-muted-foreground font-body text-sm">{ev.date} · {ev.time} · {ev.venue}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`bg-card/80 backdrop-blur-sm ${theme.cardRadius} p-8 md:p-10 shadow-xl border border-border text-center`}>
      <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor + "20" }}>{ev.icon}</div>
      <h3 className="font-display text-2xl font-bold text-foreground mb-4">{ev.title}</h3>
      <div className="space-y-3 text-muted-foreground font-body">
        <div className="flex items-center justify-center gap-2"><Calendar className="w-4 h-4" style={{ color: accentColor }} /><span>{ev.date}</span></div>
        <div className="flex items-center justify-center gap-2"><Clock className="w-4 h-4" style={{ color: accentColor }} /><span>{ev.time}</span></div>
        <div className="flex items-center justify-center gap-2"><MapPin className="w-4 h-4" style={{ color: accentColor }} /><span>{ev.venue}</span></div>
        <p className="text-sm pt-2">{ev.address}</p>
      </div>
    </div>
  );
};

const EventsSection = ({ date, time, venue, address, accentColor, theme }: { date: string; time: string; venue: string; address: string; accentColor: string; theme: WeddingTheme }) => {
  const formattedDate = date ? new Date(date).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "";
  const events: EventInfo[] = [
    { icon: <Heart className="w-7 h-7" style={{ color: accentColor }} />, title: "Lễ Thành Hôn", date: formattedDate, time, venue, address },
    { icon: <MusicIcon className="w-7 h-7" style={{ color: accentColor }} />, title: "Tiệc Cưới", date: formattedDate, time: "18:00", venue, address: "Cocktail, tiệc tối & nhảy cùng DJ" },
  ];

  const renderLayout = () => {
    switch (theme.eventsLayout) {
      case "split-image":
        return (
          <div className="grid md:grid-cols-2 gap-0 overflow-hidden shadow-2xl">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative min-h-[300px]">
              <img src={venueImg} alt="Venue" loading="lazy" className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accentColor}40, transparent)` }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card p-8 md:p-10 space-y-6">
              {events.map((ev, i) => <EventCard key={i} ev={ev} accentColor={accentColor} theme={theme} variant="row" />)}
            </motion.div>
          </div>
        );
      case "stacked-bands":
        return (
          <div className="space-y-4">
            {events.map((ev, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <EventCard ev={ev} accentColor={accentColor} theme={theme} variant="row" />
              </motion.div>
            ))}
          </div>
        );
      case "single-feature":
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
            <EventCard ev={events[0]} accentColor={accentColor} theme={theme} />
            <div className="mt-4">
              <EventCard ev={events[1]} accentColor={accentColor} theme={theme} variant="row" />
            </div>
          </motion.div>
        );
      case "timeline-strip":
        return (
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px]" style={{ backgroundColor: `${accentColor}40` }} />
            <div className="space-y-10">
              {events.map((ev, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                  className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-6 w-3 h-3 rounded-full ring-4 ring-background" style={{ backgroundColor: accentColor }} />
                  <EventCard ev={ev} accentColor={accentColor} theme={theme} />
                </motion.div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((ev, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <EventCard ev={ev} accentColor={accentColor} theme={theme} />
              </motion.div>
            ))}
          </div>
        );
    }
  };

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
        {renderLayout()}

        {/* Add to Calendar */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 text-center">
          <motion.a
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Đám cưới tại ${venue}`)}&dates=${date.replace(/-/g, "")}T${time.replace(":", "")}00/${date.replace(/-/g, "")}T235900&location=${encodeURIComponent(address)}`}
            target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-primary-foreground font-body font-semibold shadow-lg"
            style={{ backgroundColor: accentColor }}>
            <CalendarPlus className="w-4 h-4" />
            Thêm vào Lịch Google
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// ─── RSVP Section (Compact Premium) ───────────────────
const RSVPSection = ({ accentColor, sectionBg, theme }: { accentColor: string; sectionBg?: string; theme: WeddingTheme }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", guests: "1", attending: "yes", message: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="rsvp" className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: sectionBg }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full opacity-[0.05]"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent 65%)` }} />
      </div>

      <div className="max-w-md mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8" style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }} />
            <span className="text-[10px] tracking-[0.5em] uppercase font-body" style={{ color: accentColor }}>R · S · V · P</span>
            <span className="h-[1px] w-8" style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }} />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Xác Nhận Tham Dự</h2>
          <p className="text-muted-foreground font-body text-sm mt-2">Sự hiện diện của bạn là món quà quý giá nhất</p>
        </motion.div>

        <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 18 }}
            className="relative overflow-hidden text-center bg-card/80 backdrop-blur-xl rounded-3xl p-10 border border-border/60"
            style={{ boxShadow: `0 24px 60px -20px ${accentColor}40` }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15`, boxShadow: `0 0 32px ${accentColor}40` }}
            >
              <Heart className="w-7 h-7" fill={accentColor} style={{ color: accentColor }} />
            </motion.div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">Cảm Ơn Bạn!</h3>
            <p className="text-muted-foreground font-body text-sm">Hẹn gặp bạn tại ngày trọng đại 💕</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="relative bg-card/80 backdrop-blur-xl rounded-3xl p-6 md:p-7 border border-border/60 space-y-4"
            style={{ boxShadow: `0 24px 60px -24px ${accentColor}30` }}
          >
            <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

            <div>
              <label className="block font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Tham dự</label>
              <div className="relative grid grid-cols-2 gap-1 p-1 rounded-2xl bg-muted/40 border border-border/40">
                {[{ value: "yes", label: "Sẽ đến 🎉" }, { value: "no", label: "Không thể 😢" }].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, attending: opt.value }))}
                    className={`relative py-2.5 rounded-xl font-body text-sm font-medium transition-all ${form.attending === opt.value ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {form.attending === opt.value && (
                      <motion.div
                        layoutId="rsvp-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{ backgroundColor: accentColor, boxShadow: `0 4px 16px ${accentColor}50` }}
                        transition={{ type: "spring", damping: 22, stiffness: 280 }}
                      />
                    )}
                    <span className="relative z-10">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-3">
              <div>
                <label className="block font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">Họ tên</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/60 bg-background/60 font-body text-sm focus:outline-none focus:ring-2 transition-all"
                  style={{ "--tw-ring-color": `${accentColor}60` } as React.CSSProperties}
                  placeholder="Tên của bạn"
                />
              </div>
              <div>
                <label className="block font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">Khách</label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
                  className="w-20 px-3 py-2.5 rounded-xl border border-border/60 bg-background/60 font-body text-sm focus:outline-none focus:ring-2 transition-all"
                  style={{ "--tw-ring-color": `${accentColor}60` } as React.CSSProperties}
                >
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">Lời nhắn (tuỳ chọn)</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border/60 bg-background/60 font-body text-sm focus:outline-none focus:ring-2 resize-none transition-all"
                style={{ "--tw-ring-color": `${accentColor}60` } as React.CSSProperties}
                placeholder="Gửi lời chúc tới cô dâu & chú rể..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-body font-semibold text-sm overflow-hidden group"
              style={{ backgroundColor: accentColor, boxShadow: `0 8px 28px ${accentColor}40` }}
            >
              <motion.span
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)` }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8 }}
              />
              <Send className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Gửi xác nhận</span>
            </motion.button>
          </motion.form>
        )}
        </AnimatePresence>
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

// ─── Section Animation Wrapper ───────────────────────
const SectionAnimation = ({ variant, index, children }: { variant: WeddingTheme["sectionAnimation"]; index: number; children: React.ReactNode }) => {
  const variants = {
    fadeUp:     { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 } },
    slideAlt:   { initial: { opacity: 0, x: index % 2 === 0 ? -60 : 60 }, whileInView: { opacity: 1, x: 0 } },
    zoomIn:     { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 } },
    maskReveal: { initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" }, whileInView: { opacity: 1, clipPath: "inset(0 0 0% 0)" } },
    tiltIn:     { initial: { opacity: 0, rotate: index % 2 === 0 ? -3 : 3, y: 40 }, whileInView: { opacity: 1, rotate: 0, y: 0 } },
    blurIn:     { initial: { opacity: 0, filter: "blur(12px)" }, whileInView: { opacity: 1, filter: "blur(0px)" } },
  } as const;
  const v = variants[variant] || variants.fadeUp;
  return (
    <motion.div initial={v.initial} whileInView={v.whileInView} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
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
  skipIntro?: boolean;
}

const WeddingFullPage = ({
  groomName = "Minh Anh",
  brideName = "Thanh Hà",
  date = "2027-02-14",
  time = "17:30",
  venue = "White Palace Convention Center",
  address = "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
  message = "",
  accentColor: accentColorProp = "#E8B4B8",
  templateId = "romantic",
  skipIntro = false,
}: WeddingPageProps) => {
  // ─── New bespoke templates: bypass legacy layout and render fully custom experience ───
  const registryEntry = templateRegistry[templateId];
  if (registryEntry) {
    const RegistryComponent = registryEntry.Component;
    const bespokeProps = { groomName, brideName, date, time, venue, address, message, accentColor: registryEntry.accent };
    if (skipIntro) return <RegistryComponent {...bespokeProps} />;
    return (
      <BespokeWithIntro
        {...bespokeProps}
        decorEmoji={"✦"}
        Component={RegistryComponent}
      />
    );
  }

  const theme = getTheme(templateId);

  const accentColor = theme.textAccent;
  const isDark = templateId === "modern" || templateId === "royal";
  const [introComplete, setIntroComplete] = useState(skipIntro);

  // Divider variants per theme style
  const dividerVariant = theme.fontStyle === "modern" ? "line" as const
    : theme.fontStyle === "playful" ? "dots" as const
    : theme.fontStyle === "elegant" ? "wave" as const
    : "ornament" as const;

  const sectionComponents: Record<string, JSX.Element> = {
    countdown: <GlassCountdown key="countdown" date={date} accentColor={accentColor} />,
    couple: <CoupleSection key="couple" groomName={groomName} brideName={brideName} accentColor={accentColor} theme={theme} />,
    story: <ScrollStoryTimeline key="story" accentColor={accentColor} />,
    gallery: <GalleryDispatcher key="gallery" theme={theme} accentColor={accentColor} />,

    events: <EventsSection key="events" date={date} time={time} venue={venue} address={address} accentColor={accentColor} theme={theme} />,
    wishes: <WishesWall key="wishes" accentColor={accentColor} theme={theme} />,
    rsvp: <RSVPSection key="rsvp" accentColor={accentColor} sectionBg={theme.sectionBg1} theme={theme} />,
  };

  // Chapter labels for cinematic transitions
  const chapterLabels: Record<string, string> = {
    countdown: "Save the Date",
    couple: "The Two of Us",
    story: "Our Journey",
    gallery: "Editorial Album",
    events: "The Celebration",
    wishes: "Voices of Love",
    rsvp: "Be With Us",
  };

  const orderedSections = theme.sectionOrder.map((key) => ({
    key,
    node: sectionComponents[key],
    label: chapterLabels[key] || "",
  }));

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
          <CinematicLightBG accentColor={accentColor} />
          <SpecialEffects effect={theme.specialEffect} accentColor={accentColor} />
          <FallingPetals emojis={theme.petalEmojis} />
          <NavBar accentColor={accentColor} theme={theme} />
          <LiveWishToast accentColor={accentColor} />
          <HeroSection groomName={groomName} brideName={brideName} date={date} accentColor={accentColor} heroOverlay={theme.heroOverlay} style={theme.heroStyle} />

          <LoveQuote accentColor={accentColor} />

          {orderedSections.map((s, i) => (
            <div key={s.key} className="relative">
              <ChapterTransition chapter={i + 1} label={s.label} accentColor={accentColor} />
              <SectionAnimation variant={theme.sectionAnimation} index={i}>{s.node}</SectionAnimation>
            </div>
          ))}

          {/* Bonus cinematic chapters */}
          <ChapterTransition chapter={orderedSections.length + 1} label="Memories" accentColor={accentColor} />
          <MemoriesSection accentColor={accentColor} />

          <WeatherWidget date={date} accentColor={accentColor} />

          <ChapterTransition chapter={orderedSections.length + 2} label="Travel Experience" accentColor={accentColor} />
          <TravelMap venue={venue} address={address} accentColor={accentColor} />

          <WeddingFooter groomName={groomName} brideName={brideName} accentColor={accentColor} decorEmoji={theme.decorEmoji} date={date} />
          <MusicPlayer accentColor={accentColor} />
          <ScrollToTop accentColor={accentColor} />
        </motion.div>
      )}
    </>
  );
};

export default WeddingFullPage;
