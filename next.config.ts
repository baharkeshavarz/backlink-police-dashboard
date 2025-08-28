import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ server: {
    host: "0.0.0.0",
    port: 6545,
    proxy: {
      "/backend": {
        target: process.env.NEXT_PUBLIC_BACKEND_UR,
        changeOrigin: true,
        secure: false,
      },
    },
  },
};

export default nextConfig;
