/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["api.ts", "page.tsx", "api.tsx"],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "prv-s3.grupocednet.com.br",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
