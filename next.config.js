/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '*.sslip.io' },
      { protocol: 'https', hostname: 'www.legendscupofficial.com.tr' },
    ],
  },
}

module.exports = nextConfig
