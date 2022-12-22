const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: [
        'vuetify'
    ],
    publicPath: process.env.NODE_ENV === 'production' ? 'dist' : '',
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
