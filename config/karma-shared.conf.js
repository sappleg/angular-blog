/**
 *
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/18/13
 * Time: 7:52 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

module.exports = function(config) {
    config.set({
        frameworks: ['jasmin'],
        basePath: '',
        logLevel: config.LOG_INFO,
        colors: true,
        browsers: ['Chrome'],

        // test results reporter to use
        // possible values: dots || progress || growl
        reporters: ['progress'],

        // web server port
        port: 8080,

        // cli runner port
        runnerPort: 9100

        // Put config for Travis or Jenkins here

        // find out what customLaunchers are
    })
};
