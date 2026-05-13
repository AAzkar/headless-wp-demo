/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amaan.sitecrafters.asia',
      },
    ],
  },
};

export default nextConfig;