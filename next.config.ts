import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "C:\\Users\\Asus\\Documents\\GitHub\\homepicksdaily",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "homepicksdaily.com",
      },
      {
        protocol: "https",
        hostname: "*.alicdn.com",
      },
      {
        protocol: "https",
        hostname: "ae01.alicdn.com",
      },
    ],
  },
};

export default nextConfig;
