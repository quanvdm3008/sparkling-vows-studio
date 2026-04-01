import { useSearchParams } from "react-router-dom";
import WeddingFullPage from "@/components/WeddingFullPage";

const InvitationView = () => {
  const [searchParams] = useSearchParams();

  return (
    <WeddingFullPage
      groomName={searchParams.get("groom") || "Minh Anh"}
      brideName={searchParams.get("bride") || "Thanh Hà"}
      date={searchParams.get("date") || "2025-12-20"}
      time={searchParams.get("time") || "17:30"}
      venue={searchParams.get("venue") || "White Palace Convention Center"}
      address={searchParams.get("address") || "123 Đường Nguyễn Huệ, Quận 1, TP.HCM"}
      message={searchParams.get("msg") || ""}
      accentColor={searchParams.get("color") || "#E8B4B8"}
    />
  );
};

export default InvitationView;
