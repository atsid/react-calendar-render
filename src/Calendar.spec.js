require('../common.spec/spec.helpers');
const { expect } = require('chai');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Calendar = require('./Calendar');
// const CalendarHeader = require('./CalendarHeader');
// const CalendarMonthView = require('./CalendarMonthView');
const moment = require('moment');
const sinon = require('sinon');
// const { findDOMNode } = require('react-dom');

describe('The Calendar class', () => {
  const calendarXpath = `//div[@class='calendar-container']`;
  const headerXpath = `${calendarXpath}/div/div[@class='calendar-header']`;
  const calendarViewContainer = `${calendarXpath}/div[@class='calendar-mv-container']`;
  const calendarViewRowContainer = `${calendarViewContainer}/div[@class='calendar-mv-row-container']`;
  const calendarRow = `${calendarViewRowContainer}/div[@class='calendar-mv-row']`;
  const bTrue = true;
  let now = moment();
  let rendered;

  it('renders full calendar with headers with default values', () => {
    rendered = TestUtils.renderIntoDocument(
      <Calendar month={now}/>
    );

    // Validate header exists
    expect(rendered).to.have.xpath(`${headerXpath}/span[@class='fa fa-angle-left left-nav']`);
    expect(rendered).to.have.xpath(`${headerXpath}/span[text()="${now.format('MMMM YYYY')}"]`);
    expect(rendered).to.have.xpath(`${headerXpath}/span[@class='fa fa-angle-right right-nav']`);

    // Validate view exists
    expect(rendered).to.have.xpath(calendarRow);
  });

  it('passes in showHeaderNav and showYearInTitle to header', () => {
    rendered = TestUtils.renderIntoDocument(
      <Calendar month={now} showHeaderNav={false} showYearInTitle={false}/>
    );

    // Validate header exists
    expect(rendered).to.not.have.xpath(`${headerXpath}/span[@class='fa fa-angle-left left-nav']`);
    expect(rendered).to.have.xpath(`${headerXpath}/span[text()="${now.format('MMMM')}"]`);
    expect(rendered).to.not.have.xpath(`${headerXpath}/span[@class='fa fa-angle-right right-nav']`);

    // Validate view exists
    expect(rendered).to.have.xpath(calendarRow);
  });

  it('passes in showMonthInTitle to header', () => {
    rendered = TestUtils.renderIntoDocument(
      <Calendar month={now} showMonthInTitle={false}/>
    );

    // Validate header exists
    expect(rendered).to.have.xpath(`${headerXpath}/span[@class='fa fa-angle-left left-nav']`);
    expect(rendered).to.have.xpath(`${headerXpath}/span[text()="${now.format('YYYY')}"]`);
    expect(rendered).to.have.xpath(`${headerXpath}/span[@class='fa fa-angle-right right-nav']`);

    // Validate view exists
    expect(rendered).to.have.xpath(calendarRow);
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
    rendered = TestUtils.renderIntoDocument(
      <Calendar month={now} showHeader={false}/>
    );

    expect(rendered).to.not.have.xpath(headerXpath);
  });

  it('passes in forceSixWeek to view', () => {
    now = moment('20150201', 'YYYYMMDD');
    rendered = TestUtils.renderIntoDocument(
      <Calendar month={now} forceSixWeek={bTrue}/>
    );

    // Validate view exists
    expect(rendered).to.have.xpath(`${calendarRow}[1]`);
    expect(rendered).to.have.xpath(`${calendarRow}[2]`);
    expect(rendered).to.have.xpath(`${calendarRow}[3]`);
    expect(rendered).to.have.xpath(`${calendarRow}[4]`);
    expect(rendered).to.have.xpath(`${calendarRow}[5]`);
    expect(rendered).to.have.xpath(`${calendarRow}[6]`);
    expect(rendered).to.not.have.xpath(`${calendarRow}[7]`);
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
