/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["127.0.0.1", "bulieve.in"],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*", // Keep auth routes local
      },
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*", // All other API routes go to backend
      },
    ];
  },
};

export default nextConfig;
