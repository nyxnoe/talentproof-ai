import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow PDF parsing to work in server components/routes
  serverExternalPackages: ["pdf-parse", "mammoth"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
