/* eslint-disable import/no-extraneous-dependencies */

const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const config = require('../config').js;

function javascript() {
    return src(config.src)
        .pipe(concat(config.destName))
        .pipe(dest(config.dest));
}
module.exports = {
    javascript,
};
