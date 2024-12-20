// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");

    if (isServer) {
      config.module.rules.push({
        test: /\.node$/,
        loader: 'node-loader',
      });
    }
    return config;
  },
  env: {
    FOOTBALL_API_KEY: process.env.FOOTBALL_API_KEY || "",
  },
};

module.exports = nextConfig;
