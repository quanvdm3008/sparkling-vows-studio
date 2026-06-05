import { Palette, Check } from "lucide-react";
import { useWeddingConfig } from "@/store/weddingConfigStore";
import { PanelHeader, Field } from "./_shared";

const accentColors = [
  "#E8B4B8", "#D4A853", "#A3B18A", "#9B7CB5",
  "#FFB7C5", "#C75B39", "#1B2838", "#88C9BF",
  "#C9A96E", "#E8A0BF", "#C67B5C", "#800020",
];

const AppearancePanel = () => {
  const { accentColor, setField } = useWeddingConfig();
  return (
    <div className="space-y-5">
      <PanelHeader icon={<Palette className="w-4 h-4" />} title="Giao diện" sub="Tùy chỉnh màu sắc chủ đạo" />
      <Field label="Màu nhấn">
        <div className="grid grid-cols-6 gap-2">
          {accentColors.map((c) => (
            <button
              key={c}
              onClick={() => setField("accentColor", c)}
              className="aspect-square rounded-lg relative ring-offset-2 ring-offset-card transition-all hover:scale-110"
              style={{ background: c, boxShadow: accentColor === c ? `0 0 0 2px ${c}` : undefined }}
              title={c}
            >
              {accentColor === c && (
                <Check className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow" />
              )}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Mã màu tùy chỉnh">
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={accentColor}
            onChange={(e) => setField("accentColor", e.target.value)}
            className="w-12 h-10 rounded-lg border border-border cursor-pointer"
          />
          <input
            type="text"
            value={accentColor}
            onChange={(e) => setField("accentColor", e.target.value)}
            className="flex-1 h-10 px-3 rounded-lg border border-border bg-background font-mono text-sm"
          />
        </div>
      </Field>
    </div>
  );
};

export default AppearancePanel;
