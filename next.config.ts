import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/OsamaGharibElwaly",
  assetPrefix: "/OsamaGharibElwaly/",
};

export default nextConfig;
