//

const { resolve } = require('path')

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { IgnorePlugin, optimize: { CommonsChunkPlugin }, ProgressPlugin } = require('webpack')
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader')

//

const isInNodeModules = (module) => module.context && module.context.indexOf("node_modules") !== -1;
const isInBabelPolyfillModule = (module) => module.context && module.context.indexOf("babel-polyfill") !== -1;
const isInCoreJsModule = (module) => module.context && module.context.indexOf("core-js") !== -1;
const isInRegeneratorRuntimeModule = (module) => module.context && module.context.indexOf("regenerator-runtime") !== -1;
const isInPolyfillsCommonChunk = (module) => true &&
  (
    isInBabelPolyfillModule(module) ||
    isInCoreJsModule(module) ||
    isInRegeneratorRuntimeModule(module)
  ) &&
  isInNodeModules(module);

const isInWebpackHotReloadCommonChunk = (module) => module.resource &&
  /node_modules\/ansi-/.test(module.resource) ||
  /node_modules\/debug/.test(module.resource) ||
  /node_modules\/buffer/.test(module.resource) ||
  /node_modules\/process/.test(module.resource) ||
  /node_modules\/events/.test(module.resource) ||
  /node_modules\/html-entities/.test(module.resource) ||
  /node_modules\/inherits/.test(module.resource) ||
  /node_modules\/punycode/.test(module.resource) ||
  /node_modules\/querystring/.test(module.resource) ||
  /node_modules\/sockjs/.test(module.resource) ||
  /node_modules\/strip/.test(module.resource) ||
  /node_modules\/url/.test(module.resource) ||
  /node_modules\/json3/.test(module.resource) ||
  /node_modules\/webpack/.test(module.resource);

//

exports.default = {

  context: resolve(__dirname, '..'),

  entry: {
    inline: [
      './src/www/inline.ts'
    ],
    main: [
      'babel-polyfill',
      './src/www/main.ts'
    ]
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

  node: {
    // Don't import Node Modules
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  //

  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[id].chunkhash:8].chunk.js'
  },

  //

  plugins: [
    // awesome-typescript-loader plugins
    new CheckerPlugin(),
    new TsConfigPathsPlugin(),

    // webpack plugins
    new CaseSensitivePathsPlugin(),

    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: isInNodeModules
    }),

    new CommonsChunkPlugin({
      name: 'polyfills',
      minChunks: isInPolyfillsCommonChunk
    }),

    new CommonsChunkPlugin({
      name: 'webpack',
      chunks: ['vendor'],
      minChunks: isInWebpackHotReloadCommonChunk
    }),

    new CommonsChunkPlugin('webpack-loader')
  ]
    // Don't use progess plugin on Travis
    .concat(process.env.TRAVIS ? [] : [new ProgressPlugin()]),

  //

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      "node_modules",
      resolve(__dirname, '../src')
    ],
  }
};
