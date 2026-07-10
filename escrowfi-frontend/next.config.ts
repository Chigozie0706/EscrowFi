import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      "@solana-mobile/wallet-adapter-mobile": "./lib/empty-module.ts",
      "@solana/wallet-standard-wallet-adapter-react": "./lib/empty-module.ts",
      "buffer": "buffer",

    },
  },
};

export default nextConfig;