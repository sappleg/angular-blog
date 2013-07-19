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
            ANGULAR_SCENARIO,
            ANGULAR_SCENARIO_ADAPTER,
        ],

        exclude: [],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 5000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
}
