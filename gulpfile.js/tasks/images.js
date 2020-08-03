/* eslint-disable import/no-extraneous-dependencies */


const gulp = require('gulp');
const config = require('../config').images;

gulp.task('images', () => gulp.src(config.src)
    .pipe(gulp.dest(config.dest)));
