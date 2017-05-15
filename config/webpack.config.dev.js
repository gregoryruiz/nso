//

const { resolve } = require('path');

const webpackMerge = require('webpack-merge');
const { HotModuleReplacementPlugin, NamedModulesPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {default: config} = require('./webpack.config.common');

//

exports.default = webpackMerge(
  config,
  {
    devServer: {
      compress: true,
      stats: 'minimal',
      contentBase: resolve(__dirname, 'public'),
      historyApiFallback: true,
      watchContentBase: true
    },

    //

    devtool: 'inline-source-map',

    //

    performance: {
      hints: false,
    },

    //

    plugins: [
      new NamedModulesPlugin(),

      // html-webpack-plugin plugin
      new HtmlWebpackPlugin({
        inject: false,
        template: './src/www/index.html'
      }),

    ]
  }
);
