module.exports = {
    module: {
      rules: [
        {
            test: /\.(ttf|otf|eot|woff|woff2)$/,
            use: {
              loader: "url-loader",
              options: {
                name: "fonts/[name].[ext]",
              },
            },
          }
      ],
    },
  };
