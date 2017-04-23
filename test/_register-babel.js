require("babel-register")({

  cache: true,

  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: /node_modules\/(?!lodash-es)/,

  plugins: [
    'lodash',
    'transform-es2015-modules-commonjs'
  ]
});
