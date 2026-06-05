import { useState } from "react";
import {
  User, Calendar, MessageSquare, Palette, Music, Layers, Share2,
  ChevronLeft, Eye, Monitor, Smartphone, Tablet, X
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import WeddingFullPage from "@/components/WeddingFullPage";
import { useWeddingConfig } from "@/store/weddingConfigStore";
import CoupleePanel from "./panels/CouplePanel";
import DateVenuePanel from "./panels/DateVenuePanel";
import MessagePanel from "./panels/MessagePanel";
import AppearancePanel from "./panels/AppearancePanel";
import MusicPanel from "./panels/MusicPanel";
import TemplatePanel from "./panels/TemplatePanel";

type SectionKey = "template" | "couple" | "datetime" | "message" | "appearance" | "music";
type Device = "desktop" | "tablet" | "mobile";

const navItems: { key: SectionKey; label: string; icon: any }[] = [
  { key: "template", label: "Mẫu thiệp", icon: Layers },
  { key: "couple", label: "Cô dâu & Chú rể", icon: User },
  { key: "datetime", label: "Ngày & Địa điểm", icon: Calendar },
  { key: "message", label: "Lời mời", icon: MessageSquare },
  { key: "appearance", label: "Giao diện", icon: Palette },
  { key: "music", label: "Nhạc nền", icon: Music },
];

const deviceSize: Record<Device, { w: number; h: number }> = {
  desktop: { w: 1280, h: 800 },
  tablet: { w: 820, h: 1180 },
  mobile: { w: 390, h: 844 },
};

interface Props {
  onBack: () => void;
}

const BuilderShell = ({ onBack }: Props) => {
  const cfg = useWeddingConfig();
  const [active, setActive] = useState<SectionKey>("couple");
  const [device, setDevice] = useState<Device>("desktop");
  const [fullPreview, setFullPreview] = useState(false);

  const renderPanel = () => {
    switch (active) {
      case "template": return <TemplatePanel />;
      case "couple": return <CoupleePanel />;
      case "datetime": return <DateVenuePanel />;
      case "message": return <MessagePanel />;
      case "appearance": return <AppearancePanel />;
      case "music": return <MusicPanel />;
    }
  };

  const handlePublish = () => {
    const slug =
      `${cfg.groomName}-${cfg.brideName}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "wedding";
    cfg.setField("slug", slug);
    cfg.setField("published", true);
    const link = `${window.location.origin}/invitation/${slug}?t=${cfg.templateId}&groom=${encodeURIComponent(cfg.groomName)}&bride=${encodeURIComponent(cfg.brideName)}&date=${cfg.date}&time=${cfg.time}&venue=${encodeURIComponent(cfg.venue)}&address=${encodeURIComponent(cfg.address)}&msg=${encodeURIComponent(cfg.message)}&color=${encodeURIComponent(cfg.accentColor)}`;
    navigator.clipboard.writeText(link);
    toast.success("Đã sao chép link thiệp! 🎉");
  };

  // Compute preview scale to fit
  const { w, h } = deviceSize[device];

  if (fullPreview) {
    return (
      <div className="relative">
        <button
          onClick={() => setFullPreview(false)}
          className="fixed top-4 left-4 z-[60] flex items-center gap-2 px-4 py-2 rounded-full bg-card/90 backdrop-blur shadow-lg border border-border font-body text-sm font-semibold hover:bg-card"
        >
          <X className="w-4 h-4" /> Đóng preview
        </button>
        <WeddingFullPage
          groomName={cfg.groomName}
          brideName={cfg.brideName}
          date={cfg.date}
          time={cfg.time}
          venue={cfg.venue}
          address={cfg.address}
          message={cfg.message}
          accentColor={cfg.accentColor}
          templateId={cfg.templateId}
        />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-60px)] flex bg-muted/30">
      {/* LEFT SIDEBAR */}
      <aside className="w-[340px] flex-none bg-card border-r border-border flex flex-col">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4" /> Đổi mẫu
          </button>
          <span className="font-body text-[11px] tracking-widest uppercase text-muted-foreground">
            Builder
          </span>
        </div>

        {/* Nav */}
        <nav className="px-2 py-3 border-b border-border">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all ${
                  isActive
                    ? "bg-accent/15 text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                style={isActive ? { color: cfg.accentColor } : undefined}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto p-5">
          {renderPanel()}
        </div>
      </aside>

      {/* RIGHT: CANVAS */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top toolbar */}
        <div className="h-14 px-5 border-b border-border bg-card flex items-center justify-between flex-none">
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            {(["desktop", "tablet", "mobile"] as Device[]).map((d) => {
              const Icon = d === "desktop" ? Monitor : d === "tablet" ? Tablet : Smartphone;
              return (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    device === d ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  title={d}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFullPreview(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-card font-body text-sm font-medium hover:bg-muted transition"
            >
              <Eye className="w-4 h-4" /> Preview
            </button>
            <button
              onClick={handlePublish}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-body text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              style={{ backgroundColor: cfg.accentColor }}
            >
              <Share2 className="w-4 h-4" /> Publish
            </button>
          </div>
        </div>

        {/* Live preview frame */}
        <div className="flex-1 overflow-hidden flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center,hsl(var(--muted))_0%,transparent_70%)]">
          <div
            className="bg-background rounded-xl shadow-2xl overflow-hidden border border-border relative"
            style={{
              width: device === "desktop" ? "100%" : w,
              maxWidth: device === "desktop" ? 1400 : w,
              height: "100%",
              maxHeight: "100%",
            }}
          >
            <div className="absolute inset-0 overflow-auto">
              <WeddingFullPage
                groomName={cfg.groomName}
                brideName={cfg.brideName}
                date={cfg.date}
                time={cfg.time}
                venue={cfg.venue}
                address={cfg.address}
                message={cfg.message}
                accentColor={cfg.accentColor}
                templateId={cfg.templateId}
                skipIntro
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuilderShell;
