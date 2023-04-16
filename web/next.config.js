/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['leonafoto.closure.sk', 'leonafoto.sk'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
