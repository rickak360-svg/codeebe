import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@codeebe/shared"],
  turbopack: {
    root: "../..",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "**.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
