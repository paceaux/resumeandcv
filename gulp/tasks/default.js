/* eslint-disable import/no-extraneous-dependencies */


const gulp = require('gulp');
const runSequence = require('run-sequence').use(gulp);

gulp.task('default', () => {
    runSequence(
        [
            'build',
            'watch',
        ],
    );
});

gulp.task('build', ['assemble', 'sitemap', 'js', 'stylus', 'images']);
