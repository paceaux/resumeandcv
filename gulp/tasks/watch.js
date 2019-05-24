/* eslint-disable import/no-extraneous-dependencies */


const config = require('../config').watch;
const gulp = require('gulp');

gulp.task('watch', () => {
    gulp.watch(config.assemble, ['assemble', 'sitemap']);
    gulp.watch(config.styles, ['stylus']);
    gulp.watch(config.js, ['js']);
});
