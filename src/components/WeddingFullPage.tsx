import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Calendar, MapPin, Clock, Music as MusicIcon, Camera, ChevronDown, Send } from "lucide-react";
import FallingPetals from "@/components/FallingPetals";
import WishesWall from "@/components/WishesWall";
import MusicPlayer from "@/components/MusicPlayer";
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
const NavBar = ({ accentColor }: { accentColor: string }) => {
  const [scrolled, setScrolled] = useState(false);

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
        scrolled ? "bg-background/90 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-1 sm:gap-6 px-4 py-3">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`text-xs sm:text-sm font-body font-medium transition-colors px-2 py-1 rounded-full ${
              scrolled ? "text-foreground hover:text-primary" : "text-primary-foreground/90 hover:text-primary-foreground"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

// ─── Hero Section ─────────────────────────────────────
const HeroFullPage = ({
  groomName,
  brideName,
  date,
  accentColor,
  heroOverlay,
}: {
  groomName: string;
  brideName: string;
  date: string;
  accentColor: string;
  heroOverlay?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: heroOverlay || "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))" }} />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Heart className="w-14 h-14 mx-auto mb-6 animate-heartbeat" fill={accentColor} style={{ color: accentColor }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-primary-foreground/70 text-xs tracking-[0.5em] uppercase font-body mb-6"
        >
          We're Getting Married
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary-foreground leading-none"
        >
          {groomName}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="block text-3xl sm:text-4xl italic font-normal my-3"
            style={{ color: accentColor }}
          >
            &
          </motion.span>
          {brideName}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-32 h-[1px] mx-auto my-8"
          style={{ backgroundColor: accentColor }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-primary-foreground/80 font-body text-lg"
        >
          {date &&
            new Date(date).toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-primary-foreground/50" />
      </motion.div>
    </section>
  );
};

// ─── Countdown Section ────────────────────────────────
const CountdownSection = ({ date, accentColor, sectionBg }: { date: string; accentColor: string; sectionBg?: string }) => {
  const countdown = useCountdown(date);
  const items = [
    { value: countdown.days, label: "Ngày" },
    { value: countdown.hours, label: "Giờ" },
    { value: countdown.minutes, label: "Phút" },
    { value: countdown.seconds, label: "Giây" },
  ];

  return (
    <section className="py-20 px-4" style={{ backgroundColor: sectionBg || "hsl(var(--secondary) / 0.3)" }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
        >
          Đếm Ngược Ngày Trọng Đại
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-16 h-[2px] mx-auto mb-10"
          style={{ backgroundColor: accentColor }}
        />
        <div className="grid grid-cols-4 gap-4 md:gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-4 md:p-6 shadow-lg border border-border">
                <span className="font-display text-4xl md:text-5xl font-bold" style={{ color: accentColor }}>
                  {String(item.value).padStart(2, "0")}
                </span>
                <p className="text-muted-foreground font-body text-xs md:text-sm mt-2 uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Couple Introduction ──────────────────────────────
const CoupleSection = ({ groomName, brideName, accentColor }: { groomName: string; brideName: string; accentColor: string }) => (
  <section className="py-24 px-4">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>
          Giới thiệu
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">Cô Dâu & Chú Rể</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Groom */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="relative w-56 h-56 mx-auto mb-6">
            <div
              className="absolute inset-0 rounded-full"
              style={{ border: `3px solid ${accentColor}`, transform: "rotate(6deg)" }}
            />
            <img
              src={couple1}
              alt="Chú rể"
              loading="lazy"
              className="w-full h-full rounded-full object-cover shadow-xl"
            />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground">{groomName}</h3>
          <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed max-w-xs mx-auto">
            Một chàng trai lãng mạn, luôn mong muốn mang đến hạnh phúc cho người mình yêu thương.
          </p>
        </motion.div>

        {/* Bride */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="relative w-56 h-56 mx-auto mb-6">
            <div
              className="absolute inset-0 rounded-full"
              style={{ border: `3px solid ${accentColor}`, transform: "rotate(-6deg)" }}
            />
            <img
              src={couple1}
              alt="Cô dâu"
              loading="lazy"
              className="w-full h-full rounded-full object-cover shadow-xl"
            />
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

// ─── Love Story Timeline ─────────────────────────────
const storyEvents = [
  {
    date: "Tháng 3, 2020",
    title: "Lần Đầu Gặp Gỡ",
    desc: "Chúng tôi gặp nhau lần đầu tại một quán cà phê nhỏ. Ánh mắt đầu tiên đã nói lên tất cả.",
    image: couple3,
  },
  {
    date: "Tháng 9, 2021",
    title: "Buổi Hẹn Đầu Tiên",
    desc: "Buổi tối đi dạo bên bờ sông, nắm tay nhau và cảm nhận nhịp đập trái tim đồng điệu.",
    image: couple2,
  },
  {
    date: "Tháng 12, 2023",
    title: "Lời Cầu Hôn",
    desc: "Trên bãi biển hoàng hôn, anh quỳ xuống và nói: 'Em có muốn cùng anh đi hết cuộc đời này không?'",
    image: coupleProposal,
  },
  {
    date: "Tháng 12, 2025",
    title: "Ngày Trọng Đại",
    desc: "Chúng tôi chính thức trở thành một gia đình, bắt đầu hành trình mới đầy yêu thương.",
    image: ringsImg,
  },
];

const StorySection = ({ accentColor, sectionBg }: { accentColor: string; sectionBg?: string }) => (
  <section id="story" className="py-24 px-4" style={{ backgroundColor: sectionBg || "hsl(var(--secondary) / 0.2)" }}>
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>
          Hành trình yêu thương
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
          Câu Chuyện Tình Yêu
        </h2>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-border hidden md:block" />

        {storyEvents.map((event, i) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center gap-8 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Content */}
            <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
              <span className="font-body text-xs font-semibold tracking-wider uppercase" style={{ color: accentColor }}>
                {event.date}
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground mt-1 mb-2">{event.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{event.desc}</p>
            </div>

            {/* Center dot */}
            <div className="hidden md:flex items-center justify-center relative z-10">
              <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: accentColor }} />
            </div>

            <div className="flex-1">
              <motion.div
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                initial={{ opacity: 0, scale: 0.85, x: i % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
                className="rounded-2xl overflow-hidden shadow-xl relative group"
              >
                <motion.img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-48 md:h-56 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Photo Gallery ────────────────────────────────────
const galleryImages = [couple1, couple2, couple3, coupleProposal, venueImg, ringsImg];

const GallerySection = ({ accentColor }: { accentColor: string }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id="gallery" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>
              Khoảnh khắc đẹp
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
              <Camera className="w-8 h-8 inline-block mr-3 mb-1" style={{ color: accentColor }} />
              Album Ảnh Cưới
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, type: "spring", stiffness: 100 }}
                whileHover={{
                  scale: 1.08,
                  zIndex: 10,
                  rotate: i % 2 === 0 ? 2 : -2,
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)",
                }}
                className={`cursor-pointer rounded-2xl overflow-hidden shadow-md transition-shadow relative group ${
                  i === 0 || i === 5 ? "row-span-2" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <motion.img
                  src={img}
                  alt={`Wedding photo ${i + 1}`}
                  loading="lazy"
                  className={`w-full object-cover ${i === 0 || i === 5 ? "h-full" : "h-48 md:h-64"}`}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                />
                {/* Shimmer overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                {/* Sparkle icon */}
                <motion.div
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Camera className="w-5 h-5 text-primary-foreground drop-shadow-lg" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
          />
        </motion.div>
      )}
    </>
  );
};

