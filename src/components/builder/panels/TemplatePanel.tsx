import { Layers, Check } from "lucide-react";
import { templates } from "@/data/templates";
import { useWeddingConfig } from "@/store/weddingConfigStore";
import { PanelHeader } from "./_shared";

const TemplatePanel = () => {
  const { templateId, setTemplate } = useWeddingConfig();
  return (
    <div className="space-y-4">
      <PanelHeader icon={<Layers className="w-4 h-4" />} title="Mẫu thiệp" sub="Chọn nhanh giữa các theme" />
      <div className="grid grid-cols-2 gap-2.5">
        {templates.map((t) => {
          const active = t.id === templateId;
          return (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`relative text-left p-2.5 rounded-xl border transition-all ${
                active ? "border-foreground/60 shadow-md" : "border-border hover:border-foreground/30"
              }`}
            >
              <div
                className="aspect-[4/5] rounded-lg mb-2 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1] ?? t.colors[0]})`,
                }}
              >
                {active && (
                  <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow">
                    <Check className="w-3 h-3 text-foreground" />
                  </span>
                )}
              </div>
              <p className="font-display text-xs font-semibold text-foreground leading-tight">{t.nameVi}</p>
              <p className="font-body text-[10px] text-muted-foreground">{t.category}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplatePanel;
