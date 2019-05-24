

const gulp = require('gulp');
const concat = require('gulp-concat');
const config = require('../config').js;

gulp.task('js', () => gulp.src(config.src)
    .pipe(concat(config.destName))
    .pipe(gulp.dest(config.dest)));