// ─── Event Details ────────────────────────────────────
const EventsSection = ({
  date,
  time,
  venue,
  address,
  accentColor,
}: {
  date: string;
  time: string;
  venue: string;
  address: string;
  accentColor: string;
}) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <section id="events" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={venueImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>
            Chi tiết
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">Sự Kiện Cưới</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ceremony */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-border text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor + "20" }}>
              <Heart className="w-7 h-7" style={{ color: accentColor }} />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Lễ Thành Hôn</h3>
            <div className="space-y-3 text-muted-foreground font-body">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: accentColor }} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" style={{ color: accentColor }} />
                <span>{time}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: accentColor }} />
                <span>{venue}</span>
              </div>
              <p className="text-sm pt-2">{address}</p>
            </div>
          </motion.div>

          {/* Reception */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-border text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor + "20" }}>
              <MusicIcon className="w-7 h-7" style={{ color: accentColor }} />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Tiệc Cưới</h3>
            <div className="space-y-3 text-muted-foreground font-body">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: accentColor }} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" style={{ color: accentColor }} />
                <span>18:00</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: accentColor }} />
                <span>{venue}</span>
              </div>
              <p className="text-sm pt-2">Cocktail, tiệc tối & nhảy cùng DJ</p>
            </div>
          </motion.div>
        </div>

        {/* Venue Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl overflow-hidden shadow-2xl"
        >
          <img src={venueImg} alt="Venue" loading="lazy" className="w-full h-64 md:h-80 object-cover" />
        </motion.div>
      </div>
    </section>
  );
};

// ─── RSVP Section ─────────────────────────────────────
const RSVPSection = ({ accentColor }: { accentColor: string }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", guests: "1", attending: "yes", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>
            Xác nhận tham dự
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">RSVP</h2>
          <p className="text-muted-foreground font-body mt-3">
            Vui lòng xác nhận sự hiện diện của bạn
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-card rounded-3xl p-10 shadow-xl border border-border"
          >
            <Heart className="w-16 h-16 mx-auto mb-4 animate-heartbeat" fill={accentColor} style={{ color: accentColor }} />
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">Cảm Ơn Bạn!</h3>
            <p className="text-muted-foreground font-body">
              Chúng tôi rất vui khi nhận được phản hồi của bạn. Hẹn gặp bạn tại ngày trọng đại! 💕
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card rounded-3xl p-8 shadow-xl border border-border space-y-5"
          >
            <div>
              <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Họ và Tên</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nhập tên của bạn"
              />
            </div>

            <div>
              <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Bạn sẽ tham dự?</label>
              <div className="flex gap-3">
                {[
                  { value: "yes", label: "Có, tôi sẽ đến! 🎉" },
                  { value: "no", label: "Rất tiếc, tôi không thể 😢" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, attending: opt.value }))}
                    className={`flex-1 px-4 py-3 rounded-xl font-body text-sm transition-all border ${
                      form.attending === opt.value
                        ? "border-transparent text-primary-foreground shadow-md"
                        : "border-border text-foreground hover:border-primary"
                    }`}
                    style={form.attending === opt.value ? { backgroundColor: accentColor } : {}}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Số khách</label>
              <select
                value={form.guests}
                onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} người</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-body text-sm font-semibold text-foreground mb-1.5">Lời nhắn</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px] resize-none"
                placeholder="Gửi lời chúc đến cô dâu & chú rể..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-primary-foreground font-body font-semibold text-base shadow-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              <Send className="w-4 h-4" />
              Gửi Xác Nhận
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────
const WeddingFooter = ({ groomName, brideName, accentColor }: { groomName: string; brideName: string; accentColor: string }) => (
  <footer className="py-16 px-4 text-center border-t border-border">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Heart className="w-8 h-8 mx-auto mb-4" fill={accentColor} style={{ color: accentColor }} />
      <h3 className="font-display text-3xl font-bold text-foreground">
        {groomName} & {brideName}
      </h3>
      <p className="text-muted-foreground font-body text-sm mt-3">
        Cảm ơn bạn đã ghé thăm trang web cưới của chúng tôi 💕
      </p>
    </motion.div>
  </footer>
);

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
  accentColor = "#E8B4B8",
  templateId = "romantic",
}: WeddingPageProps) => {
  const theme = getTheme(templateId);
  const isDark = templateId === "modern" || templateId === "royal";

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden ${isDark ? "dark" : ""}`}
      style={{ background: theme.bgGradient }}
    >
      <FallingPetals emojis={theme.petalEmojis} />
      <NavBar accentColor={accentColor} />
      <HeroFullPage groomName={groomName} brideName={brideName} date={date} accentColor={accentColor} heroOverlay={theme.heroOverlay} />
      <CountdownSection date={date} accentColor={accentColor} sectionBg={theme.sectionBg1} />
      <CoupleSection groomName={groomName} brideName={brideName} accentColor={accentColor} />
      <StorySection accentColor={accentColor} sectionBg={theme.sectionBg2} />
      <GallerySection accentColor={accentColor} />
      <EventsSection date={date} time={time} venue={venue} address={address} accentColor={accentColor} />
      <WishesWall accentColor={accentColor} />
      <RSVPSection accentColor={accentColor} sectionBg={theme.sectionBg1} />
      <WeddingFooter groomName={groomName} brideName={brideName} accentColor={accentColor} decorEmoji={theme.decorEmoji} />
      <MusicPlayer accentColor={accentColor} />
    </div>
  );
};

export default WeddingFullPage;
