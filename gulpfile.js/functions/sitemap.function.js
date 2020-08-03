/* eslint-disable import/no-extraneous-dependencies */


const { src, dest } = require('gulp');
const sitemap = require('gulp-sitemap');
const config = require('../config').sitemap;

// gulp.task('sitemap', () => {
//     gulp.src(config.src, {
//         read: false,
//     })
//         .pipe(sitemap(config.opts))
//         .pipe(gulp.dest(config.dest));
// });

function buildSitemap() {
    return src(config.src)
        .pipe(sitemap(config.opts))
        .pipe(dest(config.dest));
}

module.exports = {
    sitemap: buildSitemap,
};
