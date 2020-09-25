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
  // ...other vue-cli plugin options...
  pwa: {
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: { display: "standalone" },

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/registerServiceWorker.ts",
    },
  },
};
