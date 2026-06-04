import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";

const links = [
  { href: "#templates", label: "Mẫu Thiệp" },
  { href: "#features", label: "Tính Năng" },
  { href: "#how-it-works", label: "Cách Dùng" },
  { href: "/services", label: "Dịch Vụ", route: true },
  { href: "#pricing", label: "Bảng Giá" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goBuilder = () => navigate(user ? "/builder" : "/login");

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative w-9 h-9 rounded-full bg-gradient-rose-gold flex items-center justify-center shadow-gold">
            <Heart className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            Mireia<span className="text-accent">.</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) =>
            l.route ? (
              <Link
                key={l.href}
                to={l.href}
                className="relative font-body text-sm font-medium text-foreground/75 hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-accent hover:after:w-full after:transition-all"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="relative font-body text-sm font-medium text-foreground/75 hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-accent hover:after:w-full after:transition-all"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/builder" className="font-body text-sm font-semibold text-foreground/80 hover:text-foreground">
                Thiệp của tôi
              </Link>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-card border border-border font-body text-xs font-semibold hover:bg-muted transition"
              >
                <LogOut className="w-3.5 h-3.5" /> Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login" className="font-body text-sm font-semibold text-foreground/80 hover:text-foreground">
              Đăng nhập
            </Link>
          )}
          <button
            onClick={goBuilder}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-body text-sm font-semibold hover:bg-foreground/85 transition-all"
          >
            Tạo thiệp ngay
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-full bg-card border border-border"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="lg:hidden mt-3 mx-5 rounded-2xl glass-card p-5 flex flex-col gap-3"
          >
            {links.map((l) =>
              l.route ? (
                <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="font-body text-base text-foreground/80 py-1.5">
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-body text-base text-foreground/80 py-1.5">
                  {l.label}
                </a>
              )
            )}
            {user ? (
              <Link to="/builder" onClick={() => setOpen(false)} className="font-body text-base text-foreground/80 py-1.5">
                Thiệp của tôi
              </Link>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="font-body text-base text-foreground/80 py-1.5">
                Đăng nhập
              </Link>
            )}
            <button
              onClick={() => {
                setOpen(false);
                goBuilder();
              }}
              className="mt-2 text-center px-5 py-3 rounded-full bg-foreground text-background font-body text-sm font-semibold"
            >
              Tạo thiệp ngay
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
