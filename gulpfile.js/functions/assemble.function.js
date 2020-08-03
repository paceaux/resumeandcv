/* eslint-disable import/no-extraneous-dependencies */


const assemble = require('assemble');
const extname = require('gulp-extname');
const config = require('../config').assemble;

const assembler = assemble();


// gulp.task('load', (cb) => {
//     assembler.data(config.content);
//     assembler.option('layout', 'default');
//     assembler.partials(config.partials);
//     assembler.layouts(config.layouts);
//     assembler.pages(config.pages);
//     cb();
// });

// gulp.task('assemble', ['load'], () => assembler.toStream('pages')
//     .pipe(assembler.renderFile())
//     .pipe(extname())
//     .pipe(assembler.dest(config.dest)));

function assemblePages() {
    assembler.data(config.content);
    assembler.option('layout', 'default');
    assembler.partials(config.partials);
    assembler.layouts(config.layouts);
    assembler.pages(config.pages);

    return assembler.toStream('pages')
        .pipe(assembler.renderFile())
        .pipe(extname())
        .pipe(assembler.dest(config.dest));
}

module.exports = {
    assemble: assemblePages,
};
