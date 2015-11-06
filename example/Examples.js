const React = require('react/addons');
const Calendar = require('../src/Calendar');
const CalendarHeader = require('../src/CalendarHeader');
const CalendarMonthView = require('../src/CalendarMonthView');
const moment = require('moment');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

class Examples extends React.Component {
  next() {
    window.alert('Next month');
  }

  prev() {
    window.alert('Last month');
  }

  render() {
    const styles = {
      width: '50%',
      marginTop: '15%',
      marginBottom: '25%',
      marginLeft: 'auto',
      marginRight: 'auto',
      height: '50%',
      position: 'relative',
      lineHeight: 'normal',
      verticalAlignment: 'center',
    };

    return (
      <div style={styles}>
        <Calendar month={moment()} showWeekHeader={false}/>
      </div>
    );
  }
}

module.exports = Examples;
