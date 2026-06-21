import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',

  // Em produção (build para o GitHub Pages) o site fica em /colorchroma.
  // Em desenvolvimento local roda na raiz, acessível em http://localhost:3000.
  basePath: isProd ? '/colorchroma' : '',
  assetPrefix: isProd ? '/colorchroma/' : '',

  images: {
    unoptimized: true,
  },

  reactCompiler: true,
}

export default nextConfig
