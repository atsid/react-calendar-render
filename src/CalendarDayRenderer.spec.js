require('../common.spec/spec.helpers');
const { expect } = require('chai');
const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const CalenderDayRenderer = require('./CalendarDayRenderer');
const moment = require('moment');

describe('Simple Calender Day Renderer', () => {
  const now = moment();
  let rendered;

  it('renders correct number and class name for current month', () => {
    let domNode;
    let td;

    rendered = TestUtils.renderIntoDocument(
      <CalenderDayRenderer month={now} day={now}/>
    );
    domNode = React.findDOMNode(rendered);

    expect(domNode).to.not.be.undefined;
    expect(domNode.tagName).to.equal('TABLE');
    expect(domNode.childNodes[0].tagName).to.equal('TBODY');
    expect(domNode.childNodes[0].childNodes[0].tagName).to.equal('TR');
    td = domNode.childNodes[0].childNodes[0].childNodes[0];
    expect(td.tagName).to.equal('TD');
    expect(td.textContent).to.equal(now.date().toString());
    expect(td.className).to.equal('calendar-day');
  });

  it('renders correct number and class name for non-current month', () => {
    let domNode;
    let td;

    rendered = TestUtils.renderIntoDocument(
      <CalenderDayRenderer month={now} day={now.clone().subtract(1, 'month')}/>
    );
    domNode = React.findDOMNode(rendered);

    expect(domNode).to.not.be.undefined;
    expect(domNode.tagName).to.equal('TABLE');
    expect(domNode.childNodes[0].tagName).to.equal('TBODY');
    expect(domNode.childNodes[0].childNodes[0].tagName).to.equal('TR');
    td = domNode.childNodes[0].childNodes[0].childNodes[0];
    expect(td.tagName).to.equal('TD');
    expect(td.textContent).to.equal(now.date().toString());
    expect(td.className).to.equal('calendar-day-non-current');
  });
});
