/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: true,
    serverComponentsExternalPackages: ["mongoose"]
  },
  webpack(config) {
    config.experiments = {
      topLevelAwait: true,
      layers: true
    }
    return config;
  },
}



module.exports = nextConfig
