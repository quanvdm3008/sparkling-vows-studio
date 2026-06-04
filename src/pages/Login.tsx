import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { z } from "zod";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const authSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ").max(255),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự").max(72),
  displayName: z.string().trim().min(1).max(80).optional(),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, initialized, signIn, signUp, loading } = useAuthStore();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const from = (location.state as { from?: string } | null)?.from ?? "/builder";

  useEffect(() => {
    if (initialized && user) navigate(from, { replace: true });
  }, [initialized, user, from, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = authSchema.safeParse({
      email,
      password,
      displayName: mode === "signup" ? displayName : undefined,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ");
      return;
    }
    if (mode === "signin") {
      const { error } = await signIn(email, password);
      if (error) return toast.error(error);
      toast.success("Đăng nhập thành công");
      navigate(from, { replace: true });
    } else {
      const { error } = await signUp(email, password, displayName);
      if (error) return toast.error(error);
      toast.success("Tạo tài khoản thành công. Hãy kiểm tra email để xác nhận.");
      setMode("signin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-background via-secondary/30 to-background">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <span className="w-10 h-10 rounded-full bg-gradient-rose-gold flex items-center justify-center shadow-gold">
            <Heart className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight">
            Mireia<span className="text-accent">.</span>
          </span>
        </Link>

        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-border shadow-elegant">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-foreground">
              {mode === "signin" ? "Chào mừng trở lại" : "Tạo tài khoản"}
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-2">
              {mode === "signin"
                ? "Đăng nhập để thiết kế thiệp cưới của bạn"
                : "Bắt đầu tạo thiệp cưới chỉ trong vài phút"}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tên hiển thị"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition"
                  maxLength={80}
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition"
                required
                maxLength={255}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition"
                required
                minLength={6}
                maxLength={72}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-body text-sm font-semibold hover:bg-foreground/85 transition disabled:opacity-60"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "signin" ? "Đăng nhập" : "Tạo tài khoản"}
            </button>
          </form>

          <div className="mt-6 text-center font-body text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>
                Chưa có tài khoản?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-accent font-semibold hover:underline"
                >
                  Đăng ký
                </button>
              </>
            ) : (
              <>
                Đã có tài khoản?{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="text-accent font-semibold hover:underline"
                >
                  Đăng nhập
                </button>
              </>
            )}
          </div>
        </div>

        <p className="text-center font-body text-xs text-muted-foreground mt-6">
          ← <Link to="/" className="hover:text-foreground">Quay về trang chủ</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
