/** @type {import('next').NextConfig} */
const nextConfig = {
  //   webpack: (config, { isServer }) => {
  //     if (!isServer) {
  //       // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
  //       config.resolve.fallback = {
  //         fs: false,
  //       };
  //     }

  //     return config;
  //   },
  env: {
    MONGO_URL:
      "mongodb+srv://Rishab829:Kanchan%401@expresstry.wqhmyb0.mongodb.net/myecommerce?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
