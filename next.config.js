module.exports = {
    async redirects() { // redirects from root page (the main chat) to login
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            },
        ]
    },
}