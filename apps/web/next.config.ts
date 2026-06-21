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
      {
        protocol: 'https',
        hostname: 'healdoor-prod-assets.s3.ap-south-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.healdoor.in',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['@healdoor/types', '@healdoor/utils', '@healdoor/ui'],
};

export default nextConfig;
