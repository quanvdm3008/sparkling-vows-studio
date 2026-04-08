import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Share2, Eye, Check, Palette, Heart, User, MapPin,
  Calendar, Clock, MessageSquare, Copy, QrCode, Facebook, Send,
  Sparkles, ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { WeddingTemplate } from "@/data/templates";
import WeddingFullPage from "./WeddingFullPage";

interface EditorProps {
  template: WeddingTemplate;
  onBack: () => void;
}

const accentColors = [
  { color: "#E8B4B8", name: "Hồng" },
  { color: "#D4A853", name: "Vàng" },
  { color: "#A3B18A", name: "Xanh lá" },
  { color: "#9B7CB5", name: "Tím" },
  { color: "#FFB7C5", name: "Hồng nhạt" },
  { color: "#C75B39", name: "Cam đất" },
  { color: "#1B2838", name: "Xanh đậm" },
  { color: "#88C9BF", name: "Ngọc" },
];

const InvitationEditor = ({ template, onBack }: EditorProps) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [formData, setFormData] = useState({
    groomName: "Minh Anh",
    brideName: "Thanh Hà",
    date: "2025-12-20",
    time: "17:30",
    venue: "White Palace Convention Center",
    address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    message: "Trân trọng kính mời quý khách đến dự lễ thành hôn của chúng tôi. Sự hiện diện của quý khách là niềm vinh hạnh lớn lao.",
    accentColor: template.colors[0],
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateShareLink = () => {
    const params = new URLSearchParams({
      t: template.id,
      groom: formData.groomName,
      bride: formData.brideName,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      address: formData.address,
      msg: formData.message,
      color: formData.accentColor,
    });
    return `${window.location.origin}/view?${params.toString()}`;
  };

  // Full preview mode
  if (previewMode) {
    return (
      <div className="relative">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setPreviewMode(false)}
          className="fixed top-4 left-4 z-[60] flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/90 backdrop-blur-md shadow-lg text-foreground font-body text-sm font-semibold border border-border hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại chỉnh sửa
        </motion.button>
        <WeddingFullPage
          groomName={formData.groomName}
          brideName={formData.brideName}
          date={formData.date}
          time={formData.time}
          venue={formData.venue}
          address={formData.address}
          message={formData.message}
          accentColor={formData.accentColor}
          templateId={template.id}
        />
      </div>
    );
  }

  const tabs = [
    { icon: <User className="w-4 h-4" />, label: "Cô dâu & Chú rể" },
    { icon: <Calendar className="w-4 h-4" />, label: "Thời gian & Địa điểm" },
    { icon: <MessageSquare className="w-4 h-4" />, label: "Lời mời" },
    { icon: <Palette className="w-4 h-4" />, label: "Giao diện" },
  ];

  return (
    <section className="py-8 px-4 relative z-10 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-body group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại bộ sưu tập
        </motion.button>

        {/* Header with template preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
              style={{ background: `linear-gradient(135deg, ${formData.accentColor}, ${formData.accentColor}80)` }}
            >
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Tạo Thiệp Cưới
              </h2>
              <p className="text-muted-foreground font-body text-sm">
                Mẫu <span className="font-semibold" style={{ color: formData.accentColor }}>{template.nameVi}</span>
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* LEFT: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Tab Navigation */}
            <div className="flex gap-1 p-1 bg-secondary/60 rounded-2xl mb-6 overflow-x-auto">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-all whitespace-nowrap flex-1 justify-center ${
                    activeTab === i
                      ? "bg-card text-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-card rounded-3xl p-6 md:p-8 shadow-xl border border-border"
              >
                {activeTab === 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${formData.accentColor}15` }}>
                        <Heart className="w-5 h-5" style={{ color: formData.accentColor }} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">Thông Tin Cô Dâu & Chú Rể</h3>
                        <p className="text-muted-foreground font-body text-xs">Nhập tên cặp đôi sẽ hiển thị trên thiệp</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-body font-semibold text-foreground text-sm flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: formData.accentColor }} />
                          Tên Chú Rể
                        </Label>
                        <Input
                          value={formData.groomName}
                          onChange={(e) => updateField("groomName", e.target.value)}
                          className="font-body h-12 rounded-xl border-border/50 focus:border-primary"
                          placeholder="Nhập tên chú rể"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-body font-semibold text-foreground text-sm flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: formData.accentColor }} />
                          Tên Cô Dâu
                        </Label>
                        <Input
                          value={formData.brideName}
                          onChange={(e) => updateField("brideName", e.target.value)}
                          className="font-body h-12 rounded-xl border-border/50 focus:border-primary"
                          placeholder="Nhập tên cô dâu"
                        />
                      </div>
                    </div>

                    {/* Preview names */}
                    <div className="p-5 rounded-2xl text-center" style={{ backgroundColor: `${formData.accentColor}08`, border: `1px dashed ${formData.accentColor}30` }}>
                      <p className="font-body text-xs text-muted-foreground mb-2">Xem trước</p>
                      <p className="font-display text-2xl font-bold" style={{ color: formData.accentColor }}>
                        {formData.groomName || "..."} <span className="text-muted-foreground mx-2">&</span> {formData.brideName || "..."}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(1)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-body font-semibold text-sm text-primary-foreground"
                        style={{ backgroundColor: formData.accentColor }}
                      >
                        Tiếp theo
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${formData.accentColor}15` }}>
                        <MapPin className="w-5 h-5" style={{ color: formData.accentColor }} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">Thời Gian & Địa Điểm</h3>
                        <p className="text-muted-foreground font-body text-xs">Chi tiết về ngày cưới và nơi tổ chức</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-body font-semibold text-foreground text-sm flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" style={{ color: formData.accentColor }} />
                          Ngày Cưới
                        </Label>
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => updateField("date", e.target.value)}
                          className="font-body h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-body font-semibold text-foreground text-sm flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" style={{ color: formData.accentColor }} />
                          Giờ
                        </Label>
                        <Input
                          type="time"
                          value={formData.time}
                          onChange={(e) => updateField("time", e.target.value)}
                          className="font-body h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-body font-semibold text-foreground text-sm flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" style={{ color: formData.accentColor }} />
                        Tên Địa Điểm
                      </Label>
                      <Input
                        value={formData.venue}
                        onChange={(e) => updateField("venue", e.target.value)}
                        className="font-body h-12 rounded-xl"
                        placeholder="VD: White Palace"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-body font-semibold text-foreground text-sm flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" style={{ color: formData.accentColor }} />
                        Địa Chỉ
                      </Label>
                      <Input
                        value={formData.address}
                        onChange={(e) => updateField("address", e.target.value)}
                        className="font-body h-12 rounded-xl"
                        placeholder="VD: 123 Nguyễn Huệ, Q1"
                      />
                    </div>

                    <div className="flex justify-between">
                      <button onClick={() => setActiveTab(0)} className="px-4 py-2.5 rounded-xl font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                        ← Quay lại
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(2)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-body font-semibold text-sm text-primary-foreground"
                        style={{ backgroundColor: formData.accentColor }}
                      >
                        Tiếp theo
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${formData.accentColor}15` }}>
                        <MessageSquare className="w-5 h-5" style={{ color: formData.accentColor }} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">Lời Mời</h3>
                        <p className="text-muted-foreground font-body text-xs">Viết lời mời gửi đến khách</p>
                      </div>
                    </div>

                    <Textarea
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className="font-body min-h-[160px] rounded-xl text-base leading-relaxed resize-none"
                      placeholder="Viết lời mời..."
                    />

                    <div className="p-4 rounded-xl bg-secondary/40">
                      <p className="font-body text-xs text-muted-foreground mb-2">💡 Gợi ý mẫu:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Trân trọng kính mời quý khách...",
                          "Chúng tôi vô cùng hạnh phúc...",
                          "Xin hân hạnh được đón tiếp...",
                        ].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateField("message", s)}
                            className="px-3 py-1.5 rounded-lg bg-card border border-border font-body text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button onClick={() => setActiveTab(1)} className="px-4 py-2.5 rounded-xl font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                        ← Quay lại
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(3)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-body font-semibold text-sm text-primary-foreground"
                        style={{ backgroundColor: formData.accentColor }}
                      >
                        Tiếp theo
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${formData.accentColor}15` }}>
                        <Palette className="w-5 h-5" style={{ color: formData.accentColor }} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">Tùy Chỉnh Giao Diện</h3>
                        <p className="text-muted-foreground font-body text-xs">Chọn màu chủ đạo cho thiệp cưới</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {accentColors.map(({ color, name }) => (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateField("accentColor", color)}
                          className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                            formData.accentColor === color
                              ? "border-foreground shadow-lg bg-secondary/50"
                              : "border-transparent hover:bg-secondary/30"
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-full shadow-md relative"
                            style={{ backgroundColor: color }}
                          >
                            {formData.accentColor === color && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <Check className="w-4 h-4 text-white drop-shadow" />
                              </motion.div>
                            )}
                          </div>
                          <span className="font-body text-[10px] text-muted-foreground">{name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {tabs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: activeTab === i ? formData.accentColor : "hsl(var(--muted-foreground) / 0.2)",
                    width: activeTab === i ? 24 : 8,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Live Preview Card + Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Mini Preview */}
            <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
              <div
                className="p-8 text-center"
                style={{ background: `linear-gradient(135deg, ${formData.accentColor}15, ${formData.accentColor}05)` }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-4xl mb-3"
                >
                  💌
                </motion.div>
                <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Thiệp Cưới</p>
                <h3 className="font-display text-xl font-bold" style={{ color: formData.accentColor }}>
                  {formData.groomName} & {formData.brideName}
                </h3>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <div className="w-8 h-[1px]" style={{ backgroundColor: `${formData.accentColor}40` }} />
                  <Heart className="w-3 h-3" style={{ color: formData.accentColor }} fill={formData.accentColor} />
                  <div className="w-8 h-[1px]" style={{ backgroundColor: `${formData.accentColor}40` }} />
                </div>
                {formData.date && (
                  <p className="font-body text-xs text-muted-foreground mt-3">
                    {new Date(formData.date).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                )}
                {formData.venue && (
                  <p className="font-body text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {formData.venue}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPreviewMode(true)}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-primary-foreground font-body font-bold text-base shadow-lg"
              style={{ backgroundColor: formData.accentColor }}
            >
              <Eye className="w-5 h-5" />
              Xem Trước Thiệp Cưới
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSharePanel(!showSharePanel)}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-card text-foreground font-body font-bold text-base shadow-lg border-2 border-border hover:border-primary/30 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Chia Sẻ Thiệp
            </motion.button>

            {/* Share Panel */}
            <AnimatePresence>
              {showSharePanel && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
                >
                  <div className="p-5 space-y-3">
                    <p className="font-body text-sm font-semibold text-foreground">Chia sẻ qua:</p>

                    <button
                      onClick={() => {
                        const url = generateShareLink();
                        navigator.clipboard.writeText(url);
                        toast.success("Đã sao chép link!", { description: "Gửi link này cho khách mời." });
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Copy className="w-4 h-4 text-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="font-body text-sm font-semibold text-foreground">Sao chép link</p>
                        <p className="font-body text-[10px] text-muted-foreground">Copy link gửi qua tin nhắn</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        const url = generateShareLink();
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#1877F2]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Facebook className="w-4 h-4 text-[#1877F2]" />
                      </div>
                      <div className="text-left">
                        <p className="font-body text-sm font-semibold text-foreground">Facebook</p>
                        <p className="font-body text-[10px] text-muted-foreground">Chia sẻ lên Facebook</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        const url = generateShareLink();
                        const text = `Mời bạn đến dự lễ cưới của ${formData.groomName} & ${formData.brideName}! 💕`;
                        window.open(`https://zalo.me/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`, "_blank");
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#0068FF]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Send className="w-4 h-4 text-[#0068FF]" />
                      </div>
                      <div className="text-left">
                        <p className="font-body text-sm font-semibold text-foreground">Zalo</p>
                        <p className="font-body text-[10px] text-muted-foreground">Gửi qua Zalo</p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InvitationEditor;
