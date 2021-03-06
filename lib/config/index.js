'use strict';

/**
 * @description
 * Builds the configuration object needed for the Gulp tasks to run.
 *
 * The configuration creation process is broken into multiple modules to allow easy customization,
 * maintenance and updates.
 *
 * See the README.md file for more details.
 */
//TODO: Change any configuration that iterates through modules to use a delegate.

let gulp = require('gulp');

let config = {};

//TODO: Refactor
config.bower = {
    jsFiles: require('wiredep')({ devDependencies: true })['js']
};

config.folders = require('./folders');
config.preferences = require('./preferences');

// Modules
let modules = require('./modules');
config.modules = modules.modules;
config.coreDependencies = modules.coreDependencies;

config.shell = require('./shell');

// Temporary
config.injections = {};
config.injections.firstJs = mods => {
    let startups = modules.modules.reduce((files, mod) => {
        files.unshift(`${config.folders.devBuildScripts}${mod.name}/startup/*.js`);
        return files;
    }, []);
    let moduleStartups = modules.modules.reduce((files, mod) => {
        files.unshift(`${config.folders.devBuildScripts}${mod.name}/config/*.js`);
        files.unshift(`${config.folders.devBuildScripts}${mod.name}/${mod.name}.module.js`);
        return files;
    }, []);
    return [].concat(startups)
        .concat(`${config.folders.devBuildScripts}app.js`)
        .concat(moduleStartups);
};

config.scripts = require('./scripts');
config.styles = require('./styles');
config.config = require('./env-config'); //TODO: Change name to envConfig
config.definitions = require('./typings'); //TODO: Change name to typings
config.tslint = require('./tslint');
config.webServerConfigs = require('./webserver-configs'); //TODO: Change name to webserver
config.options = require('./npm-options');
config.server = require('./server');
config.staticFiles = require('./static-files');

module.exports = config;
