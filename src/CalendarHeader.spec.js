require('../common.spec/spec.helpers');
const chai = require('chai');
const chaiHaveXpath = require('chai-have-xpath');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const { findDOMNode } = require('react-dom');
const CalendarHeader = require('./CalendarHeader');
const moment = require('moment');
let expect;

chai.use(chaiHaveXpath);
expect = chai.expect;

describe('Calendar Header Component', () => {
  const now = moment();
  const bTrue = true;
  let header;

  it('does not display nav with showHeaderNav=false', () => {
    let title;

    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now} showHeaderNav={false}/>
    );

    expect(() => {
      TestUtils.findRenderedDOMComponentWithClass(header, 'fa fa-angle-left left-nav');
    }).to.throw(Error);

    expect(() => {
      TestUtils.findRenderedDOMComponentWithClass(header, 'fa fa-angle-right right-nav');
    }).to.throw(Error);

    TestUtils.findRenderedDOMComponentWithClass(header, 'calendar-header');
    title = TestUtils.findRenderedDOMComponentWithClass(header, 'calendar-header-text');

    expect(title.textContent).to.equal(now.format('MMMM YYYY'));
  });

  it('does not display year with showYearInTitle=false', () => {
    let title;

    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now} showHeaderNav={false} showYearInTitle={false}/>
    );

    expect(() => {
      TestUtils.findRenderedDOMComponentWithClass(header, 'fa fa-angle-left left-nav');
    }).to.throw(Error);

    expect(() => {
      TestUtils.findRenderedDOMComponentWithClass(header, 'fa fa-angle-right right-nav');
    }).to.throw(Error);

    TestUtils.findRenderedDOMComponentWithClass(header, 'calendar-header');
    title = TestUtils.findRenderedDOMComponentWithClass(header, 'calendar-header-text');

    expect(title.textContent).to.equal(now.format('MMMM'));
  });

  it('displays year if showYearInTitle=true with showMonthInTitle=false', () => {
    let title;

    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now} showHeaderNav={false} showMonthInTitle={false} showYearInTitle={bTrue}/>
    );

    expect(() => {
      TestUtils.findRenderedDOMComponentWithClass(header, 'fa fa-angle-left left-nav');
    }).to.throw(Error);

    expect(() => {
      TestUtils.findRenderedDOMComponentWithClass(header, 'fa fa-angle-right right-nav');
    }).to.throw(Error);

    TestUtils.findRenderedDOMComponentWithClass(header, 'calendar-header');
    title = TestUtils.findRenderedDOMComponentWithClass(header, 'calendar-header-text');

    expect(title.textContent).to.equal(now.format('YYYY'));
  });

  it('shows nav, month and year with no values (defaults)', () => {
    let title;

    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now}/>
    );

    TestUtils.findRenderedDOMComponentWithClass(header, 'fa fa-angle-left left-nav');
    TestUtils.findRenderedDOMComponentWithClass(header, 'fa fa-angle-right right-nav');
    TestUtils.findRenderedDOMComponentWithClass(header, 'calendar-header');

    title = TestUtils.findRenderedDOMComponentWithClass(header, 'calendar-header-text');

    expect(title.textContent).to.equal(now.format('MMMM YYYY'));
  });

  it('shows nav, month and year with all set to true', () => {
    let title;

    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now} showMonthInTitle={bTrue} showYearInTitle={bTrue} showHeaderNav={bTrue}/>
    );

    TestUtils.findRenderedDOMComponentWithClass(header, 'fa fa-angle-left left-nav');
    TestUtils.findRenderedDOMComponentWithClass(header, 'fa fa-angle-right right-nav');
    TestUtils.findRenderedDOMComponentWithClass(header, 'calendar-header');

    title = TestUtils.findRenderedDOMComponentWithClass(header, 'calendar-header-text');

    expect(title.textContent).to.equal(now.format('MMMM YYYY'));
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
