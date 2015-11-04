const _lodash = require('lodash');

function sourceNode(rootName, root, extra = {}) {
  return _lodash.merge({
    all: [root + '/**/*.js'],
    source: [root + '/**/*.js', '!' + root + '/**/*.spec.js', '!' + root + '/**/*spec*/*'],
    test: [root + '/**/*.spec.js', root + '/**/*spec*/*'],
    output: {
      coverage: 'target/test-reports/' + rootName,
    },
  }, extra);
}

module.exports = {
  src: sourceNode('src', 'src'),
  all: sourceNode('all', '{src,example}'),
  build: ['gulpfile.js', 'gulp/**/*.js'],
  example: sourceNode('example', 'example', {
    styles: ['styles/**/*.scss'],
    staticJade: ['example/**/*.jade', '!example/**/*.dynamic.jade'],
    assets: ['example/assets/**/*.*'],
    html: ['example/**/*.html'],
    entries: ['example/app.js'],
    dist: {
      path: 'public',
      styles: 'public/styles',
      assets: 'public/assets',
      bundle: 'app.js',
    },
  }),
};
