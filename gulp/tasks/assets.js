const gulp = require('gulp');
const lload = require('gulp-livereload');
const config = require('../config');
const jade = require('gulp-jade');

gulp.task('process-jade', () => {
  return gulp.src(config.example.staticJade)
    .pipe(jade({}))
    .pipe(gulp.dest('./public/'))
    .pipe(lload());
});

gulp.task('copy-html', () => {
  return gulp.src(config.example.html)
    .pipe(gulp.dest(config.example.dist.path))
    .pipe(lload());
});

gulp.task('copy-assets', () => {
  return gulp.src(config.example.assets)
    .pipe(gulp.dest(config.example.dist.assets))
    .pipe(lload());
});

gulp.task('prepare-assets', [
  'process-jade',
  'copy-html',
  'copy-assets',
]);
