import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWeddingConfig } from "@/store/weddingConfigStore";
import { PanelHeader, Field } from "./_shared";

const CouplePanel = () => {
  const { groomName, brideName, accentColor, setField } = useWeddingConfig();
  return (
    <div className="space-y-5">
      <PanelHeader icon={<User className="w-4 h-4" />} title="Cô dâu & Chú rể" sub="Tên sẽ xuất hiện trên thiệp" />
      <Field label="Tên Chú Rể">
        <Input value={groomName} onChange={(e) => setField("groomName", e.target.value)} className="h-10" />
      </Field>
      <Field label="Tên Cô Dâu">
        <Input value={brideName} onChange={(e) => setField("brideName", e.target.value)} className="h-10" />
      </Field>
      <div className="p-4 rounded-xl border border-dashed text-center" style={{ borderColor: `${accentColor}55`, background: `${accentColor}08` }}>
        <p className="font-body text-[11px] text-muted-foreground mb-1">Xem trước</p>
        <p className="font-display text-lg font-semibold" style={{ color: accentColor }}>
          {groomName || "..."} <span className="text-muted-foreground mx-1">&</span> {brideName || "..."}
        </p>
      </div>
    </div>
  );
};

export default CouplePanel;
