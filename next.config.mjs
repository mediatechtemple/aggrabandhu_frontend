// @type {import('next').NextConfig} 
const nextConfig = {

    reactStrictMode: true,
    swcMinify: false,
    images: {
        unoptimized: true,
    },
    expriments: {
        topLevelAwait: true,
    },
    trailingSlash: true,
    output: 'export',  

};

export default nextConfig;
