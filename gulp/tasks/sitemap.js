

const gulp = require('gulp');
const sitemap = require('gulp-sitemap');
const config = require('../config').sitemap;

gulp.task('sitemap', () => {
    gulp.src(config.src, {
        read: false,
    })
        .pipe(sitemap(config.opts))
        .pipe(gulp.dest(config.dest));
});
