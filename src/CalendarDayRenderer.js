const React = require('react');
const classNames = require('classnames');

/**
 * Component that renders a day on the calendar.
 */
class CalendarDayRenderer extends React.Component {
  render() {
    const day = this.props.day;
    const month = this.props.month;
    const dayClass = day.month() === month.month() ? classNames('calendar-day') : classNames('calendar-day-non-current');

    return (
      <table>
        <tbody>
        <tr>
          <td className={dayClass}>{day.date()}</td>
        </tr>
        </tbody>
      </table>
    );
  }
}

CalendarDayRenderer.propTypes = {
  month: React.PropTypes.object.isRequired,
  day: React.PropTypes.object.isRequired,
};

module.exports = CalendarDayRenderer;
