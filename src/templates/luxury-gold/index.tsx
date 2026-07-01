import { Heart, Sparkles, Calendar, MapPin, Send } from "lucide-react";
import { Tilt3D, Reveal, SparkleField, useCountdown, useGoogleFonts, formatVN, motion, type TemplateProps } from "../_shared/primitives";
import { photos, heroPhoto, couplePhotos } from "../_shared/photos";

/**
 * LUXURY GOLD — magazine editorial layout, black + gold, memory collage gallery.
 * Distinct signatures: massive drop-cap opener, gold serif type (Playfair + Cormorant),
 * ornate divider, horizontal photo strip, memory collage grid, dark palette.
 */
const LuxuryGold = ({ groomName, brideName, date, time, venue, address, message }: TemplateProps) => {
  useGoogleFonts(["Cormorant Garamond", "Cormorant SC", "Inter"]);
  const t = useCountdown(date);
  const gold = "#D4AF37";
  const goldSoft = "#F0D57A";

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse at top, #1a1208 0%, #0a0604 40%, #000 100%)",
        fontFamily: "'Cormorant Garamond', serif",
        color: "#f5e9c8",
      }}
    >
      <SparkleField color={goldSoft} count={60} />

      {/* HERO — full-bleed editorial cover */}
      <section className="relative h-[100vh] flex items-end overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={heroPhoto} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 100%)" }} />
        </motion.div>

        {/* Ornate corner frames */}
        <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 z-10" style={{ borderColor: gold }} />
        <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 z-10" style={{ borderColor: gold }} />
        <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 z-10" style={{ borderColor: gold }} />
        <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 z-10" style={{ borderColor: gold }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 pb-24">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ color: goldSoft, letterSpacing: "0.6em", fontFamily: "Inter" }} className="text-xs uppercase mb-6">
            Vol. MMXXVII — The Wedding Edition
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1.2 }} className="text-6xl sm:text-8xl md:text-[10rem] leading-[0.9] font-light" style={{ fontFamily: "'Cormorant SC', serif" }}>
            {groomName}
          </motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.4, duration: 1 }} className="flex items-center gap-6 my-6" style={{ transformOrigin: "left" }}>
            <div className="h-[1px] w-24" style={{ background: gold }} />
            <span className="text-2xl italic" style={{ color: gold }}>et</span>
            <div className="h-[1px] flex-1" style={{ background: `linear-gradient(to right, ${gold}, transparent)` }} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 1.2 }} className="text-6xl sm:text-8xl md:text-[10rem] leading-[0.9] font-light" style={{ fontFamily: "'Cormorant SC', serif" }}>
            {brideName}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="mt-8 text-lg opacity-70" style={{ fontFamily: "Inter", letterSpacing: "0.3em" }}>
            {formatVN(date).toUpperCase()}
          </motion.p>
        </div>
      </section>

      {/* MAGAZINE INTRO — drop-cap */}
      <section className="relative py-32 px-8 max-w-4xl mx-auto">
        <Reveal>
          <p style={{ color: gold, letterSpacing: "0.4em", fontFamily: "Inter" }} className="text-[11px] uppercase mb-4 text-center">
            — Editor's Letter —
          </p>
          <h2 className="text-4xl md:text-5xl text-center mb-10 italic font-light">A Story Worth Telling</h2>
          <p className="text-xl md:text-2xl leading-relaxed columns-1 md:columns-2 gap-12" style={{ color: "#e8dcb0" }}>
            <span className="float-left text-7xl md:text-8xl leading-[0.8] mr-3 mt-1 font-bold" style={{ color: gold, fontFamily: "'Cormorant SC', serif" }}>
              {message?.[0]?.toUpperCase() || "T"}
            </span>
            {message || "Trân trọng kính mời quý khách đến dự lễ thành hôn của chúng tôi. Sự hiện diện của quý khách là niềm vinh hạnh lớn lao cho hai gia đình chúng tôi trong ngày trọng đại này."}
          </p>
        </Reveal>
      </section>

      {/* GOLD DIVIDER */}
      <div className="flex items-center justify-center gap-6 py-8">
        <div className="h-[1px] w-32" style={{ background: `linear-gradient(to right, transparent, ${gold})` }} />
        <Sparkles className="w-5 h-5" style={{ color: gold }} />
        <div className="h-[1px] w-32" style={{ background: `linear-gradient(to left, transparent, ${gold})` }} />
      </div>

      {/* COUNTDOWN — engraved plaques */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <Reveal>
          <p style={{ color: gold, letterSpacing: "0.4em", fontFamily: "Inter" }} className="text-[11px] uppercase mb-6 text-center">
            The Countdown Begins
          </p>
          <div className="grid grid-cols-4 gap-2 md:gap-6">
            {[
              { v: t.days, l: "Ngày" },
              { v: t.hours, l: "Giờ" },
              { v: t.minutes, l: "Phút" },
              { v: t.seconds, l: "Giây" },
            ].map((x, i) => (
              <Tilt3D key={x.l}>
                <div
                  className="text-center py-8 md:py-14 relative"
                  style={{
                    background: "linear-gradient(180deg, #1a1208 0%, #0a0604 100%)",
                    border: `1px solid ${gold}40`,
                    boxShadow: `inset 0 0 40px ${gold}15, 0 20px 60px rgba(0,0,0,0.6)`,
                  }}
                >
                  <div className="absolute top-2 left-2 right-2 bottom-2 border" style={{ borderColor: `${gold}25` }} />
                  <div className="text-5xl md:text-8xl font-light relative" style={{ color: gold, fontFamily: "'Cormorant SC', serif" }}>
                    {String(x.v).padStart(2, "0")}
                  </div>
                  <div className="text-xs uppercase mt-3 opacity-60" style={{ letterSpacing: "0.4em", fontFamily: "Inter" }}>{x.l}</div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </Reveal>
      </section>

      {/* MEMORY COLLAGE — big magazine spread */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <p style={{ color: gold, letterSpacing: "0.4em", fontFamily: "Inter" }} className="text-[11px] uppercase mb-3">Feature · Album</p>
            <h2 className="text-5xl md:text-7xl italic font-light">The Chapters of Us</h2>
          </div>
        </Reveal>
        {/* Magazine grid: 1 big + 4 small + strip */}
        <div className="grid grid-cols-12 gap-3 md:gap-5">
          <Tilt3D max={6} className="col-span-12 md:col-span-8 aspect-[4/3]">
            <img src={photos[0]} alt="" className="w-full h-full object-cover" style={{ border: `1px solid ${gold}40` }} />
          </Tilt3D>
          <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-3 md:gap-5">
            <Tilt3D max={8}><img src={photos[1]} alt="" className="w-full h-full object-cover" style={{ border: `1px solid ${gold}40` }} /></Tilt3D>
            <Tilt3D max={8}><img src={photos[2]} alt="" className="w-full h-full object-cover" style={{ border: `1px solid ${gold}40` }} /></Tilt3D>
          </div>
          <Tilt3D max={6} className="col-span-6 md:col-span-3 aspect-square"><img src={photos[3]} alt="" className="w-full h-full object-cover" style={{ border: `1px solid ${gold}40` }} /></Tilt3D>
          <Tilt3D max={6} className="col-span-6 md:col-span-3 aspect-square"><img src={photos[4]} alt="" className="w-full h-full object-cover" style={{ border: `1px solid ${gold}40` }} /></Tilt3D>
          <Tilt3D max={6} className="col-span-12 md:col-span-6 aspect-[16/9]"><img src={photos[5]} alt="" className="w-full h-full object-cover" style={{ border: `1px solid ${gold}40` }} /></Tilt3D>
        </div>

        {/* Horizontal photo strip */}
        <Reveal delay={0.2}>
          <div className="mt-8 md:mt-12 overflow-x-auto no-scrollbar">
            <div className="flex gap-3 md:gap-5 pb-2 min-w-max">
              {[...photos, ...photos].map((p, i) => (
                <div key={i} className="w-40 md:w-56 aspect-[3/4] flex-shrink-0" style={{ border: `1px solid ${gold}40` }}>
                  <img src={p} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* EVENTS — engraved cards */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <Reveal>
          <p style={{ color: gold, letterSpacing: "0.4em", fontFamily: "Inter" }} className="text-[11px] uppercase mb-3 text-center">The Celebration</p>
          <h2 className="text-5xl md:text-6xl italic font-light text-center mb-16">Save the Date</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Lễ Vu Quy", icon: Heart, subtitle: "Nhà gái · 09:00" },
              { title: "Tiệc Cưới", icon: Sparkles, subtitle: `${venue} · ${time}` },
            ].map((ev, i) => (
              <Tilt3D key={i} max={8}>
                <div className="p-10 relative" style={{ background: "linear-gradient(180deg, #1a1208, #0a0604)", border: `1px solid ${gold}40`, boxShadow: `inset 0 0 40px ${gold}12` }}>
                  <ev.icon className="w-8 h-8 mb-4" style={{ color: gold }} />
                  <h3 className="text-3xl italic mb-2">{ev.title}</h3>
                  <div className="h-[1px] w-16 my-4" style={{ background: gold }} />
                  <p className="opacity-70">{ev.subtitle}</p>
                  <p className="mt-2 text-sm opacity-50" style={{ fontFamily: "Inter" }}>{address}</p>
                </div>
              </Tilt3D>
            ))}
          </div>
        </Reveal>
      </section>

      {/* RSVP */}
      <section className="py-24 px-4 max-w-2xl mx-auto text-center">
        <Reveal>
          <p style={{ color: gold, letterSpacing: "0.4em", fontFamily: "Inter" }} className="text-[11px] uppercase mb-3">R.S.V.P</p>
          <h2 className="text-5xl md:text-6xl italic font-light mb-4">Kính mời</h2>
          <p className="opacity-70 mb-10 text-lg">Xin xác nhận sự hiện diện của bạn trước ngày cưới</p>
          <div className="space-y-4">
            <input placeholder="Họ và tên" className="w-full px-6 py-4 bg-transparent border text-inherit placeholder:opacity-40 focus:outline-none" style={{ borderColor: `${gold}60`, fontFamily: "Inter" }} />
            <input placeholder="Số điện thoại" className="w-full px-6 py-4 bg-transparent border focus:outline-none placeholder:opacity-40" style={{ borderColor: `${gold}60`, fontFamily: "Inter", color: "inherit" }} />
            <button className="w-full py-4 flex items-center justify-center gap-2 hover:opacity-90 transition" style={{ background: gold, color: "#000", letterSpacing: "0.3em", fontFamily: "Inter", fontSize: 13 }}>
              GỬI XÁC NHẬN <Send className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </section>

      <footer className="py-16 text-center border-t" style={{ borderColor: `${gold}20` }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-16" style={{ background: gold }} />
          <Heart className="w-4 h-4" fill={gold} style={{ color: gold }} />
          <div className="h-[1px] w-16" style={{ background: gold }} />
        </div>
        <p className="text-2xl italic">{groomName} & {brideName}</p>
        <p className="text-xs opacity-40 mt-2" style={{ fontFamily: "Inter", letterSpacing: "0.3em" }}>{formatVN(date).toUpperCase()}</p>
      </footer>
    </div>
  );
};

export default LuxuryGold;
