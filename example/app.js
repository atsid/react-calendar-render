const React = require('react');
const ReactDOM = require('react-dom');
const Examples = require('./Examples');

// Class on the application container, used for lookup of dom element
const applicationContainerClass = 'app-container';

window.onload = function onload() {
  // Define application container based on class
  const appContainer = document.getElementsByClassName(applicationContainerClass)[0];

  // Facebook Authentication adds this value to the location hash
  if (window.location.hash.indexOf('_=_') > -1) {
    window.location.hash = '';
  }

  ReactDOM.render(<Examples />, appContainer.getElementsByClassName('example')[0]);
};
