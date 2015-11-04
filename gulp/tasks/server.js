const gulp = require('gulp');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');

gulp.task('nodemon', () => {
  return nodemon({
    script: 'server',
    ext: 'js',
    env: {
      'DEBUG': 'app*,jefferson*,mountie*',
    },
    tasks: ['lint-src', 'test-src'],
  })
    .on('error', (err) => gutil.log('nodemon error', err))
    .on('restart', () => gutil.log('restarting server'));
});
gulp.task('develop', ['watch-client', 'nodemon']);
