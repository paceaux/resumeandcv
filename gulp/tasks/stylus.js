'use strict';

const config = require('../config').stylus;
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');

gulp.task('stylus', ()=>{

    return gulp.src(config.src)
        .pipe(stylus(config.opts))
        .pipe(concat(config.destName))
        .pipe(gulp.dest(config.dest));
});