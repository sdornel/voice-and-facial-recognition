// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


import withTM from 'next-transpile-modules';

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        encoding: false,
      };
    }
    return config;
  },
};

export default withTM(['face-api.js'])(nextConfig);
