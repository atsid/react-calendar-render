const React = require('react/addons');
// const moment = require('moment');

const Calendar = React.createClass({
  propTypes: {
    forceSixWeek: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    enableMultiDayEvents: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      forceSixWeek: false,
      selectable: false,
      enableMultiDayEvents: true,
    };
  },

  getInitialState() {
    return {};
  },

  render() {
    return false;
  },
});

module.exports = Calendar;
