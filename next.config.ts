import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/tingshan-studio",
  assetPrefix: "/tingshan-studio/",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;