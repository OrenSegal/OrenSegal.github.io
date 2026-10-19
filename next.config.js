/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // Deployed as OrenSegal/OrenSegal.github.io, so it serves from the
  // root domain (orensegal.github.io) — no basePath needed.
}

module.exports = nextConfig
