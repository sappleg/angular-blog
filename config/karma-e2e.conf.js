/**
 *
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/18/13
 * Time: 7:52 PM
 * To change this template use File | Settings | File Templates.
 */

basePath = '../';

files = [
    ANGULAR_SCENARIO,
    ANGULAR_SCENARIO_ADAPTER,
    'src/components/angular/angular.js',
    'src/components/angular-mocks/angular-mocks.js',
    'src/app/**/*.js',
    'src/app/**/*.unit.js'
];

exclude = ['src/app/rebuildTree.js'];

// test results reporter to use
// possible values: dots || progress || growl
reporters = ['progress', 'dots', 'junit'];

// web server port
port = 8080;

// cli runner port
runnerPort = 9100;

colors = true;

logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;

captureTimeout = 5000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;

// break from module
browsers = ['Chrome'];

junitReporter = {
    outputFile: 'log/test-results.xml'
};

//var sharedConfig = require('./karma-shared.conf.js');
//
//module.exports = function(config) {
//    sharedConfig(config);
//
//    config.set({
//        files: [
//            ANGULAR_SCENARIO,
//            ANGULAR_SCENARIO_ADAPTER,
//        ],
//
//        exclude: [],
//
//        // enable / disable watching file and executing tests whenever any file changes
//        autoWatch: false,
//
//        // If browser does not capture in given timeout [ms], kill it
//        captureTimeout: 5000,
//
//        // Continuous Integration mode
//        // if true, it capture browsers, run tests and exit
//        singleRun: false
//    });
//}
