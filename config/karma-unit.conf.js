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
    JASMINE,
    JASMINE_ADAPTER,
    'src/components/angular/angular.js',
    'src/components/angular-mocks/angular-mocks.js',
    'src/components/angular-cookies/angular-cookies.js',
    'src/components/underscore/underscore.js',
    'src/components/jquery/jquery.js',
    'src/app/**/*.js',
    'src/app/**/*.unit.js'
];

exclude = ['src/app/rebuildTree.js'];
//
// test results reporter to use
// possible values: dots || progress || growl
reporters = ['dots', 'junit'];

// web server port
port = 8080;

// cli runner port
//runnerPort = 9100;

colors = true;

logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;

// break from module
browsers = ['Chrome'];

junitReporter = {
    outputFile: 'log/test-results.xml'
};

//var sharedConfig = require('./karma-shared.conf');

//module.exports = function(config) {
//    sharedConfig(config);

    //config.set({
        //files: [
            //JASMINE,
            //JASMINE_ADAPTER,
            //'src/components/angular/angular.js',
            //'src/components/angular-mocks/angular-mocks.js',
            //'src/app/**/*spec.js',
        //],

        //exclude: [],

         //enable / disable watching file and executing tests whenever any file changes
        //autoWatch: true,

         //Continuous Integration mode
         //if true, it capture browsers, run tests and exit
        //singleRun: false,

         //break from module
        //frameworks: ['jasmin'],
        //basePath: '',
        //logLevel: config.LOG_INFO,
        //colors: true,
        //browsers: ['Chrome'],

         //test results reporter to use
         //possible values: dots || progress || growl
        //reporters: ['progress'],

         //web server port
        //port: 8080,

         //cli runner port
        //runnerPort: 9100
    //});
//}