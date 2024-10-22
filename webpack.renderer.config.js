const rules = require('./webpack.rules');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'), // Source assets folder
          to: path.resolve(__dirname, '.webpack/renderer/main_window/assets'), // Output to the main_window folder
        }
      ],
    }),
  ],
};
