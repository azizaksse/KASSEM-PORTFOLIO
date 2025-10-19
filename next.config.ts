import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Aggressive performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'three', '@react-three/fiber'],
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable static optimization
  output: 'export',
  trailingSlash: true,
  // Aggressive bundle optimization
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    // Optimize chunks
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            chunks: 'all',
            priority: 20,
          },
        },
      },
    };
    
    return config;
  },
  // Enable compression
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
