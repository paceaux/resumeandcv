'use strict';

const config = require('../config').js;
const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('js', ()=> {
    
    return gulp.src(config.src)
        .pipe(concat(config.destName))
        .pipe(gulp.dest(config.dest));
});
