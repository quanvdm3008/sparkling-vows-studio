import { Link } from "react-router-dom";
import { Heart, LogOut, ArrowLeft } from "lucide-react";
import InvitationEditor from "@/components/InvitationEditor";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const Builder = () => {
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
                Builder
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" /> Trang chủ
            </Link>
            <span className="hidden md:block font-body text-sm text-muted-foreground">
              {user?.email}
            </span>
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
        <InvitationEditor />
      </main>
    </div>
  );
};

export default Builder;
