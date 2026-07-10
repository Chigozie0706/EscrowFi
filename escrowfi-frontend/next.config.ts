import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
   typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["@coral-xyz/anchor", "@solana/web3.js"],

  turbopack: {
    resolveAlias: {
      "@solana-mobile/wallet-adapter-mobile": "./lib/empty-module.ts",
      "@solana/wallet-standard-wallet-adapter-react": "./lib/empty-module.ts",
      "buffer": "buffer",

    },
  },
};

export default nextConfig;