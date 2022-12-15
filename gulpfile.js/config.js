const dest = 'public';
const src = 'src';
const templatePath = `${src}/templates`;
const cssPath = `${src}/assets/css`;
const imgPath = `${src}/assets/img`;
const jsPath = `${src}/assets/js`;

module.exports = {
    dest,
    src,
    assemble: {
        partials: `${templatePath}/partials/*.hbs`,
        layouts: `${templatePath}/layouts/default.hbs`,
        pages: `${src}/pages/**/*.hbs`,
        dest,
        content: 'src/content.json',
    },
    stylus: {
        dest: `${dest}/assets/css`,
        destName: 'main.css',
        opts: {
            'include css': true,
        },
        src: [
            `${cssPath}/**/*.css`,
        ],

    },
    js: {
        dest: `${dest}/assets/js`,
        destName: 'main.js',
        src: [
            `${jsPath}/**/*.js`,
        ],
    },
    images: {
        dest: `${dest}/assets/img`,
        src: `${imgPath}/**.*`,
    },
    watch: {
        assemble: `${templatePath}/**/*.hbs`,
        styles: `${cssPath}/**/*.*`,
        js: `${jsPath}/**/*.js`,
    },
    sitemap: {
        dest: `${dest}`,
        src: `${dest}/**/*.html`,
        opts: {
            siteUrl: 'http://frankmtaylor.com',
            changefreq: 'monthly',
        },
    },

};
