/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL: 'http://192.168.0.200:5000',
        ACCESS_TOKEN: 'rtcdssbsl_token'
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false
            };
        }
        return config;
    }
};

module.exports = nextConfig;
