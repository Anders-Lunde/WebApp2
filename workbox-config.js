module.exports = {
  globDirectory: "public/",
  globPatterns: [
    "**/*.{js,json,ico,html,md,vue,png,mp3,jpg,gif,css,mp4,ts,lock}",
  ],
  swDest: "./public/sw.js",
  skipWaiting: true,
  clientsClaim: true,
};
