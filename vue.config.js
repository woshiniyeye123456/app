module.exports = {
  publicPath:  './',
  productionSourceMap: false,

  devServer: {
    port: 8080,
    disableHostCheck: true
  },

  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/styles/helpers/mixin.scss";@import "@/assets/styles/common/selfvariable.scss";'
      },
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  configureWebpack: config =>{

    // 浏览器：web, electron : electron-renderer
    config.target = 'web'
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true,
      
    }
  }
};
