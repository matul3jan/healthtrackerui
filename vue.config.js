const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        allowedHosts: [
            'healthtrackerrest-production-9cc1.up.railway.app'
        ],
        proxy: {
            '/api': {
                target: 'https://healthtrackerrest-production-9cc1.up.railway.app',
                changeOrigin: true
            }
        }
    }
})
