// config-overrides.js
const { override, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  addWebpackModuleRule({
    test: /\.gltf$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 100000,
          mimetype: "model/gltf+json",
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
    ],
  })
);
