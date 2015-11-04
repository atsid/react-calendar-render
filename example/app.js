const React = require('react/addons');
const Examples = require('./Examples');

window.onload = function onload() {
  // Facebook Authentication adds this value to the location hash
  if (window.location.hash.indexOf('_=_') > -1) {
    window.location.hash = '';
  }

  React.render(<Examples />, document.body);
};
