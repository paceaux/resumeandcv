'use strict';

const config = require('../config').watch;
const gulp = require('gulp');

gulp.task('watch', function() {
  gulp.watch( config.assemble, ['assemble', 'sitemap']);
  gulp.watch(config.styles, ['stylus']);
  gulp.watch(config.js, ['js']);
});
