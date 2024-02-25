/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    experimental:{
      serverActions: { allowedOrigins: ["s26wq58p-3000.asse.devtunnels.ms","localhost:3000", "localhost:3002"], }

    }
  };
  
  module.exports = nextConfig;