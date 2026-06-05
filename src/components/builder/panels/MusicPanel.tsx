import { Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWeddingConfig } from "@/store/weddingConfigStore";
import { PanelHeader, Field } from "./_shared";

const presets = [
  { name: "Canon in D", url: "" },
  { name: "A Thousand Years", url: "" },
  { name: "Perfect — Ed Sheeran", url: "" },
];

const MusicPanel = () => {
  const { musicUrl, setField } = useWeddingConfig();
  return (
    <div className="space-y-5">
      <PanelHeader icon={<Music className="w-4 h-4" />} title="Nhạc nền" sub="Dán URL audio (MP3) cho thiệp" />
      <Field label="URL Audio">
        <Input
          placeholder="https://.../song.mp3"
          value={musicUrl}
          onChange={(e) => setField("musicUrl", e.target.value)}
          className="h-10 font-mono text-xs"
        />
      </Field>
      <div>
        <p className="font-body text-[11px] text-muted-foreground mb-2">Gợi ý nhạc cưới (sẽ bổ sung URL sau):</p>
        <div className="space-y-1.5">
          {presets.map((p) => (
            <div key={p.name} className="px-3 py-2 rounded-lg border border-dashed border-border font-body text-xs text-muted-foreground">
              {p.name}
            </div>
          ))}
        </div>
      </div>
      <p className="text-[11px] font-body text-muted-foreground leading-relaxed">
        💡 Mẹo: Upload file MP3 lên dịch vụ lưu trữ (Cloudinary, S3, GitHub) rồi dán đường dẫn vào đây.
      </p>
    </div>
  );
};

export default MusicPanel;
