import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Docker
  output: "standalone",
  
  // Disable trailing slash for cleaner URLs
  trailingSlash: false,
  
  // Image optimization
  images: {
    domains: ['irans.pro', 'www.irans.pro'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Compression
  compress: true,
  
  // Power by header
  poweredByHeader: false,
  
  // React strict mode
  reactStrictMode: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://irans.pro',
  },
};

export default nextConfig;
