import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jobepropco.co.za",
      },
      {
        protocol: "https",
        hostname: "jobelifestyle.co.za",
      },
      {
        protocol: "https",
        hostname: "drsitholefoundation.org",
      },
      {
        protocol: "https",
        hostname: "centerconnect.co.za",
      },
    ],
  },
};

export default nextConfig;
