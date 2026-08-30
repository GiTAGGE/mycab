import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/hubli-to-murudheshwara-cab",
        destination: "/hubli-to-murudeshwar-cab",
        permanent: true,
      },
      {
        source: "/hubli-to-hosapete-cab",
        destination: "/hubli-to-hospet-cab",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
