/* eslint-disable import/no-extraneous-dependencies */

const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const config = require('../config').stylus;

// gulp.task('stylus', () => gulp.src(config.src)
//     .pipe(stylus(config.opts))
//     .pipe(concat(config.destName))
//     .pipe(gulp.dest(config.dest)));

function buildStyles() {
    return src(config.src)
        .pipe(concat(config.destName))
        .pipe(dest(config.dest));
}

module.exports = {
    styles: buildStyles,
};
