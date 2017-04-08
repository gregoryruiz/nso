//

const { resolve } = require('path')

const { optimize: { CommonsChunkPlugin }, ProgressPlugin } = require('webpack')
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//

const isInNodeModules = (module) => module.context && module.context.indexOf("node_modules") !== -1;
const isInCoreJsModule = (module) => module.context && module.context.indexOf("code-js") !== -1;
const isInPolyfillsCommonChunk = (module) => isInNodeModules(module) && isInCoreJsModule(module);

//

exports.default = {

  context: resolve(__dirname, '..'),

  devtool: "source-map",

  entry: {
    webfont: './src/webfont.ts',
    bootstrap: './src/bootstrap.ts'
  },

  //

  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },

  //

  module: {
    rules: [
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

      {
        test: /\.html$/,
        exclude: [/index.html$/],
        use: [
          {
            loader: 'html-loader'
          }
        ].reverse()
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "style-loader"
          }
        ].reverse()
      }
    ]
  },

  //

  plugins: [
    // awesome-typescript-loader plugins
    new CheckerPlugin(),
    new TsConfigPathsPlugin(),

    // html-webpack-plugin plugin
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html'
    }),

    // webpack plugins
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: isInNodeModules
    }),
    new CommonsChunkPlugin({
      name: 'polyfills',
      minChunks: isInPolyfillsCommonChunk
    }),
    new CommonsChunkPlugin('webpack-loader'),

    new ProgressPlugin()
  ],

  //

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      "node_modules",
      resolve(__dirname, 'src')
    ],
  }
};
