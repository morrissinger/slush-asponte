/*
 * slush-asponte
 * https://github.com/morrissinger/slush-asponte
 *
 * Copyright (c) 2015, Morris Singer
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');

(function () {
    var includeAll = require('include-all');

    /**
     * Loads task modules from a relative path.
     */
    function loadTasks (relPath) {
        return includeAll({
                dirname: require('path').resolve(__dirname, relPath),
                filter: /(.+)\.js$/
            }) || {};
    }

    /**
     * Invokes the function from a Gulp configuration module with
     * a single argument - the `gulp` object.
     */
    function addTasks (tasks) {


        for (var taskName in tasks) {
            if (tasks.hasOwnProperty(taskName)) {
                tasks[taskName](gulp);
            }
        }
    }

    /**
     * Add all Gulp tasks to the gulpfile.
     */
    addTasks(loadTasks('generators/'));
})();

gulp.task('default', ['app']);
