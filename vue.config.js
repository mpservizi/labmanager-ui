const path = require('path');
module.exports = {
  devServer: {
    disableHostCheck: true
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
