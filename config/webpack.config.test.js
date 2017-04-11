//

const { resolve } = require('path');

const webpackMerge = require('webpack-merge');

const { default: config } = require('./webpack.config.common');

//

exports.default = {
  devServer: {
    noInfo: true
  },

  //

  externals: {
    ava: 'require("ava")',
    'jsdom-global/register': 'require("jsdom-global/register")'
  },

  //

  module: {
    rules: [

      {
        // Disable require.ensure
        parser: {
          requireEnsure: false
        }
      },

      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              useCache: true
            }
          }
        ]
      },
    ]
  },

  //

  node: {
    // Don't import Node Modules
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  //

  output: {
    path: resolve(__dirname, '../out-test'),
    filename: '[name].js',
  },

  //

  resolve: {
    alias: {
      angular: require.resolve('angular/angular')
    },
    extensions: ['.js', '.ts'],
    modules: [
      "node_modules",
      resolve(__dirname, '../src')
    ],
  }
};
