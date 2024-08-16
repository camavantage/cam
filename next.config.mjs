/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
    formats: ["image/webp"],
  },
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
};

export default nextConfig;
