import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import coupleProposal from "@/assets/couple-proposal.jpg";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { year: "2019", title: "Lần đầu gặp gỡ", desc: "Một buổi chiều mưa, hai ánh mắt vô tình chạm nhau giữa quán cà phê nhỏ.", img: couple1 },
  { year: "2021", title: "Hẹn hò chính thức", desc: "Sau những lá thư tay, một lời tỏ tình dưới hàng phượng nở.", img: couple2 },
  { year: "2023", title: "Cùng nhau đi xa", desc: "Chuyến đi đầu tiên, học cách hiểu nhau qua từng cung đường.", img: couple3 },
  { year: "2025", title: "Lời cầu hôn", desc: "Dưới ngàn ánh nến lung linh — một câu hỏi, một cái gật đầu.", img: coupleProposal },
];

const ScrollStoryTimeline = ({ accentColor }: { accentColor: string }) => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".story-chapter");
      cards.forEach((card, i) => {
        const img = card.querySelector(".story-img") as HTMLElement;
        const content = card.querySelector(".story-content") as HTMLElement;
        gsap.from(img, {
          scale: 1.25,
          yPercent: 12,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 75%", end: "bottom 30%", scrub: 0.6 },
        });
        gsap.from(content, {
          y: 80,
          opacity: 0,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: { trigger: card, start: "top 70%", toggleActions: "play none none reverse" },
        });
        gsap.from(card.querySelector(".story-year"), {
          letterSpacing: "0.6em",
          opacity: 0,
          duration: 1.2,
          scrollTrigger: { trigger: card, start: "top 70%", toggleActions: "play none none reverse" },
        });
      });

      // progress line
      gsap.to(".story-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 50%", end: "bottom 50%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={root} className="relative py-24 sm:py-32 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <span className="text-[11px] tracking-[0.4em] uppercase font-body" style={{ color: accentColor }}>
          Chapter · Câu chuyện
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium mt-3 text-foreground">
          Hành trình của <span className="italic" style={{ color: accentColor }}>chúng tôi</span>
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* vertical track */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-foreground/10 hidden md:block" />
        <div
          className="story-progress absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top scale-y-0 hidden md:block"
          style={{ background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)` }}
        />

        {chapters.map((c, i) => {
          const left = i % 2 === 0;
          return (
            <div
              key={c.year}
              className={`story-chapter relative grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-24 md:mb-40 ${
                left ? "" : "md:[direction:rtl]"
              }`}
            >
              {/* image */}
              <div className="story-img relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/5] [direction:ltr]">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover" loading="lazy" />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${accentColor}55, transparent 60%)` }}
                />
                <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-white/15 border border-white/30 rounded-2xl px-4 py-2">
                  <p className="text-white font-body text-xs tracking-[0.3em] uppercase">Chương {i + 1}</p>
                </div>
              </div>

              {/* content */}
              <div className="story-content [direction:ltr] relative">
                <div
                  className="story-year font-display text-7xl md:text-8xl font-light leading-none mb-2"
                  style={{ color: `${accentColor}` }}
                >
                  {c.year}
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">{c.title}</h3>
                <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-md">
                  {c.desc}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px flex-1 max-w-[80px]" style={{ background: accentColor }} />
                  <span className="text-xs tracking-[0.3em] uppercase font-body text-muted-foreground">
                    Memory · {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* dot on line */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <div
                  className="w-4 h-4 rounded-full ring-4 ring-background"
                  style={{ background: accentColor, boxShadow: `0 0 24px ${accentColor}` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ScrollStoryTimeline;
