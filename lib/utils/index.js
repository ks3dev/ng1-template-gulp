'use strict';

let misc = require('./misc');

module.exports = {
    clean: misc.clean,
    createModule: require('./create-module'),
    log: misc.log,
    log2: misc.log2,
    exclude: misc.exclude,
    serve: require('./serve'),
    src: misc.src,

    taskNames: require('./task-names')
};