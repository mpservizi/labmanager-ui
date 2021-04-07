const path = require('path');
module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '^/api': {
                target: 'http://10.39.51.46:3000',
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
