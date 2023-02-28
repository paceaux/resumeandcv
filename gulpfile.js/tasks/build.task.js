/* eslint-disable import/no-extraneous-dependencies */
const { series, parallel } = require('gulp');

const {
    assemble,
    images,
    javascript,
    sitemap,
    styles,
} = require('../functions');

const buildAssets = parallel(javascript, styles, images);

const buildPages = series(assemble, sitemap);

module.exports = {
    buildAssets,
    buildPages,
    build: parallel(buildAssets, buildPages),
};
