import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  session: {
    strategy: "jwt",
  },
};

export default nextConfig;
