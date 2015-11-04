require('../common.spec/spec.helpers');
const { expect } = require('chai');
const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const CalendarHeader = require('./CalendarHeader');
const moment = require('moment');

describe('Calendar Header Component', () => {
  const now = moment();
  const bTrue = true;
  let header;

  it('does not display nav with showHeaderNav=false', () => {
    let domNode;
    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now} showHeaderNav={false}/>
    );
    domNode = header.getDOMNode();

    expect(domNode).to.not.be.undefined;
    expect(domNode.childNodes.length).to.equal(1);
    expect(domNode.childNodes[0].className).to.equal('calendar-header');
    expect(domNode.childNodes[0].textContent).to.equal(now.format('MMMM YYYY'));
  });

  it('does not display year with showYearInTitle=false', () => {
    let domNode;
    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now} showHeaderNav={false} showYearInTitle={false}/>
    );
    domNode = header.getDOMNode();

    expect(domNode).to.not.be.undefined;
    expect(domNode.childNodes.length).to.equal(1);
    expect(domNode.childNodes[0].className).to.equal('calendar-header');
    expect(domNode.childNodes[0].textContent).to.equal(now.format('MMMM'));
  });

  it('displays year if showYearInTitle=true with showMonthInTitle=false', () => {
    let domNode;
    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now} showHeaderNav={false} showMonthInTitle={false} showYearInTitle={bTrue}/>
    );
    domNode = header.getDOMNode();

    expect(domNode).to.not.be.undefined;
    expect(domNode.childNodes.length).to.equal(1);
    expect(domNode.childNodes[0].className).to.equal('calendar-header');
    expect(domNode.childNodes[0].textContent).to.equal(now.format('YYYY'));
  });

  it('shows nav, month and year with no values (defaults)', () => {
    let domNode;
    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now}/>
    );
    domNode = header.getDOMNode();

    expect(domNode).to.not.be.undefined;
    expect(domNode.childNodes.length).to.equal(1);
    expect(domNode.childNodes[0].className).to.equal('calendar-header');
    expect(domNode.childNodes[0].childNodes.length).to.equal(3);
    expect(domNode.childNodes[0].childNodes[0].className).to.equal('fa fa-angle-left left-nav');
    expect(domNode.childNodes[0].childNodes[1].textContent).to.equal(now.format('MMMM YYYY'));
    expect(domNode.childNodes[0].childNodes[2].className).to.equal('fa fa-angle-right right-nav');
  });

  it('shows nav, month and year with all set to true', () => {
    let domNode;
    header = TestUtils.renderIntoDocument(
      <CalendarHeader month={now} showMonthInTitle={bTrue} showYearInTitle={bTrue} showHeaderNav={bTrue}/>
    );
    domNode = header.getDOMNode();

    expect(domNode).to.not.be.undefined;
    expect(domNode.childNodes.length).to.equal(1);
    expect(domNode.childNodes[0].className).to.equal('calendar-header');
    expect(domNode.childNodes[0].childNodes.length).to.equal(3);
    expect(domNode.childNodes[0].childNodes[0].className).to.equal('fa fa-angle-left left-nav');
    expect(domNode.childNodes[0].childNodes[1].textContent).to.equal(now.format('MMMM YYYY'));
    expect(domNode.childNodes[0].childNodes[2].className).to.equal('fa fa-angle-right right-nav');
  });

  it('generates error if month is not defined', () => {
    const doRender = () => {
      header = TestUtils.renderIntoDocument(
        <CalendarHeader/>
      );
    };

    expect(doRender).to.throw(Error);
  });

  it('onClick handler for prev nav gets called on click', () => {
    let handlerCalled = false;
    const prevHandler = () => {
      handlerCalled = true;
    };
    const header = TestUtils.renderIntoDocument(
      <CalendarHeader month={moment()} onPrevNavClick={prevHandler}/>
    );
    const leftNavDom = header.getDOMNode().childNodes[0].childNodes[0];

    TestUtils.Simulate.click(leftNavDom);

    expect(handlerCalled).to.equal(true);
  });

  it('onClick handler for next nav gets called on click', () => {
    let handlerCalled = false;
    const nextHandler = () => {
      handlerCalled = true;
    };
    const header = TestUtils.renderIntoDocument(
      <CalendarHeader month={moment()} onNextNavClick={nextHandler}/>
    );
    const rightNavDom = header.getDOMNode().childNodes[0].childNodes[2];

    TestUtils.Simulate.click(rightNavDom);

    expect(handlerCalled).to.equal(true);
  });
});
