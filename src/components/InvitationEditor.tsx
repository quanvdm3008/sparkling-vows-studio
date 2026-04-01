import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Download, Palette, Eye, Check } from "lucide-react";
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

const fontOptions = [
  { name: "Playfair Display", value: "'Playfair Display', serif" },
  { name: "Quicksand", value: "'Quicksand', sans-serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Cursive", value: "cursive" },
];

const InvitationEditor = ({ template, onBack }: EditorProps) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState({
    groomName: "Minh Anh",
    brideName: "Thanh Hà",
    date: "2025-12-20",
    time: "17:30",
    venue: "White Palace Convention Center",
    address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    message: "Trân trọng kính mời quý khách đến dự lễ thành hôn của chúng tôi. Sự hiện diện của quý khách là niềm vinh hạnh lớn lao.",
    selectedFont: "'Playfair Display', serif",
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
      font: formData.selectedFont,
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

  return (
    <section className="py-12 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại bộ sưu tập
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Tùy Chỉnh Thiệp Cưới
            </h2>
            <p className="text-muted-foreground font-body">
              Mẫu: <span className="text-primary font-semibold">{template.nameVi}</span> — Điền thông tin bên dưới rồi xem trước trang web cưới hoàn chỉnh
            </p>
          </div>

          <div className="bg-card rounded-3xl p-6 md:p-8 shadow-xl border border-border space-y-6">
            {/* Names */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body font-semibold text-foreground">Tên Chú Rể</Label>
                <Input value={formData.groomName} onChange={(e) => updateField("groomName", e.target.value)} className="font-body" />
              </div>
              <div className="space-y-2">
                <Label className="font-body font-semibold text-foreground">Tên Cô Dâu</Label>
                <Input value={formData.brideName} onChange={(e) => updateField("brideName", e.target.value)} className="font-body" />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body font-semibold text-foreground">Ngày Cưới</Label>
                <Input type="date" value={formData.date} onChange={(e) => updateField("date", e.target.value)} className="font-body" />
              </div>
              <div className="space-y-2">
                <Label className="font-body font-semibold text-foreground">Giờ</Label>
                <Input type="time" value={formData.time} onChange={(e) => updateField("time", e.target.value)} className="font-body" />
              </div>
            </div>

            {/* Venue */}
            <div className="space-y-2">
              <Label className="font-body font-semibold text-foreground">Địa Điểm</Label>
              <Input value={formData.venue} onChange={(e) => updateField("venue", e.target.value)} className="font-body" />
            </div>
            <div className="space-y-2">
              <Label className="font-body font-semibold text-foreground">Địa Chỉ</Label>
              <Input value={formData.address} onChange={(e) => updateField("address", e.target.value)} className="font-body" />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label className="font-body font-semibold text-foreground">Lời Mời</Label>
              <Textarea value={formData.message} onChange={(e) => updateField("message", e.target.value)} className="font-body min-h-[100px]" />
            </div>

            {/* Style customization */}
            <div className="space-y-4 p-5 rounded-2xl bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 text-foreground font-body font-semibold">
                <Palette className="w-4 h-4" />
                Tùy Chỉnh Giao Diện
              </div>

              <div className="space-y-2">
                <Label className="font-body text-sm text-muted-foreground">Màu Nhấn</Label>
                <div className="flex gap-3">
                  {["#E8B4B8", "#D4A853", "#A3B18A", "#9B7CB5", "#FFB7C5", "#C75B39", "#1B2838", "#88C9BF"].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateField("accentColor", color)}
                      className={`w-9 h-9 rounded-full border-2 transition-all relative ${
                        formData.accentColor === color ? "border-foreground scale-110 shadow-md" : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {formData.accentColor === color && (
                        <Check className="w-4 h-4 text-primary-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPreviewMode(true)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-body font-semibold text-base shadow-lg"
            >
              <Eye className="w-5 h-5" />
              Xem Trước Trang Web Cưới
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const url = generateShareLink();
                navigator.clipboard.writeText(url);
                toast.success("Đã sao chép link!", { description: "Gửi link này cho khách mời để xem trang web cưới." });
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-gold text-primary-foreground font-body font-semibold text-base shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              Sao Chép Link Chia Sẻ
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvitationEditor;
