/* eslint-disable import/no-extraneous-dependencies */

const { watch, series } = require('gulp');
const config = require('../config').watch;

const {
    assemble,
    styles,
    sitemap,
    scripts,
} = require('../functions');

const pageSeries = series(assemble, sitemap);

function watchFunction() {
    watch(config.assemble, pageSeries);
    watch(config.styles, styles);
    watch(config.js, scripts);
}

module.exports = {
    watch: watchFunction,
};
