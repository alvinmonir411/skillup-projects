/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      root: ".",
    },
  },
  experimental_taintObjectReference: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

module.exports = nextConfig;
