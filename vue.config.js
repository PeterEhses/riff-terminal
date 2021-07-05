module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        asar: false,
        files: [
          '!**/conversion_source_files/*',
        ],
        // asarUnpack: [
        //   'public/*'
        // ],
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