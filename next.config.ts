import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ده اللي بيخلّي Next يطلع static site في فولدر out
  output: "export",

  // عشان الصور تشتغل كويس مع GitHub Pages من غير Image Optimization سيرفر
  images: {
    unoptimized: true,
  },

  // لو عندك إعدادات تانية هنا سيبها
};

export default nextConfig;
