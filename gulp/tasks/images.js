/* eslint-disable import/no-extraneous-dependencies */


const config = require('../config').images;
const gulp = require('gulp');

gulp.task('images', () => gulp.src(config.src)
    .pipe(gulp.dest(config.dest)));
