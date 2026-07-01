import { useEffect, useState } from "react";
import { Heart, MapPin, Calendar, Sparkles } from "lucide-react";
import { Tilt3D, Reveal, useCountdown, useGoogleFonts, formatVN, motion, type TemplateProps } from "../_shared/primitives";
import { photos, heroPhoto } from "../_shared/photos";

/**
 * GLASSMORPHISM AURORA — floating glass panels over an animated aurora background.
 * Distinct: blurred glass cards, aurora orbs, circular composition hero, carousel gallery,
 * modern sans (Space Grotesk + Manrope), floating cards with 3D depth.
 */
const GlassmorphismAurora = ({ groomName, brideName, date, time, venue, address, message }: TemplateProps) => {
  useGoogleFonts(["Space Grotesk", "Manrope"]);
  const t = useCountdown(date);
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCarouselIdx((i) => (i + 1) % photos.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden text-white"
      style={{
        background: "#0a0a1a",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* AURORA BACKDROP */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0a0a1a 0%, #0f0f26 50%, #0a0a1a 100%)" }} />
        <motion.div
          animate={{ x: ["-20%", "20%", "-20%"], y: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[70vw] h-[70vw] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, #ff6ec7 0%, transparent 60%)", top: "-10%", left: "-10%", filter: "blur(80px)" }}
        />
        <motion.div
          animate={{ x: ["10%", "-15%", "10%"], y: ["5%", "-10%", "5%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60vw] h-[60vw] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, #6ec7ff 0%, transparent 60%)", top: "20%", right: "-15%", filter: "blur(80px)" }}
        />
        <motion.div
          animate={{ x: ["-10%", "15%", "-10%"], y: ["10%", "-5%", "10%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute w-[50vw] h-[50vw] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 60%)", bottom: "-20%", left: "20%", filter: "blur(80px)" }}
        />
      </div>

      {/* HERO — circular composition */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 z-10">
        <div className="relative w-full max-w-5xl">
          {/* Orbiting photos */}
          {photos.slice(0, 6).map((p, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 280;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
                className="absolute w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden hidden md:block"
                style={{
                  left: `calc(50% + ${Math.cos(angle) * radius}px - 4rem)`,
                  top: `calc(50% + ${Math.sin(angle) * radius}px - 4rem)`,
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                }}
              >
                <motion.img
                  src={p}
                  alt=""
                  className="w-full h-full object-cover"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity, delay: i * 0.5 }}
                />
              </motion.div>
            );
          })}

          {/* Center glass card */}
          <Tilt3D max={15} className="relative mx-auto max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative p-10 md:p-14 text-center"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 28,
                boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <Sparkles className="w-8 h-8 mx-auto mb-4 text-white/80" />
              <p className="text-xs uppercase tracking-[0.4em] opacity-60 mb-6" style={{ fontFamily: "'Space Grotesk'" }}>Save the Date</p>
              <h1 className="text-4xl md:text-5xl font-light leading-tight" style={{ fontFamily: "'Space Grotesk'" }}>
                {groomName}
              </h1>
              <div className="my-4 flex items-center justify-center gap-3">
                <div className="h-[1px] w-12 bg-white/30" />
                <Heart className="w-4 h-4 text-pink-300" fill="currentColor" />
                <div className="h-[1px] w-12 bg-white/30" />
              </div>
              <h1 className="text-4xl md:text-5xl font-light leading-tight" style={{ fontFamily: "'Space Grotesk'" }}>
                {brideName}
              </h1>
              <p className="mt-8 text-sm opacity-70" style={{ letterSpacing: "0.3em" }}>{formatVN(date)}</p>
            </motion.div>
          </Tilt3D>
        </div>
      </section>

      {/* COUNTDOWN — floating glass tiles */}
      <section className="relative py-24 px-4 max-w-5xl mx-auto z-10">
        <Reveal>
          <h2 className="text-center text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Space Grotesk'" }}>Countdown</h2>
          <p className="text-center opacity-60 mb-12">Đến ngày trọng đại của chúng mình</p>
        </Reveal>
        <div className="grid grid-cols-4 gap-3 md:gap-6">
          {[
            { v: t.days, l: "Days" },
            { v: t.hours, l: "Hours" },
            { v: t.minutes, l: "Mins" },
            { v: t.seconds, l: "Secs" },
          ].map((x, i) => (
            <Tilt3D key={x.l} max={12}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 md:p-10"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 20,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <div className="text-4xl md:text-6xl font-light" style={{ fontFamily: "'Space Grotesk'" }}>
                  {String(x.v).padStart(2, "0")}
                </div>
                <div className="text-[10px] md:text-xs uppercase mt-3 tracking-[0.3em] opacity-60">{x.l}</div>
              </motion.div>
            </Tilt3D>
          ))}
        </div>
      </section>

      {/* CAROUSEL GALLERY — glass carousel with thumbnail rail */}
      <section className="relative py-24 px-4 max-w-6xl mx-auto z-10">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] opacity-60 mb-2">Our Album</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Space Grotesk'" }}>Moments in glass</h2>
          </div>
        </Reveal>

        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6" style={{ border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
          {photos.map((p, i) => (
            <motion.img
              key={i}
              src={p}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ opacity: i === carouselIdx ? 1 : 0, scale: i === carouselIdx ? 1 : 1.1 }}
              transition={{ duration: 1.2 }}
            />
          ))}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent 50%)" }} />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={() => setCarouselIdx(i)}
              className="flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden transition-all"
              style={{
                border: i === carouselIdx ? "2px solid #fff" : "1px solid rgba(255,255,255,0.15)",
                opacity: i === carouselIdx ? 1 : 0.5,
              }}
            >
              <img src={p} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* MESSAGE — glass panel */}
      <section className="relative py-24 px-4 max-w-3xl mx-auto z-10">
        <Reveal>
          <Tilt3D max={8}>
            <div
              className="p-10 md:p-14 text-center rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <p className="text-2xl md:text-3xl leading-relaxed font-light italic">
                "{message || "Chúng mình sắp bước sang một chương mới trong cuộc đời. Sự hiện diện của bạn sẽ khiến ngày này trọn vẹn hơn."}"
              </p>
              <p className="mt-6 text-sm opacity-60 uppercase tracking-[0.3em]">— {groomName} & {brideName}</p>
            </div>
          </Tilt3D>
        </Reveal>
      </section>

      {/* EVENTS — floating cards */}
      <section className="relative py-24 px-4 max-w-5xl mx-auto z-10">
        <Reveal>
          <h2 className="text-center text-4xl md:text-5xl font-light mb-16" style={{ fontFamily: "'Space Grotesk'" }}>The celebration</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Calendar, title: "Ngày cưới", info: formatVN(date), sub: time, color: "#ff6ec7" },
            { icon: MapPin, title: "Địa điểm", info: venue, sub: address, color: "#6ec7ff" },
          ].map((e, i) => (
            <Tilt3D key={i} max={12}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-10 rounded-3xl relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-40" style={{ background: e.color, filter: "blur(40px)" }} />
                <e.icon className="w-10 h-10 mb-4" style={{ color: e.color }} />
                <p className="text-xs uppercase tracking-[0.3em] opacity-60 mb-2">{e.title}</p>
                <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "'Space Grotesk'" }}>{e.info}</h3>
                <p className="opacity-70">{e.sub}</p>
              </motion.div>
            </Tilt3D>
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section className="relative py-24 px-4 max-w-lg mx-auto z-10">
        <Reveal>
          <div
            className="p-10 rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <h2 className="text-3xl font-light text-center mb-2" style={{ fontFamily: "'Space Grotesk'" }}>RSVP</h2>
            <p className="text-center opacity-60 mb-8 text-sm">Xác nhận sự hiện diện của bạn</p>
            <div className="space-y-4">
              <input placeholder="Họ tên" className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/15 focus:outline-none focus:border-white/40 placeholder:opacity-40" />
              <input placeholder="Số điện thoại" className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/15 focus:outline-none focus:border-white/40 placeholder:opacity-40" />
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition text-sm">Sẽ đến</button>
                <button className="py-3 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 transition text-sm">Xin lỗi</button>
              </div>
              <button className="w-full py-3 rounded-xl font-medium hover:opacity-90 transition" style={{ background: "linear-gradient(135deg, #ff6ec7, #6ec7ff)" }}>
                Gửi xác nhận
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="relative py-16 text-center z-10 border-t border-white/10">
        <p className="text-2xl font-light" style={{ fontFamily: "'Space Grotesk'" }}>{groomName} & {brideName}</p>
        <p className="opacity-50 text-xs mt-2 tracking-[0.3em] uppercase">{formatVN(date)}</p>
      </footer>
    </div>
  );
};

export default GlassmorphismAurora;
