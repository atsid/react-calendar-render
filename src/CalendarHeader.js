const React = require('react');
const classNames = require('classnames');

class CalendarHeader extends React.Component {
  getTitleIfMonthAndYear(titleString) {
    let result = titleString;

    if (this.props.showMonthInTitle && this.props.showYearInTitle) {
      result = this.props.month.format('MMMM YYYY');
    }

    return result;
  }

  getTitleIfOnlyMonth(titleString) {
    let result = titleString;

    if (this.props.showMonthInTitle && !this.props.showYearInTitle) {
      result = this.props.month.format('MMMM');
    }

    return result;
  }

  getTitleIfOnlyYear(titleString) {
    let result = titleString;

    if (!this.props.showMonthInTitle && this.props.showYearInTitle) {
      result = this.props.month.format('YYYY');
    }

    return result;
  }

  getTitleString() {
    let titleString = this.getTitleIfMonthAndYear();

    titleString = this.getTitleIfOnlyMonth(titleString);
    titleString = this.getTitleIfOnlyYear(titleString);

    return titleString;
  }

  getLeftNav() {
    let nav = false;

    if (this.props.showHeaderNav) {
      const faClasses = classNames('fa', 'fa-angle-left', 'left-nav');

      nav = (
        <span className={faClasses} onClick={this.props.onPrevNavClick}/>
      );
    }

    return nav;
  }

  getRightNav() {
    let nav = false;

    if (this.props.showHeaderNav) {
      const faClasses = classNames('fa', 'fa-angle-right', 'right-nav');

      nav = (
        <span className={faClasses} onClick={this.props.onNextNavClick}/>
      );
    }

    return nav;
  }

  getHeader() {
    const titleString = this.getTitleString();
    const leftNav = this.getLeftNav();
    const rightNav = this.getRightNav();
    const headerClass = classNames('calendar-header');
    const headerTextClass = classNames('calendar-header-text');
    let result = false;

    if ((leftNav && rightNav) || titleString) {
      if (leftNav) {
        if (titleString) {
          result = (
            <div className={headerClass}>
              {leftNav}
              <span className={headerTextClass}>{titleString}</span>
              {rightNav}
            </div>
          );
        } else {
          result = (
            <div className={headerClass}>
              {leftNav}
              {rightNav}
            </div>
          );
        }
      } else {
        result = (
          <div className={headerClass}>
            <span className={headerTextClass}>{titleString}</span>
          </div>
        );
      }
    }

    return result;
  }

  render() {
    const header = this.getHeader();

    return (
      <div>
        {header}
      </div>);
  }
}

CalendarHeader.propTypes = {
  showMonthInTitle: React.PropTypes.bool,
  showYearInTitle: React.PropTypes.bool,
  showHeaderNav: React.PropTypes.bool,
  onNextNavClick: React.PropTypes.func,
  onPrevNavClick: React.PropTypes.func,
  month: React.PropTypes.object.isRequired,
};

CalendarHeader.defaultProps = {
  showMonthInTitle: true,
  showYearInTitle: true,
  showHeaderNav: true,
  onNextNavClick: () => {
  },
  onPrevNavClick: () => {
  },
};

module.exports = CalendarHeader;
