const React = require('react/addons');
const CalendarHeader = require('../src/CalendarHeader');
const moment = require('moment');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const Examples = React.createClass({
  render() {
    const styles = {
      width: '50%',
      margin: 'auto',
      height: '50%',
      verticalAlignment: 'center',
    };

    return (
      <div style={styles}>
        <CalendarHeader month={moment()} showYearInTitle={false}/>
        <CalendarHeader month={moment()} showYearInTitle={true}/>
        <CalendarHeader month={moment()} showMonthInTitle={true} showHeaderNav={false} showYearInTitle={true}/>
        <CalendarHeader month={moment()}/>
      </div>
    );
  },
});

module.exports = Examples;
