const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const server = () => {
    browserSync.init({
        server: {
            baseDir: './**/*.html'
        }
    });
}

const watch = () => {
    gulp.watch('./**/*.html').on('change', browserSync.reload)
}

exports.default = gulp.parallel(server, watch)