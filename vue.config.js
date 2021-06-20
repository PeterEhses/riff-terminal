module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        win: {
          target: 'nsis-web'
        }
      }
    }
  },
  //   chainWebpack: config => {
  //   config.module.rule('fonts').use('url-loader').tap(options => {
  //     return {
  //       limit: 10000,
  //       name: 'fonts/[name].[hash:8].[ext]',
  //       // workaround for vuejs-templates webpack issue 1266
  //       publicPath: process.env.NODE_ENV === 'production' ? '../../' : '/'
  //     }
  //   })
  // }
}