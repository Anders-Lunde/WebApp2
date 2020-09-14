// vue.config.js
module.exports = {
  publicPath: "",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      const tmp = args[0];
      tmp.template = "src/index.html";
      tmp.favicon = "src/assets/icons/favicon.ico";
      return args;
    });
  },
};
