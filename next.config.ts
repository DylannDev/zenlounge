import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/location", destination: "/", permanent: false },
      { source: "/location/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
