require('../common.spec/spec.helpers');
const chai = require('chai');
const chaiHaveXpath = require('chai-have-xpath');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const CalenderDayRenderer = require('./CalendarDayRenderer');
const moment = require('moment');
let expect;

chai.use(chaiHaveXpath);
expect = chai.expect;

describe('Simple Calender Day Renderer', () => {
  const now = moment();
  let rendered;

  it('renders correct number and class name for current month', () => {
    rendered = TestUtils.renderIntoDocument(
      <CalenderDayRenderer month={now} day={now}/>
    );

    expect(rendered).to.have.xpath(`//table/tbody/tr/td[text()='${now.date()}'][@class='calendar-day']`);
  });

  it('renders correct number and class name for non-current month', () => {
    rendered = TestUtils.renderIntoDocument(
      <CalenderDayRenderer month={now} day={now.clone().subtract(1, 'month')}/>
    );

    expect(rendered).to.have.xpath(`//table/tbody/tr/td[text()='${now.clone().subtract(1, 'month').date()}'][@class='calendar-day-non-current']`);
  });
});
