/** @type {import('next').NextConfig} */

const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX;
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "loremflickr.com",
      "pearluk.s3.ap-northeast-2.amazonaws.com",
      "pearlukdev.s3.ap-northeast-2.amazonaws.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: domain
          ? `${protocol}://api.${domain}/${apiPrefix}/:path*`
          : "http://localhost:8000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
