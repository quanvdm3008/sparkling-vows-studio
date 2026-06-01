import { Heart, Instagram, Facebook, Mail } from "lucide-react";

const cols = [
  {
    title: "Sản phẩm",
    links: ["Mẫu thiệp", "Tính năng", "Bảng giá", "Dashboard"],
  },
  {
    title: "Hỗ trợ",
    links: ["Hướng dẫn", "Câu hỏi thường gặp", "Liên hệ", "Điều khoản"],
  },
  {
    title: "Về Mireia",
    links: ["Câu chuyện", "Đối tác", "Blog cưới", "Tuyển dụng"],
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-foreground text-background pt-20 pb-10 px-5 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-background/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-9 h-9 rounded-full bg-gradient-rose-gold flex items-center justify-center shadow-gold">
                <Heart className="w-4 h-4 fill-primary-foreground text-primary-foreground" />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight">
                Mireia<span className="text-accent">.</span>
              </span>
            </div>
            <p className="font-body text-sm text-background/70 leading-relaxed max-w-md">
              Studio thiệp cưới online cao cấp. Chúng tôi tin rằng mỗi câu chuyện tình yêu xứng đáng có một thiệp cưới của riêng mình.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-background/20 grid place-items-center hover:bg-background hover:text-foreground transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <h4 className="font-display text-base font-semibold mb-4">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="font-body text-sm text-background/65 hover:text-accent transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1" />
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-background/50">
            © {new Date().getFullYear()} Mireia Wedding Studio. Tạo bằng tình yêu tại Việt Nam.
          </p>
          <p className="font-body text-xs text-background/50 flex items-center gap-1.5">
            Được tạo với <Heart className="w-3 h-3 fill-accent text-accent" /> bởi đội ngũ Mireia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
