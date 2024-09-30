/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["api.ts", "page.tsx", "api.tsx", "md.ts"],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "prv-s3.grupocednet.com.br",
      },
      {
        hostname: "10.254.192.180",
      },
    ],
  },
};

export default nextConfig;
