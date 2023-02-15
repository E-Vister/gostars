/** @type {{images: {domains: string[], unoptimized: boolean}, reactStrictMode: boolean, i18n: {locales: string[], localeDetection: boolean}}} */
const nextConfig = {
    reactStrictMode: true,

    i18n: {
        locales: ['en-US', 'be', 'uk', 'ru-RU'],
        localeDetection: true,
        defaultLocale: 'en-US',
    },

    images: {
        domains: [
            'svgur.com',
            'i.imgur.com'
        ],
        unoptimized: true
    },
}

module.exports = nextConfig
