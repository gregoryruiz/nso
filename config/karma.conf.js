//

module.exports = function(config) {
  config.set({
    basePath: '..',

    frameworks: ['mocha'],

    files: [
      {pattern: 'test/**/*.spec.ts', watched: false}
    ],

    preprocessors: {
      'test/*.spec.ts': ['webpack'],
    },

    browsers: ['jsdom'],

    webpack: require('./webpack.config.test').default
  });
};
