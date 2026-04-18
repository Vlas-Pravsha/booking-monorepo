import type { NextConfig } from "next";

import "./src/shared/config/env.ts";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
    ],
  },
  transpilePackages: ["@booking/contracts"],
};

export default config;
