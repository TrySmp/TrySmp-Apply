/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'yt3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn2.unrealengine.com',
            },
            {
                protocol: 'https',
                hostname: 'img.gta5-mods.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.cloudflare.steamstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'www.minecraft.net',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'store-images.s-microsoft.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.akamai.steamstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
            },
        ],
    },

    async rewrites() {
        return [
            {
                source: '/script.js',
                destination: 'https://umami.allay-studios.com/script.js',
            },
            {
                source: '/api/send',
                destination: 'https://umami.allay-studios.com/api/send',
            },
        ]
    },
};

export default nextConfig;
