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
      {
        source: "/:city/one-way-cabs",
        destination: "/:city/outstation-cabs",
        permanent: true,
      },
      {
        source: "/:city/round-trip-cabs",
        destination: "/:city/outstation-cabs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
