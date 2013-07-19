/**
 *
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/18/13
 * Time: 7:52 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
    sharedConfig(config);

    config.set({
        files: [
            JASMINE,
            JASMINE_ADAPTER,
            'src/components/angular/angular.js',
            'src/components/angular-mocks/angular-mocks.js',
            'src/app/**/*spec.js',
        ],

        exclude: [],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
}

// Karma configuration

// base path, that will be used to resolve files and exclude
//basePath = '';

// list of files / patterns to load in the browser
//files = [
//  JASMINE,
//  JASMINE_ADAPTER,
//  'src/components/angular/angular.js',
//  'src/components/angular-mocks/angular-mocks.js',
//  'src/app/**/*.js',
//];
//'test/mock/**/*.js',
//'test/spec/**/*.js'

// list of files to exclude
//exclude = ['src/app/rebuildTree.js'];

// test results reporter to use
// possible values: dots || progress || growl
//reporters = ['progress'];

// web server port
//port = 8080;

// cli runner port
//runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
//colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
//logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
//autoWatch = false;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
//browsers = ['Chrome'];

// If browser does not capture in given timeout [ms], kill it
//captureTimeout = 5000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
//singleRun = false;

