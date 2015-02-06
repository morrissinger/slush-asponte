'use strict';

var minimist = require('minimist'),
    gulp = require('gulp');

var options = minimist(process.argv.slice(2));
options.env = (process.argv[2] === 'test') ? 'test' : (options.env || 'dev');

/* For Istanbul coverage support with custom reports. */
options.coverageVariable = '__coverage__';

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
                tasks[taskName](gulp, options);
            }
        }
    }

    /**
     * Add all Gulp tasks to the gulpfile.
     */
    addTasks(loadTasks('tasks/' + options.env));
    addTasks(loadTasks('tasks/all'));

})();

/**
 * Add the default task.
 */
gulp.task('default', ['build']);

