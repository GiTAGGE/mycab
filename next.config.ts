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
      {
        source: "/cab-service-in-:city",
        destination: "/:city",
        permanent: true,
      },
      {
        source: "/:city-tours-and-travels",
        destination: "/:city/tours",
        permanent: true,
      },
      {
        source: "/tempo-traveller-rental-:city",
        destination: "/:city/tempo-traveller",
        permanent: true,
      },
      {
        source: "/:city-car-rental",
        destination: "/:city/car-rental",
        permanent: true,
      },
      {
        source: "/hubli-to-goa-taxi",
        destination: "/hubli-to-goa-cab",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
