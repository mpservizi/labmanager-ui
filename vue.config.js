const path = require('path');
let serverUrl = process.env.VUE_APP_SERVER_URL || 'http://localhost:3000';
module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '^/api': {
                // target: 'http://10.39.51.46:3000',
                target: serverUrl,
                ws: true,
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    },

    configureWebpack: {
        resolve: {
            alias: {
                Moduli: path.resolve(__dirname, 'src/modules/')
            },
            extensions: ['.js', '.vue', '.json']
        }
    },

    transpileDependencies: ['vuetify']
};
