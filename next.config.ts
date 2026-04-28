import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.BUILD_DIR || '.next',
  productionBrowserSourceMaps: false,
  // Optimize for Dropbox environment
  onDemandEntries: {
    maxInactiveAge: 60000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
