/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/posts/ai-experience",
        destination: "/posts",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
