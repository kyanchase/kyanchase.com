import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    tsconfigPath: "tsconfig.pages.json",
  },
};

export default nextConfig;
