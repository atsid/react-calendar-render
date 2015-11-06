const React = require('react/addons');
const Calendar = require('../src/Calendar');
const moment = require('moment');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

class Examples extends React.Component {
  constructor() {
    super();
    this.state = {
      'month': moment(),
    };
  }

  next() {
    this.state.month.add(1, 'month');
    this.forceUpdate();
  }

  prev() {
    this.state.month.subtract(1, 'month');
    this.forceUpdate();
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

    /* eslint-disable react/jsx-boolean-value */
    return (
      <div style={styles}>
        <Calendar
          month={this.state.month}
          onPrevNavClick={this.prev.bind(this)}
          onNextNavClick={this.next.bind(this)}
          showWeekHeader={true}/>
      </div>
    );
    /* eslint-enable react/jsx-boolean-value */
  }
}

module.exports = Examples;
