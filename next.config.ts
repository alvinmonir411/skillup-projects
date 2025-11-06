/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      root: ".",
    },

    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

module.exports = nextConfig;
