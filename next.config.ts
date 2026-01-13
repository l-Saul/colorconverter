import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',

  basePath: '/colorconverter',
  assetPrefix: '/colorconverter/',

  images: {
    unoptimized: true,
  },

  reactCompiler: true,
}

export default nextConfig
