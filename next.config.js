/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment
  // Uncomment and set your repo name if deploying to github.io/repo-name
  // basePath: '/portfolio',
  // assetPrefix: '/portfolio/',
}

module.exports = nextConfig
