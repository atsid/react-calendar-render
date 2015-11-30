require('../common.spec/spec.helpers');
const { expect } = require('chai');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const CalendarMonthView = require('./CalendarMonthView');
const classNames = require('classnames');
const moment = require('moment');

class TestDayRenderer extends React.Component {
  render() {
    const day = this.props.day;
    const month = this.props.month;
    const dayClass = day.month() === month.month() ? classNames('calendar-day') : classNames('calendar-day-non-current');
    const dayString = `blah blah-${day.date()}`;

    return (
      <table>
        <tbody>
        <tr>
          <td className={dayClass}>{dayString}</td>
        </tr>
        </tbody>
      </table>
    );
  }
}

TestDayRenderer.propTypes = {
  month: React.PropTypes.object.isRequired,
  day: React.PropTypes.object.isRequired,
};

describe('Calendar Month View Renderer', () => {
  const bTrue = true;
  const calendarContainer = '//div[@class=\'calendar-mv-container\']';
  const calendarRowContainer = `${calendarContainer}/div[@class=\'calendar-mv-row-container\']`;
  const calendarRow = `${calendarRowContainer}/div[@class='calendar-mv-row']`;
  let now = moment();

  function getCellXpath(row, cell, className = 'calendar-day') {
    const cellTable = `${calendarRow}[${row}]/table[@class='calendar-mv-position']/tbody/tr/td[@class='calendar-mv-cell'][${cell}]`;

    return `${cellTable}/table/tbody/tr/td[@class='${className}']`;
  }

  it('generates correct number of rows for a short month', () => {
    let rendered;

    now = moment('20150201', 'YYYYMMDD');
    rendered = TestUtils.renderIntoDocument(
      <CalendarMonthView month={now}/>
    );

    // Verify 4 rows were generated
    expect(rendered).to.have.xpath(`${calendarRow}[1]`);
    expect(rendered).to.have.xpath(`${calendarRow}[2]`);
    expect(rendered).to.have.xpath(`${calendarRow}[3]`);
    expect(rendered).to.have.xpath(`${calendarRow}[4]`);
    expect(rendered).to.not.have.xpath(`(${calendarRow})[5]`);

    // Verify that the first cell in the first row is the 1st (2/1/2015 is a Sunday)
    expect(rendered).to.have.xpath(`${getCellXpath(1, 1)}[text()='1']`);
  });

  it('generates correct weekday header with default days', () => {
    const rendered = TestUtils.renderIntoDocument(
      <CalendarMonthView month={now}/>
    );
    const calendarWeekRow = `${calendarContainer}/div[@class='calendar-week-row']/table/tbody/tr`;

    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[1][text()='Sunday']`);
    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[2][text()='Monday']`);
    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[3][text()='Tuesday']`);
    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[4][text()='Wednesday']`);
    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[5][text()='Thursday']`);
    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[6][text()='Friday']`);
    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[7][text()='Saturday']`);
  });

  it('generates correct weekday header with passed in days', () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const rendered = TestUtils.renderIntoDocument(
      <CalendarMonthView month={now} weekdays={weekdays}/>
    );
    const calendarWeekRow = `${calendarContainer}/div[@class='calendar-week-row']/table/tbody/tr`;

    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[1][text()='Sun']`);
    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[2][text()='Mon']`);
    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[3][text()='Tue']`);
    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[4][text()='Wed']`);
    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[5][text()='Thur']`);
    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[6][text()='Fri']`);
    expect(rendered).to.have.xpath(`${calendarWeekRow}/td[7][text()='Sat']`);
  });

  it('properly handles months that do not start on sunday', () => {
    let rendered;

    now = moment('20150401', 'YYYYMMDD');
    rendered = TestUtils.renderIntoDocument(
      <CalendarMonthView month={now}/>
    );

    // Verify 5 rows were generated
    expect(rendered).to.have.xpath(`${calendarRow}[1]`);
    expect(rendered).to.have.xpath(`${calendarRow}[2]`);
    expect(rendered).to.have.xpath(`${calendarRow}[3]`);
    expect(rendered).to.have.xpath(`${calendarRow}[4]`);
    expect(rendered).to.have.xpath(`(${calendarRow})[5]`);
    expect(rendered).to.not.have.xpath(`(${calendarRow})[6]`);

    // Verify that the first cell in the first row is the 29th with the first in cell 4
    expect(rendered).to.have.xpath(`${getCellXpath(1, 1, 'calendar-day-non-current')}[text()='29']`);
    expect(rendered).to.have.xpath(`${getCellXpath(1, 2, 'calendar-day-non-current')}[text()='30']`);
    expect(rendered).to.have.xpath(`${getCellXpath(1, 3, 'calendar-day-non-current')}[text()='31']`);
    expect(rendered).to.have.xpath(`${getCellXpath(1, 4)}[text()='1']`);
  });

  it('generates a 6 week calendar when forceSixWeek=true', () => {
    let rendered;

    now = moment('20150201', 'YYYYMMDD');
    rendered = TestUtils.renderIntoDocument(
      <CalendarMonthView month={now} forceSixWeek={bTrue}/>
    );

    // Verify 6 rows were generated
    expect(rendered).to.have.xpath(`${calendarRow}[1]`);
    expect(rendered).to.have.xpath(`${calendarRow}[2]`);
    expect(rendered).to.have.xpath(`${calendarRow}[3]`);
    expect(rendered).to.have.xpath(`${calendarRow}[4]`);
    expect(rendered).to.have.xpath(`(${calendarRow})[5]`);
    expect(rendered).to.have.xpath(`(${calendarRow})[6]`);
    expect(rendered).to.not.have.xpath(`(${calendarRow})[7]`);

    // Verify that the first cell in the first row is the 1st (2/1/2015 is a Sunday)
    expect(rendered).to.have.xpath(`${getCellXpath(1, 1)}[text()='1']`);
    // Verify the first cell in row 5 is from the next month and uses the non-current class
    expect(rendered).to.have.xpath(`${getCellXpath(5, 1, 'calendar-day-non-current')}[text()='1']`);
  });

  it('uses correct renderer when passed in', () => {
    let rendered;

    now = moment('20150401', 'YYYYMMDD');
    rendered = TestUtils.renderIntoDocument(
      <CalendarMonthView month={now} dayRenderer={TestDayRenderer}/>
    );

    // Verify that the first cell in the first row is the 29th with the first in cell 4
    expect(rendered).to.have.xpath(`${getCellXpath(1, 4)}[text()='blah blah-1']`);
  });
});
