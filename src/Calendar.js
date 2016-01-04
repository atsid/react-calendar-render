const React = require('react');
const { findDOMNode } = require('react-dom');
const moment = require('moment');
const CalendarHeader = require('./CalendarHeader');
const CalendarMonthView = require('./CalendarMonthView');
const classNames = require('classnames');

class Calendar extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  getCalendarHeader() {
    let header;

    if (this.props.showHeader) {
      header = (<CalendarHeader
        showMonthInTitle={this.props.showMonthInTitle}
        showYearInTitle={this.props.showYearInTitle}
        showHeaderNav={this.props.showHeaderNav}
        onNextNavClick={this.props.onNextNavClick}
        onPrevNavClick={this.props.onPrevNavClick}
        month={this.props.month}/>);
    }

    return header;
  }

  getCalendarBody() {
    return (<CalendarMonthView
      forceSixWeek={this.props.forceSixWeek}
      showWeekHeader={this.props.showWeekHeader}
      month={this.props.month}/>);
  }

  getHeaderNode(rootNode) {
    let headerNode;

    if (this.props.showHeader) {
      headerNode = rootNode.childNodes[0];
    }

    return headerNode;
  }

  getViewNode(rootNode) {
    let viewNode;

    if (this.props.showHeader) {
      viewNode = rootNode.childNodes[1];
    } else {
      viewNode = rootNode.childNodes[0];
    }

    return viewNode;
  }

  handleResize() {
    const rootNode = findDOMNode(this);
    const headerNode = this.getHeaderNode(rootNode);
    const viewNode = this.getViewNode(rootNode);

    if (headerNode) {
      const newHeight = rootNode.offsetHeight - headerNode.offsetHeight;
      viewNode.style.height = `${newHeight}px`;
      viewNode.style.top = `${headerNode.offsetHeight}px`;
    } else {
      viewNode.style.top = '0px';
      viewNode.style.height = `${rootNode.offsetHeight}px`;
    }
  }

  render() {
    const wrapperClass = classNames('calendar-container');
    const header = this.getCalendarHeader();
    const body = this.getCalendarBody();

    return (
      <div className={wrapperClass}>{header}{body}</div>
    );
  }
}

Calendar.propTypes = {
  forceSixWeek: React.PropTypes.bool,
  showMonthInTitle: React.PropTypes.bool,
  showYearInTitle: React.PropTypes.bool,
  showHeaderNav: React.PropTypes.bool,
  showHeader: React.PropTypes.bool,
  showWeekHeader: React.PropTypes.bool,
  onNextNavClick: React.PropTypes.func,
  onPrevNavClick: React.PropTypes.func,
  month: React.PropTypes.object.isRequired,
};

Calendar.defaultProps = {
  forceSixWeek: false,
  showHeader: true,
  month: moment(),
};

module.exports = Calendar;
