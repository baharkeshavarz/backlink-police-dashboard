/** @type {import('next').NextConfig} */
import nextIntlPlugin from 'next-intl/plugin';

const withNextIntl = nextIntlPlugin('./src/i18n.ts');

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
