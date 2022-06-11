const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin

module.exports = function override(config, env) {
  config.plugins = config.plugins || []
  
  config.plugins.push(
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      shared: [
        {
          react: { singleton: true, eager: true },
          "react-dom": { singleton: true, eager: true }
        }
      ]
    }),
  )

  return config;
}
