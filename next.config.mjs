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
    disable: process.env.NODE_ENV === "development",
  }),
};

export default nextConfig;
