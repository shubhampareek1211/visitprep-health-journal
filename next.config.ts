import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // First-party brand marks in /public/assets are trusted SVGs.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
};

export default nextConfig;
