/** @type {import('next').NextConfig} */
// Captures the '/Simply-Noore' path injected by your workflow line 61
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''; 

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '://unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '://cloudinary.com',
      },
    ],
  },
  basePath: basePath || undefined,
  // Crucial: The trailing slash ensures NextJS assets map correctly on GitHub CDNs
  assetPrefix: basePath ? `${basePath}/` : undefined, 
  reactStrictMode: true,
};

export default nextConfig;