/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  eslint: {
    // TODO: fix react/no-unescaped-entities across components/*, then remove this.
    ignoreDuringBuilds: true,
  },
  // Deployed as OrenSegal/OrenSegal.github.io, so it serves from the
  // root domain (orensegal.github.io) — no basePath needed.
}

module.exports = nextConfig
