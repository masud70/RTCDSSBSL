/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL: 'http://localhost:5000',
        ACCESS_TOKEN: 'rtcdssbsl_token' 
    }
};

module.exports = nextConfig;
