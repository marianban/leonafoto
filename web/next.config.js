/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'leonafoto.closure.sk',
      },
      {
        protocol: 'https',
        hostname: 'leonafoto.sk',
      },
    ],
  },
};

module.exports = nextConfig;
