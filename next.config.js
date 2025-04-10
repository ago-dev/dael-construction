/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Check if any domains need to be added
    // If using remote images, ensure domains are configured
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 