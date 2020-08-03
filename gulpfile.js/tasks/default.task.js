/* eslint-disable import/no-extraneous-dependencies */

const { series } = require('gulp');

const { watch } = require('./watch.task');
const { build } = require('./build.task');

module.exports = {
    default: series(build, watch),
};
