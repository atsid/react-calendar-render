require('../common.spec/spec.helpers');
const Calendar = require('./Calendar');
const CalendarHeader = require('./CalendarHeader');
const CalendarMonthView = require('./CalendarMonthView');
const { expect } = require('chai');
const moment = require('moment');
const React = require('react');
const sinon = require('sinon');
const TestUtils = require('react-addons-test-utils');

describe('The Calendar class', () => {
  const bTrue = true;
  let now = moment();
  let rendered;

  it('renders full calendar with headers with default values', () => {
    let header;
    let body;

    rendered = TestUtils.renderIntoDocument(
      <Calendar month={now}/>
    );

    // Validate header exists
    header = TestUtils.findRenderedComponentWithType(rendered, CalendarHeader);

    expect(header.props.showYearInTitle).to.equal(true);
    expect(header.props.showHeaderNav).to.equal(true);
    expect(header.props.showMonthInTitle).to.equal(true);
    expect(header.props.month).to.equal(now);

    // Validate view exists
    body = TestUtils.findRenderedComponentWithType(rendered, CalendarMonthView);

    expect(body.props.forceSixWeek).to.equal(false);
    expect(body.props.month).to.equal(now);
  });

  it('passes in showHeaderNav and showYearInTitle to header', () => {
    let header;
    let body;

    rendered = TestUtils.renderIntoDocument(
      <Calendar month={now} showHeaderNav={false} showYearInTitle={false}/>
    );

    // Validate header exists
    header = TestUtils.findRenderedComponentWithType(rendered, CalendarHeader);

    expect(header.props.showYearInTitle).to.equal(false);
    expect(header.props.showHeaderNav).to.equal(false);
    expect(header.props.month).to.equal(now);

    // Validate view exists
    body = TestUtils.findRenderedComponentWithType(rendered, CalendarMonthView);

    expect(body.props.forceSixWeek).to.equal(false);
    expect(body.props.month).to.equal(now);
  });

  it('passes in showMonthInTitle to header', () => {
    let header;
    let body;

    rendered = TestUtils.renderIntoDocument(
      <Calendar month={now} showMonthInTitle={false}/>
    );

    // Validate header exists
    header = TestUtils.findRenderedComponentWithType(rendered, CalendarHeader);

    expect(header.props.showYearInTitle).to.equal(true);
    expect(header.props.showHeaderNav).to.equal(true);
    expect(header.props.showMonthInTitle).to.equal(false);
    expect(header.props.month).to.equal(now);

    // Validate view exists
    body = TestUtils.findRenderedComponentWithType(rendered, CalendarMonthView);

    expect(body.props.forceSixWeek).to.equal(false);
    expect(body.props.month).to.equal(now);
  });

  it('passes in click handlers to header', () => {
    const prevHandler = sinon.spy();
    const nextHandler = sinon.spy();
    let leftNav;
    let rightNav;

    rendered = TestUtils.renderIntoDocument(
      <Calendar month={now} onPrevNavClick={prevHandler} onNextNavClick={nextHandler}/>
    );

    leftNav = TestUtils.findRenderedDOMComponentWithClass(rendered, 'fa fa-angle-left left-nav');
    rightNav = TestUtils.findRenderedDOMComponentWithClass(rendered, 'fa fa-angle-right right-nav');

    expect(leftNav).to.not.be.undefined;
    expect(leftNav).to.not.be.null;
    expect(rightNav).to.not.be.undefined;
    expect(rightNav).to.not.be.null;

    // Click prev nav
    expect(prevHandler.called).to.equal(false);
    TestUtils.Simulate.click(leftNav);
    expect(prevHandler.called).to.equal(true);

    // Click next nav
    expect(nextHandler.called).to.equal(false);
    TestUtils.Simulate.click(rightNav);
    expect(nextHandler.called).to.equal(true);
  });

  it('does not show header when showHeader=false', () => {
    let body;

    rendered = TestUtils.renderIntoDocument(
      <Calendar month={now} showHeader={false}/>
    );

    // Validate header does not exist
    expect(() => {
      TestUtils.findRenderedComponentWithType(rendered, CalendarHeader);
    }).to.throw(Error);

    // Validate view exists
    body = TestUtils.findRenderedComponentWithType(rendered, CalendarMonthView);

    expect(body.props.forceSixWeek).to.equal(false);
    expect(body.props.month).to.equal(now);
  });

  it('passes in forceSixWeek to view', () => {
    let header;
    let body;

    now = moment('20150201', 'YYYYMMDD');
    rendered = TestUtils.renderIntoDocument(
      <Calendar month={now} forceSixWeek={bTrue}/>
    );

    // Validate header exists
    header = TestUtils.findRenderedComponentWithType(rendered, CalendarHeader);

    expect(header.props.showYearInTitle).to.equal(true);
    expect(header.props.showHeaderNav).to.equal(true);
    expect(header.props.showMonthInTitle).to.equal(true);
    expect(header.props.month).to.equal(now);

    // Validate view exists
    body = TestUtils.findRenderedComponentWithType(rendered, CalendarMonthView);

    expect(body.props.forceSixWeek).to.equal(true);
    expect(body.props.month).to.equal(now);
  });

  it('passes showWeekHeader to view', () => {
    let weekRow;

    rendered = TestUtils.renderIntoDocument(
      <Calendar month={now}/>
    );

    weekRow = TestUtils.findRenderedDOMComponentWithClass(rendered, 'calendar-week-row');

    expect(weekRow).to.not.be.null;
    expect(weekRow.childNodes[0].childNodes[0].childNodes[0].childNodes.length).to.equal(7);
  });
});
