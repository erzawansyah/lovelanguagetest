/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lovelanguagetest.co',
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
    }
}
