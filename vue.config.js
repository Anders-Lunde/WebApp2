// vue.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.mp3$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
    ],
  },
};
