const gulp = require('gulp');
const gutil = require('gulp-util');
const config = require('../config');

const watchify = require('watchify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const lload = require('gulp-livereload');
const source = require('vinyl-source-stream');

const lrload = require('livereactload');

const browserifyConf = require('./browserify_config');

gulp.task('watch-client', () => {
  // watch js and lint
  gulp.watch(config.example.all, ['lint-example-tdd', 'test-example-tdd']);

  // watch html
  gulp.watch(config.example.html, ['copy-html']);

  // watch assets
  gulp.watch(config.example.assets, ['copy-assets']);


  // watch sass
  lload.listen();
  gulp.watch(config.example.styles, ['sass']);


  // watch client js
  lrload.monitor(config.example.dist.path + '/' + config.example.dist.bundle, {displayNotification: true});

  const bconf = browserifyConf();

  bconf.transform.push(lrload);

  bconf.debug = true;
  bconf.fullPaths = true;

  const watcher = watchify(browserify(bconf));

  function bundle() {
    return watcher
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Bundling Error'))
      .pipe(source(config.example.dist.bundle))
      .pipe(buffer())
      .pipe(gulp.dest(config.example.dist.path));
  }

  watcher.on('update', bundle);
  watcher.on('log', gutil.log);
  watcher.on('error', gutil.log.bind(gutil, 'Watcher Error'));
  return bundle();
});
