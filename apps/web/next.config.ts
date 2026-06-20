import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from public directory (default) and any external sources if needed later
    unoptimized: false,
    dangerouslyAllowLocalIP: true,  // TODO: remove in production
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/api/media/file/**',
      },
    ],
  },
  transpilePackages: ['@healdoor/types', '@healdoor/utils', '@healdoor/ui'],
};

export default nextConfig;
