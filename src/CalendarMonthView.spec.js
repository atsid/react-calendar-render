require('../common.spec/spec.helpers');
const chai = require('chai');
const chaiHaveXpath = require('chai-have-xpath');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const CalendarMonthView = require('./CalendarMonthView');
const classNames = require('classnames');
const moment = require('moment');
let expect;

chai.use(chaiHaveXpath);
expect = chai.expect;

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
    let rows;

    now = moment('20150201', 'YYYYMMDD');
    rendered = TestUtils.renderIntoDocument(
      <CalendarMonthView month={now}/>
    );

    // Verify 4 rows were generated
    rows = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'calendar-mv-row');

    expect(rows.length).to.equal(4);

    // Verify that the first cell in the first row is the 1st (2/1/2015 is a Sunday)
    expect(rendered).to.have.xpath(`${getCellXpath(1, 1)}[text()='1']`);
  });

  it('generates correct weekday header with default days', () => {
    const rendered = TestUtils.renderIntoDocument(
      <CalendarMonthView month={now}/>
    );
    const days = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'calendar-weekday');

    expect(days.length).to.equal(7);
    expect(days[0].textContent).to.equal('Sunday');
    expect(days[1].textContent).to.equal('Monday');
    expect(days[2].textContent).to.equal('Tuesday');
    expect(days[3].textContent).to.equal('Wednesday');
    expect(days[4].textContent).to.equal('Thursday');
    expect(days[5].textContent).to.equal('Friday');
    expect(days[6].textContent).to.equal('Saturday');
  });

  it('generates correct weekday header with passed in days', () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const rendered = TestUtils.renderIntoDocument(
      <CalendarMonthView month={now} weekdays={weekdays}/>
    );
    const days = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'calendar-weekday');

    expect(days.length).to.equal(7);
    expect(days[0].textContent).to.equal('Sun');
    expect(days[1].textContent).to.equal('Mon');
    expect(days[2].textContent).to.equal('Tue');
    expect(days[3].textContent).to.equal('Wed');
    expect(days[4].textContent).to.equal('Thur');
    expect(days[5].textContent).to.equal('Fri');
    expect(days[6].textContent).to.equal('Sat');
  });

  it('properly handles months that do not start on sunday', () => {
    let rendered;
    let rows;
    let days;

    now = moment('20150401', 'YYYYMMDD');
    rendered = TestUtils.renderIntoDocument(
      <CalendarMonthView month={now}/>
    );

    rows = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'calendar-mv-row');
    days = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'calendar-day-non-current');

    // Verify 5 rows were generated
    expect(rows.length).to.equal(5);

    // Verify out-of-month days exist
    expect(days.length).to.equal(5);
    expect(days[0].textContent).to.equal('29');
    expect(days[1].textContent).to.equal('30');
    expect(days[2].textContent).to.equal('31');
    expect(days[3].textContent).to.equal('1');
    expect(days[4].textContent).to.equal('2');
  });

  it('generates a 6 week calendar when forceSixWeek=true', () => {
    let rendered;
    let rows;
    let nonMonthDays;

    now = moment('20150201', 'YYYYMMDD');
    rendered = TestUtils.renderIntoDocument(
      <CalendarMonthView month={now} forceSixWeek={bTrue}/>
    );
    rows = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'calendar-mv-row');

    // Verify 6 rows were generated
    expect(rows.length).to.equal(6);

    nonMonthDays = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'calendar-day-non-current');
    expect(nonMonthDays.length).to.equal(14);
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
