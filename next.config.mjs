/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: '**',
          },
        ],
        formats: ['image/webp'],
        
      },
};

export default nextConfig;
