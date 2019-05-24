/* eslint-disable import/no-extraneous-dependencies */


const gulp = require('gulp');
const config = require('../config').watch;

gulp.task('watch', () => {
    gulp.watch(config.assemble, ['assemble', 'sitemap']);
    gulp.watch(config.styles, ['stylus']);
    gulp.watch(config.js, ['js']);
});
