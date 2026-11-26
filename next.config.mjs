/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Admin portal photo uploads (max 4 MB per photo; Vercel caps request bodies at 4.5 MB).
      bodySizeLimit: '4.5mb',
    },
  },
};

export default nextConfig;
