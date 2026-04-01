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
  {
    id: "minimalist",
    name: "Elegant Minimalist",
    nameVi: "Tối Giản Thanh Lịch",
    description: "Thiết kế tối giản với đường nét tinh tế, champagne gold trên nền trắng ngà sang trọng.",
    image: "/template-minimalist",
    colors: ["#C9A96E", "#F5F0E8", "#2C2C2C"],
    category: "Tối giản",
  },
  {
    id: "vintage",
    name: "Vintage Romance",
    nameVi: "Cổ Điển Lãng Mạn",
    description: "Phong cách Victorian với hoa hồng cổ điển, viền trang trí công phu trên nền giấy cũ.",
    image: "/template-vintage",
    colors: ["#8B6914", "#D2B48C", "#F5E6CC"],
    category: "Cổ điển",
  },
  {
    id: "boho",
    name: "Bohemian Chic",
    nameVi: "Boho Phóng Khoáng",
    description: "Cỏ lau phơi khô, tông đất ấm áp terracotta, phong cách tự do và lãng mạn.",
    image: "/template-boho",
    colors: ["#C67B5C", "#E8D5C4", "#8B4513"],
    category: "Boho",
  },
  {
    id: "royal",
    name: "Royal Palace",
    nameVi: "Hoàng Gia Lộng Lẫy",
    description: "Thiết kế vương giả với burgundy đậm và vàng gold, họa tiết hoàng gia xa hoa.",
    image: "/template-royal",
    colors: ["#800020", "#D4A853", "#1A0A0A"],
    category: "Hoàng gia",
  },
  {
    id: "garden",
    name: "Fairy Garden",
    nameVi: "Vườn Cổ Tích",
    description: "Vườn hoa cổ tích với bướm và hoa watercolor pastel, lavender và mint xanh mát.",
    image: "/template-garden",
    colors: ["#E8A0BF", "#B39DDB", "#A5D6A7"],
    category: "Cổ tích",
  },
];
