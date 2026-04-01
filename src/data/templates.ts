export interface WeddingTemplate {
  id: string;
  name: string;
  nameVi: string;
  description: string;
  image: string;
  colors: string[];
  category: string;
}

export const templates: WeddingTemplate[] = [
  {
    id: "romantic",
    name: "Romantic Garden",
    nameVi: "Vườn Hồng Lãng Mạn",
    description: "Hoa hồng pastel kết hợp eucalyptus, phong cách watercolor nhẹ nhàng và thanh lịch.",
    image: "/template-romantic",
    colors: ["#E8B4B8", "#A3B18A", "#DEB887"],
    category: "Lãng mạn",
  },
  {
    id: "modern",
    name: "Art Deco Luxe",
    nameVi: "Sang Trọng Art Deco",
    description: "Phong cách Art Deco hiện đại với đường nét hình học vàng gold trên nền navy đậm.",
    image: "/template-modern",
    colors: ["#1B2838", "#D4A853", "#FFFFFF"],
    category: "Hiện đại",
  },
  {
    id: "tropical",
    name: "Tropical Paradise",
    nameVi: "Thiên Đường Nhiệt Đới",
    description: "Lá nhiệt đới và hoa hibiscus rực rỡ, phong cách boho chic ấm áp.",
    image: "/template-tropical",
    colors: ["#C75B39", "#2D5016", "#DEB887"],
    category: "Nhiệt đới",
  },
  {
    id: "rustic",
    name: "Rustic Charm",
    nameVi: "Mộc Mạc Duyên Dáng",
    description: "Vòng hoa dại lavender trên nền giấy kraft, vẻ đẹp đồng quê cổ điển.",
    image: "/template-rustic",
    colors: ["#9B7CB5", "#C48B9F", "#D2B48C"],
    category: "Cổ điển",
  },
  {
    id: "sakura",
    name: "Sakura Dreams",
    nameVi: "Giấc Mơ Hoa Anh Đào",
    description: "Hoa anh đào Nhật Bản watercolor mơ màng, pastel hồng nhẹ nhàng như giấc mơ.",
    image: "/template-sakura",
    colors: ["#FFB7C5", "#F8E8EE", "#8B6F6F"],
    category: "Nhật Bản",
  },
];
