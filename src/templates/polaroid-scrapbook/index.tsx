import { Heart, MapPin, Calendar, Music, Camera } from "lucide-react";
import { Tilt3D, Reveal, useCountdown, useGoogleFonts, formatVN, motion, type TemplateProps } from "../_shared/primitives";
import { photos, couplePhotos } from "../_shared/photos";

/**
 * POLAROID SCRAPBOOK — hand-crafted scrapbook layout with tape, torn edges, rotated cards.
 * Distinct: rotated polaroids, washi tape, kraft paper texture, handwritten type (Caveat),
 * scattered photo collage, sticker notes, timeline as taped strip.
 */
const PolaroidScrapbook = ({ groomName, brideName, date, time, venue, address, message }: TemplateProps) => {
  useGoogleFonts(["Caveat", "Kalam", "Cormorant Garamond"]);
  const t = useCountdown(date);
  const ink = "#3a2617";
  const accent = "#d97757";
  const paper = "#f4e9d4";

  const tape = (color: string) => ({
    background: color,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    opacity: 0.75,
  });

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, #efe0c4 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, #f0dfc0 0%, transparent 50%),
          repeating-linear-gradient(90deg, ${paper}, ${paper} 2px, #ecdfc4 2px, #ecdfc4 4px)
        `,
        color: ink,
        fontFamily: "'Kalam', cursive",
      }}
    >
      {/* Paper texture overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.15]" style={{
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100' height='100' filter='url(%23n)' opacity='0.5'/></svg>\")",
      }} />

      {/* HERO — big rotated polaroid title */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <div className="relative max-w-4xl w-full">
          <Reveal>
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 text-xs uppercase tracking-widest" style={{ background: accent, color: paper, transform: "rotate(-2deg)", fontFamily: "'Cormorant Garamond', serif" }}>
                Our Wedding Scrapbook
              </span>
            </div>
          </Reveal>

          <Tilt3D max={10} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 1 }}
              className="bg-white p-6 pb-24 shadow-2xl mx-auto max-w-lg relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Washi tape corners */}
              <div className="absolute -top-3 left-8 w-24 h-8 -rotate-6" style={tape(accent)} />
              <div className="absolute -top-3 right-8 w-24 h-8 rotate-6" style={tape("#a8c68f")} />

              <img src={couplePhotos[0]} alt="" className="w-full aspect-square object-cover" />
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <h1 className="text-5xl md:text-6xl" style={{ fontFamily: "'Caveat', cursive", color: ink }}>
                  {groomName} <span style={{ color: accent }}>♡</span> {brideName}
                </h1>
                <p className="text-sm opacity-70 mt-1" style={{ fontFamily: "'Kalam', cursive" }}>{formatVN(date)}</p>
              </div>
            </motion.div>
          </Tilt3D>

          {/* Scattered mini polaroids */}
          {[
            { src: photos[3], rot: 8, top: "10%", right: "-8%", size: 140 },
            { src: photos[2], rot: -12, bottom: "5%", left: "-6%", size: 130 },
            { src: photos[4], rot: 6, top: "40%", left: "-10%", size: 110 },
            { src: photos[5], rot: -8, bottom: "15%", right: "-12%", size: 120 },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: p.rot }}
              transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
              className="absolute bg-white p-2 pb-8 shadow-xl hidden md:block"
              style={{ width: p.size, top: p.top as any, bottom: p.bottom as any, left: p.left as any, right: p.right as any }}
            >
              <img src={p.src} alt="" className="w-full aspect-square object-cover" />
              <div className="absolute inset-x-4 -top-2 h-6" style={tape("#f0d78c")} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* HANDWRITTEN MESSAGE */}
      <section className="py-24 px-4 max-w-3xl mx-auto text-center relative">
        <Reveal>
          <div className="relative inline-block">
            <div className="absolute inset-x-8 -top-3 h-6" style={tape(accent)} />
            <div className="bg-white/70 backdrop-blur p-10 rotate-[-1deg] shadow-lg">
              <p className="text-2xl md:text-3xl leading-relaxed" style={{ fontFamily: "'Caveat', cursive" }}>
                "{message || "Chúng mình chính thức về chung một nhà rồi! Trân trọng mời bạn đến chia sẻ khoảnh khắc đặc biệt này cùng chúng mình nhé."}"
              </p>
              <p className="mt-6 text-lg" style={{ fontFamily: "'Caveat', cursive", color: accent }}>
                — {groomName} & {brideName}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* COUNTDOWN — sticky notes */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-5xl text-center mb-12 rotate-[-1deg] inline-block w-full" style={{ fontFamily: "'Caveat', cursive" }}>
            Đếm ngược đến ngày trọng đại
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: t.days, l: "ngày", c: "#fce38a", rot: -3 },
            { v: t.hours, l: "giờ", c: "#a8c68f", rot: 2 },
            { v: t.minutes, l: "phút", c: "#f7a072", rot: -2 },
            { v: t.seconds, l: "giây", c: "#c8b6ff", rot: 3 },
          ].map((x, i) => (
            <motion.div
              key={i}
              whileHover={{ rotate: 0, scale: 1.05 }}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: x.rot }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square flex flex-col items-center justify-center shadow-xl relative"
              style={{ background: x.c }}
            >
              <div className="absolute inset-x-6 -top-2 h-4" style={tape("rgba(255,255,255,0.7)")} />
              <span className="text-6xl md:text-7xl font-bold" style={{ fontFamily: "'Caveat', cursive", color: ink }}>
                {x.v}
              </span>
              <span className="text-lg mt-1" style={{ fontFamily: "'Kalam', cursive" }}>{x.l}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SCATTERED GALLERY — Pinterest-style scrapbook */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <Camera className="w-8 h-8 mx-auto mb-3" style={{ color: accent }} />
            <h2 className="text-5xl md:text-6xl" style={{ fontFamily: "'Caveat', cursive" }}>Album kỷ niệm</h2>
            <p className="opacity-70 mt-2" style={{ fontFamily: "'Kalam', cursive" }}>những khoảnh khắc bên nhau</p>
          </div>
        </Reveal>
        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          {[...photos, ...photos].map((p, i) => {
            const rot = ((i * 137) % 8) - 4;
            const tapeColors = [accent, "#a8c68f", "#fce38a", "#c8b6ff", "#f7a072"];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: rot }}
                whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.05 }}
                className="break-inside-avoid bg-white p-2 pb-6 shadow-xl relative inline-block w-full"
              >
                <div className="absolute inset-x-8 -top-2 h-4" style={tape(tapeColors[i % tapeColors.length])} />
                <img src={p} alt="" className="w-full object-cover" style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1" : "4/5" }} />
                <p className="text-center mt-2 text-sm opacity-60" style={{ fontFamily: "'Caveat', cursive" }}>
                  {["us", "forever", "our story", "together", "love", "always", "you & me", "♡"][i % 8]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* EVENTS — taped timeline strip */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-5xl text-center mb-16" style={{ fontFamily: "'Caveat', cursive" }}>Lịch trình ngày cưới</h2>
        </Reveal>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 border-l-2 border-dashed" style={{ borderColor: accent }} />
          {[
            { t: "09:00", title: "Lễ Vu Quy", place: "Nhà gái", side: "left" },
            { t: "11:30", title: "Đón dâu", place: "Nhà trai", side: "right" },
            { t: time || "17:30", title: "Tiệc cưới", place: venue, side: "left" },
            { t: "21:00", title: "Tiệc trà & khiêu vũ", place: "Sảnh chính", side: "right" },
          ].map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: e.side === "left" ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`flex mb-10 ${e.side === "right" ? "flex-row-reverse" : ""}`}
            >
              <div className="w-1/2 px-6">
                <div className="bg-white p-5 shadow-lg relative" style={{ transform: `rotate(${e.side === "left" ? -1 : 1}deg)` }}>
                  <div className="absolute inset-x-8 -top-2 h-4" style={tape(accent)} />
                  <p className="text-3xl" style={{ fontFamily: "'Caveat', cursive", color: accent }}>{e.t}</p>
                  <p className="text-xl mt-1" style={{ fontFamily: "'Kalam', cursive" }}>{e.title}</p>
                  <p className="text-sm opacity-60">{e.place}</p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full mt-4 relative z-10 self-start" style={{ background: accent, transform: "translateX(-50%)", marginLeft: "50%" }} />
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section className="py-24 px-4 max-w-lg mx-auto">
        <Reveal>
          <div className="bg-white p-10 shadow-2xl rotate-[-1deg] relative">
            <div className="absolute inset-x-16 -top-3 h-6" style={tape(accent)} />
            <h2 className="text-5xl text-center mb-2" style={{ fontFamily: "'Caveat', cursive" }}>RSVP</h2>
            <p className="text-center opacity-70 mb-8" style={{ fontFamily: "'Kalam', cursive" }}>Bạn sẽ đến chứ?</p>
            <div className="space-y-4">
              <input placeholder="Tên của bạn" className="w-full border-b-2 border-dashed bg-transparent py-3 focus:outline-none text-lg" style={{ borderColor: accent, fontFamily: "'Kalam', cursive" }} />
              <input placeholder="Số điện thoại" className="w-full border-b-2 border-dashed bg-transparent py-3 focus:outline-none text-lg" style={{ borderColor: accent, fontFamily: "'Kalam', cursive" }} />
              <textarea placeholder="Lời chúc..." rows={3} className="w-full border-b-2 border-dashed bg-transparent py-3 focus:outline-none text-lg" style={{ borderColor: accent, fontFamily: "'Kalam', cursive" }} />
              <button className="w-full py-3 text-lg text-white shadow-lg hover:scale-105 transition" style={{ background: accent, fontFamily: "'Caveat', cursive" }}>
                Gửi lời chúc ✿
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="py-16 text-center">
        <p className="text-4xl" style={{ fontFamily: "'Caveat', cursive" }}>Cảm ơn bạn ♡</p>
        <p className="mt-2 opacity-60" style={{ fontFamily: "'Kalam', cursive" }}>{groomName} & {brideName}</p>
      </footer>
    </div>
  );
};

export default PolaroidScrapbook;
