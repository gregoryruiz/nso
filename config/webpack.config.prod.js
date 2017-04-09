//

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackMerge = require('webpack-merge');
const { LoaderOptionsPlugin, optimize: { UglifyJsPlugin } } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { default: config } = require('./webpack.config.common');

//

exports.default = webpackMerge(
  config,
  {
    bail: true,

    devtool: 'source-map',

    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: './src/index.html',
        minify: {
			    collapseWhitespace: true,
			    conservativeCollapse: true,
			    keepClosingSlash: true,
			    removeAttributeQuotes: true,
			    removeCDATASectionsFromCDATA: true,
			    removeComments: true,
			    removeCommentsFromCDATA: true,
			    removeScriptTypeAttributes: true,
			    removeStyleTypeAttributes: true,
			    useShortDoctype: true
        }
      }),

      new LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),

      new UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        mangle: {
          except: [
            '$super',
            '$',
            'exports',
            'require',
            'angular'
          ],
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        }
      })
    ]
      // Don't use bundle analyzer plugin on Travis
      .concat(process.env.TRAVIS ? [] : [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false
        })
      ]),
  }
);
