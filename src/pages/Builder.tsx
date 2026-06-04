import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, LogOut, ArrowLeft } from "lucide-react";
import InvitationEditor from "@/components/InvitationEditor";
import TemplateCard from "@/components/TemplateCard";
import { templates, WeddingTemplate } from "@/data/templates";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const Builder = () => {
  const { user, signOut } = useAuthStore();
  const [selected, setSelected] = useState<WeddingTemplate | null>(null);

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
                Builder
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/services" className="hidden md:inline-flex font-body text-sm font-semibold text-foreground/80 hover:text-foreground">
              Dịch vụ cưới
            </Link>
            <Link to="/" className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Trang chủ
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

      <main>
        {selected ? (
          <InvitationEditor template={selected} onBack={() => setSelected(null)} />
        ) : (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
            <div className="mb-8">
              <h1 className="font-display text-4xl sm:text-5xl text-foreground">
                Chọn <span className="text-accent">mẫu thiệp</span>
              </h1>
              <p className="font-body text-base text-muted-foreground mt-2 max-w-2xl">
                Lựa chọn một mẫu để bắt đầu — bạn có thể tùy chỉnh nội dung, ảnh và nhạc nền sau đó.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((t, i) => (
                <TemplateCard key={t.id} template={t} index={i} onSelect={setSelected} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Builder;
