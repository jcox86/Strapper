/// <reference path="" />
/// <reference path="bower_components/angular/angular.js" />
/// <reference path="bower_components/angular-route/angular-route.min.js" />
/// <reference path="bower_components/jasmine/lib/jasmine-core.js" />
/// <reference path="bower_components/jquery/dist/jquery.min.js" />
/// <reference path="bower_components/angular-sanitize/angular-sanitize.min.js" />
/// <reference path="bower_components/angular-mocks/angular-mocks.js" />
// Karma configuration
// Generated on Wed Aug 06 2014 19:45:46 GMT-0700 (Pacific Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/angular-sanitize/angular-sanitize.min.js',
      'node_modules/karma-jasmine/lib/jasmine.js',
      'node_modules/karma-jasmine/lib/adapter.js',
      'node_modules/karma-jasmine/lib/index.js',
      'NgApp/**/*.js',
      'NgApp/*.js',
      'Specs/**/*.js',
      'Specs/*.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
