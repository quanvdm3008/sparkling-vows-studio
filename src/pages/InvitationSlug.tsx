import { useParams, useSearchParams } from "react-router-dom";
import WeddingFullPage from "@/components/WeddingFullPage";

/**
 * Public guest-facing invitation page.
 * Backward compatible: data still comes from URL search params (?groom=&bride=...).
 * The :slug acts as a vanity identifier (e.g. /invitation/minh-ha) until we wire a DB lookup.
 */
const InvitationSlug = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  // Try to derive default names from slug like "minh-ha" → ["Minh", "Ha"]
  const slugParts = (slug ?? "").split("-").filter(Boolean);
  const fallbackGroom = slugParts[0]
    ? slugParts[0].charAt(0).toUpperCase() + slugParts[0].slice(1)
    : "Minh Anh";
  const fallbackBride = slugParts[1]
    ? slugParts[1].charAt(0).toUpperCase() + slugParts[1].slice(1)
    : "Thanh Hà";

  return (
    <WeddingFullPage
      groomName={searchParams.get("groom") || fallbackGroom}
      brideName={searchParams.get("bride") || fallbackBride}
      date={searchParams.get("date") || "2025-12-20"}
      time={searchParams.get("time") || "17:30"}
      venue={searchParams.get("venue") || "White Palace Convention Center"}
      address={searchParams.get("address") || "123 Đường Nguyễn Huệ, Quận 1, TP.HCM"}
      message={searchParams.get("msg") || ""}
      accentColor={searchParams.get("color") || "#E8B4B8"}
      templateId={searchParams.get("t") || "romantic"}
    />
  );
};

export default InvitationSlug;
