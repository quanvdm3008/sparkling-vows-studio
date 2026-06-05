import { MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useWeddingConfig } from "@/store/weddingConfigStore";
import { PanelHeader } from "./_shared";

const samples = [
  "Trân trọng kính mời quý khách đến dự lễ thành hôn của chúng tôi.",
  "Chúng tôi vô cùng hạnh phúc khi được đón tiếp quý khách trong ngày trọng đại.",
  "Sự hiện diện của quý khách là niềm vinh hạnh lớn lao đối với chúng tôi.",
];

const MessagePanel = () => {
  const { message, setField } = useWeddingConfig();
  return (
    <div className="space-y-4">
      <PanelHeader icon={<MessageSquare className="w-4 h-4" />} title="Lời mời" sub="Viết lời mời gửi đến khách" />
      <Textarea
        value={message}
        onChange={(e) => setField("message", e.target.value)}
        className="min-h-[160px] text-sm leading-relaxed resize-none"
      />
      <div>
        <p className="font-body text-[11px] text-muted-foreground mb-2">Gợi ý:</p>
        <div className="space-y-1.5">
          {samples.map((s) => (
            <button
              key={s}
              onClick={() => setField("message", s)}
              className="w-full text-left text-xs font-body px-3 py-2 rounded-lg border border-border hover:border-foreground/40 hover:bg-muted transition"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagePanel;
