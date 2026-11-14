/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: {
    '/*': [
      'node_modules/.prisma/client/**/*',
      'node_modules/**/better-sqlite3/build/Release/*.node',
    ],
  },
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
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = nextConfig;
