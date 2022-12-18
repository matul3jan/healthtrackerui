const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        allowedHosts: 'all',
        proxy: {
            '/api': {
                target: 'http://localhost:7001',
                changeOrigin: true
            }
        }
    }
})
