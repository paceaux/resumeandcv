'use strict';

const config = require('../config').images;
const gulp = require('gulp');

gulp.task('images', ()=> {
    return  gulp.src(config.src)
            .pipe(gulp.dest(config.dest));
});