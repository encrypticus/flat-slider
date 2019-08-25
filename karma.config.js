/* eslint-disable */
const webpack = require('karma-webpack');
const webpackConfig = require('./webpack.config.js');
const merge = require('webpack-merge');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine-jquery', 'jasmine'],

    client: {
      jasmine: {
        random: false
      }
    },

    files: [
      // 'tests/*spec.js',
      'tests/*spec.ts'
    ],

    exclude: ['src/js/demo.js'],

    mime: { 'text/x-typescript': ['ts','tsx'] },

    plugins: [
      webpack,
      'karma-jasmine',
      'karma-coverage',
      'karma-jasmine-jquery',
      'karma-chrome-launcher'
    ],

    preprocessors: {
      // 'tests/*spec.js': ['webpack'],
      'tests/*spec.ts': ['webpack']
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    autoWatchBatchDelay: 300,

    webpack: merge(webpackConfig, {}),
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
