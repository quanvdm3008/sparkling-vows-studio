import { Link } from "react-router-dom";
import { Heart, ArrowLeft, LogOut } from "lucide-react";
import WeddingServices from "@/components/WeddingServices";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const Services = () => {
  const { user, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass-nav border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gradient-rose-gold flex items-center justify-center shadow-gold">
              <Heart className="w-3.5 h-3.5 text-primary-foreground fill-primary-foreground" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Mireia<span className="text-accent">.</span>
              <span className="ml-2 font-body text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Marketplace
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Trang chủ
            </Link>
            <Link
              to="/builder"
              className="hidden md:inline-flex font-body text-sm font-semibold text-foreground/80 hover:text-foreground"
            >
              Thiệp của tôi
            </Link>
            <span className="hidden md:block font-body text-sm text-muted-foreground">{user?.email}</span>
            <button
              onClick={async () => {
                await signOut();
                toast.success("Đã đăng xuất");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border font-body text-xs font-semibold hover:bg-muted transition"
            >
              <LogOut className="w-3.5 h-3.5" /> Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main className="pt-6">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-8">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground">
            Dịch vụ cưới <span className="text-accent">tinh tuyển</span>
          </h1>
          <p className="font-body text-base text-muted-foreground mt-2 max-w-2xl">
            Khám phá các nhà cung cấp dịch vụ cưới uy tín — từ nhà hàng, nhiếp ảnh đến hoa cưới và trang trí.
          </p>
        </div>
        <WeddingServices accentColor="hsl(38 47% 50%)" />
      </main>
    </div>
  );
};

export default Services;
