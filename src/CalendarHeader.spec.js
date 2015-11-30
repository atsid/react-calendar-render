require('../common.spec/spec.helpers');
const { expect } = require('chai');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const { findDOMNode } = require('react-dom');
const CalendarHeader = require('./CalendarHeader');
const moment = require('moment');

describe('Calendar Header Component', () => {
  const now = moment();
  const bTrue = true;
  let header;

  it('does not display nav with showHeaderNav=false', () => {
    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now} showHeaderNav={false}/>
    );

    expect(header).to.not.have.xpath(`//div/div[@class='calendar-header']/span[@class='fa fa-angle-left left-nav']`);
    expect(header).to.have.xpath(`//div/div[@class='calendar-header']/span[text()="${now.format('MMMM YYYY')}"]`);
    expect(header).to.not.have.xpath(`//div/div[@class='calendar-header']/span[@class='fa fa-angle-right right-nav']`);
  });

  it('does not display year with showYearInTitle=false', () => {
    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now} showHeaderNav={false} showYearInTitle={false}/>
    );

    expect(header).to.not.have.xpath(`//div/div[@class='calendar-header']/span[@class='fa fa-angle-left left-nav']`);
    expect(header).to.have.xpath(`//div/div[@class='calendar-header']/span[text()="${now.format('MMMM')}"]`);
    expect(header).to.not.have.xpath(`//div/div[@class='calendar-header']/span[@class='fa fa-angle-right right-nav']`);
  });

  it('displays year if showYearInTitle=true with showMonthInTitle=false', () => {
    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now} showHeaderNav={false} showMonthInTitle={false} showYearInTitle={bTrue}/>
    );

    expect(header).to.not.have.xpath(`//div/div[@class='calendar-header']/span[@class='fa fa-angle-left left-nav']`);
    expect(header).to.have.xpath(`//div/div[@class='calendar-header']/span[text()="${now.format('YYYY')}"]`);
    expect(header).to.not.have.xpath(`//div/div[@class='calendar-header']/span[@class='fa fa-angle-right right-nav']`);
  });

  it('shows nav, month and year with no values (defaults)', () => {
    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now}/>
    );

    expect(header).to.have.xpath(`//div/div[@class='calendar-header']/span[@class='fa fa-angle-left left-nav']`);
    expect(header).to.have.xpath(`//div/div[@class='calendar-header']/span[text()="${now.format('MMMM YYYY')}"]`);
    expect(header).to.have.xpath(`//div/div[@class='calendar-header']/span[@class='fa fa-angle-right right-nav']`);
  });

  it('shows nav, month and year with all set to true', () => {
    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now} showMonthInTitle={bTrue} showYearInTitle={bTrue} showHeaderNav={bTrue}/>
    );

    expect(header).to.have.xpath(`//div/div[@class='calendar-header']/span[@class='fa fa-angle-left left-nav']`);
    expect(header).to.have.xpath(`//div/div[@class='calendar-header']/span[text()="${now.format('MMMM YYYY')}"]`);
    expect(header).to.have.xpath(`//div/div[@class='calendar-header']/span[@class='fa fa-angle-right right-nav']`);
  });

  it('onClick handler for prev nav gets called on click', () => {
    let handlerCalled = false;
    let leftNavDom;
    const prevHandler = () => {
      handlerCalled = true;
    };
    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={moment()} onPrevNavClick={prevHandler}/>
    );

    leftNavDom = findDOMNode(header).childNodes[0].childNodes[0];

    TestUtils.Simulate.click(leftNavDom);

    expect(handlerCalled).to.equal(true);
  });

  it('onClick handler for next nav gets called on click', () => {
    let handlerCalled = false;
    let rightNavDom;
    const nextHandler = () => {
      handlerCalled = true;
    };

    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={moment()} onNextNavClick={nextHandler}/>
    );
    rightNavDom = findDOMNode(header).childNodes[0].childNodes[2];

    TestUtils.Simulate.click(rightNavDom);

    expect(handlerCalled).to.equal(true);
  });
});
