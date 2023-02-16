/** @type {{images: {domains: string[], unoptimized: boolean}, reactStrictMode: boolean, i18n: {locales: string[], localeDetection: boolean}}} */
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
