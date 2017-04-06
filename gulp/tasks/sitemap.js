'use strict';

const config = require('../config').sitemap;
const gulp = require('gulp');
const sitemap = require('gulp-sitemap');

gulp.task('sitemap', function () {
    gulp.src(config.src, {
        read: false
    })
    .pipe(sitemap(config.opts))
    .pipe(gulp.dest(config.dest));
});