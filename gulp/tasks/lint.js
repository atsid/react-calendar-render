const gulp = require('gulp');
const eslint = require('gulp-eslint');
const config = require('../config');
const empty = require('gulp-empty');
const debug = require('gulp-debug');

const srcConfig = {};
const testConfig = {
  rules: {
    'no-unused-expressions': 0,
  },
  env: {
    'mocha': true,
  },
  globals: {},
};

function lint(glob, eslintConf = {}, tdd = false) {
  return () => {
    return gulp.src(glob)
      .pipe(debug({title: 'lint'}))
      .pipe(eslint(eslintConf))
      .pipe(eslint.format())
      .pipe(tdd ? empty() : eslint.failAfterError());
  };
}

function defineLintingTasks(taskName, root) {
  gulp.task('lint-' + taskName + '-source', lint(root.source, srcConfig));
  gulp.task('lint-' + taskName + '-test', lint(root.test, testConfig));
  gulp.task('lint-' + taskName + '-source-tdd', lint(root.source, srcConfig, true));
  gulp.task('lint-' + taskName + '-test-tdd', lint(root.test, testConfig, true));

  // Aggregated Tasks
  gulp.task('lint-' + taskName, [
    'lint-' + taskName + '-source',
    'lint-' + taskName + '-test',
  ]);
  gulp.task('lint-' + taskName + '-tdd', [
    'lint-' + taskName + '-source-tdd',
    'lint-' + taskName + '-test-tdd',
  ]);
}

defineLintingTasks('example', config.example);
defineLintingTasks('src', config.src);
gulp.task('lint-build', lint(config.build));
gulp.task('lint', ['lint-example', 'lint-src', 'lint-build']);
