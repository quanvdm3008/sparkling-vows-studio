import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWeddingConfig } from "@/store/weddingConfigStore";
import { PanelHeader, Field } from "./_shared";

const DateVenuePanel = () => {
  const { date, time, venue, address, setField } = useWeddingConfig();
  return (
    <div className="space-y-5">
      <PanelHeader icon={<Calendar className="w-4 h-4" />} title="Ngày & Địa điểm" sub="Chi tiết về buổi lễ" />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Ngày">
          <Input type="date" value={date} onChange={(e) => setField("date", e.target.value)} className="h-10" />
        </Field>
        <Field label="Giờ">
          <Input type="time" value={time} onChange={(e) => setField("time", e.target.value)} className="h-10" />
        </Field>
      </div>
      <Field label="Tên địa điểm">
        <Input value={venue} onChange={(e) => setField("venue", e.target.value)} className="h-10" placeholder="VD: White Palace" />
      </Field>
      <Field label="Địa chỉ">
        <Input value={address} onChange={(e) => setField("address", e.target.value)} className="h-10" placeholder="Số nhà, đường, quận, thành phố" />
      </Field>
    </div>
  );
};

export default DateVenuePanel;
