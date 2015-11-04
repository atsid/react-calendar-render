// Adapted from https://github.com/danvk/mocha-react/blob/jsx-stubs/tests/compiler.js
const fs = require('fs');
const ReactTools = require('react-tools')
const origJs = require.extensions['.js'];

// A module that exports a single, stubbed-out React Component.
const reactStub = 'module.exports = require("react").createClass({render:function(){return null;}});';

/**
 * Checks if the specified file should be stubbed out.  To specify that a react
 * component should be stubbed out, set an array in global.reactModulesToStub with
 * the list of component names to stub.
 *
 * @param filename Full path to file to determine if it should be stubbed.
 * @returns {boolean} True if file needs to be stubbed, false otherwise.
 */
function shouldStub(filename) {
  let stub = false;

  if (global.reactModulesToStub) {
    // Check if the file name ends with any stub path.
    const stubs = global.reactModulesToStub;

    for (let i = 0; i < stubs.length; i++) {
      if (filename.substr(-stubs[i].length) == stubs[i]) {
        stub = true;
        break;
      }
    }
  }

  return stub;
}

/**
 * Transforms a file using babel (to transpile) and ReactTools (convert jsx -> js).
 *
 * @param code Code to be transformed
 * @param filePath Full path to where code came from
 * @returns {*} Transformed code
 */
function transform(code, filePath) {
  let content;

  if (shouldStub(filePath)) {
    content = reactStub;
  } else {
    content = require('babel').transform(ReactTools.transform(code, {harmony: true})).code;
  }

  return content;
}

/**
 * Loads file from disk and returns the content.
 *
 * @param filePath Full path of file to load from disk and return.
 */
function loadFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

/**
 * Registers this compiler with node to handle loading of .js files.
 */
function register() {
  // Install the compiler.
  require.extensions['.js'] = (module, filename) => {
    let compiled;

    // optimization: code in a distribution should never go through JSX compiler.
    if (filename.indexOf('node_modules/') >= 0) {
      compiled = (origJs || require.extensions['.js'])(module, filename);
    } else {
      compiled = module._compile(transform(loadFile(filename), filename), filename);
    }

    return compiled;
  };
}

/**
 * Checks if the file specified should be transformed.  Currently if the file is
 * not within a node_modules folder, it will indicate a transformation is required.
 *
 * @param filePath Full path to file to determine if it should be transformed.
 * @returns {boolean} True if file needs to be transformed, false otherwise.
 */
function transformRequired(filePath) {
  return filePath.indexOf('node_modules/') < 0;
}

module.exports = {transformRequired, transform, register};
