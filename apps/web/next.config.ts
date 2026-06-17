import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from public directory (default) and any external sources if needed later
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/api/media/file/**',
      },
    ],
  },
  transpilePackages: ['@healdoor/types', '@healdoor/utils'],
};

export default nextConfig;
