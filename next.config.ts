import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
