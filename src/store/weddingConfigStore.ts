import { create } from "zustand";
import { persist } from "zustand/middleware";
import { templates } from "@/data/templates";

export interface WeddingConfig {
  templateId: string;
  groomName: string;
  brideName: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  message: string;
  accentColor: string;
  musicUrl: string;
  slug: string;
  published: boolean;
}

interface WeddingConfigState extends WeddingConfig {
  setField: <K extends keyof WeddingConfig>(key: K, value: WeddingConfig[K]) => void;
  setTemplate: (templateId: string) => void;
  reset: () => void;
  load: (cfg: Partial<WeddingConfig>) => void;
}

const defaultConfig: WeddingConfig = {
  templateId: "romantic",
  groomName: "Minh Anh",
  brideName: "Thanh Hà",
  date: "2027-02-14",
  time: "17:30",
  venue: "White Palace Convention Center",
  address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
  message:
    "Trân trọng kính mời quý khách đến dự lễ thành hôn của chúng tôi. Sự hiện diện của quý khách là niềm vinh hạnh lớn lao.",
  accentColor: "#E8B4B8",
  musicUrl: "",
  slug: "",
  published: false,
};

export const useWeddingConfig = create<WeddingConfigState>()(
  persist(
    (set) => ({
      ...defaultConfig,
      setField: (key, value) => set({ [key]: value } as any),
      setTemplate: (templateId) => {
        const t = templates.find((x) => x.id === templateId);
        set({
          templateId,
          accentColor: t?.colors?.[0] ?? defaultConfig.accentColor,
        });
      },
      load: (cfg) => set({ ...cfg }),
      reset: () => set({ ...defaultConfig }),
    }),
    { name: "wedding-config" }
  )
);
