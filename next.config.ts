import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: [
      "http://192.168.1.233:3000",
      "http://192.168.1.233"
    ]
  }
};

export default nextConfig;