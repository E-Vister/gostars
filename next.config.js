/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    images: {
        domains: [
            'svgur.com',
            'i.imgur.com'
        ],
        unoptimized: true
    },
}

module.exports = nextConfig
