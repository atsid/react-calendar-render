const gulp = require('gulp');
const sass = require('gulp-sass');
const lload = require('gulp-livereload');
const config = require('../config');

const STYLES_GLOB = 'styles/**/*.scss';

gulp.task('sass', () => {
  gulp.src(STYLES_GLOB)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.example.dist.path))
    .pipe(lload());
});

gulp.task('styles', ['sass']);
