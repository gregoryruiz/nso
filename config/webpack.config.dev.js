//

const { resolve } = require('path');

const webpackMerge = require('webpack-merge');
const { HotModuleReplacementPlugin, NamedModulesPlugin } = require('webpack');

const {default: config} = require('./webpack.config.common');

//

exports.default = webpackMerge(
  config,
  {
    devServer: {
      compress: true,
      contentBase: resolve(__dirname, 'public'),
      historyApiFallback: true,
      watchContentBase: true
    },

    devtool: 'cheap-source-map',

    plugins: [
      new NamedModulesPlugin()
    ]
  }
);
