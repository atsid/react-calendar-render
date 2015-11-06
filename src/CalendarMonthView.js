const React = require('react/addons');
const classNames = require('classnames');
const DefaultDayRenderer = require('./CalendarDayRenderer');

class CalendarMonthView extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  componentDidUpdate() {
    this.handleResize();
  }

  /**
   * Gets the number of weeks in the current month.  Formula is taken from answer on
   * http://stackoverflow.com/questions/2483719/get-weeks-in-month-through-javascript
   *
   * @returns {number} number of weeks in the current month
   */
  getRowCount() {
    let weekCount = this.props.forceSixWeek ? 6 : 0;

    if (!weekCount) {
      const year = this.props.month.year();
      const month = this.props.month.month();
      const firstOfMonth = new Date(year, month, 1);
      const lastOfMonth = new Date(year, month + 1, 0);
      const used = firstOfMonth.getDay() + lastOfMonth.getDate();

      weekCount = Math.ceil(used / 7);
    }

    return weekCount;
  }

  getPercent(index, rowCount) {
    const percent = (index / rowCount) * 100;

    return `${percent}%`;
  }

  getHeaderNode(rootNode) {
    let headerNode;

    if (this.props.showWeekHeader) {
      headerNode = rootNode.childNodes[0];
    }

    return headerNode;
  }

  getRowNodes(rootNode) {
    let rowNodes;

    if (this.props.showWeekHeader) {
      rowNodes = rootNode.childNodes[1].childNodes;
    } else {
      rowNodes = rootNode.childNodes[0].childNodes;
    }

    return rowNodes;
  }

  getRowTop(headerNode) {
    let top = 0;

    if (this.props.showWeekHeader && headerNode) {
      top = headerNode.clientHeight;
    }

    return top;
  }

  getWeekRow() {
    const weekdayRow = classNames('calendar-week-row');
    let row = null;

    if (this.props.showWeekHeader) {
      row = (
        <div className={weekdayRow}>
          <table>
            <tbody>
            <tr>
              <td>{this.props.weekdays[0]}</td>
              <td>{this.props.weekdays[1]}</td>
              <td>{this.props.weekdays[2]}</td>
              <td>{this.props.weekdays[3]}</td>
              <td>{this.props.weekdays[4]}</td>
              <td>{this.props.weekdays[5]}</td>
              <td>{this.props.weekdays[6]}</td>
            </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return row;
  }

  handleResize() {
    const rootNode = React.findDOMNode(this);
    const headerNode = this.getHeaderNode(rootNode);
    const rowNodes = this.getRowNodes(rootNode);
    const height = headerNode ? rootNode.clientHeight - headerNode.clientHeight : rootNode.clientHeight;
    const rowHeight = Math.floor(height / rowNodes.length);
    const top = this.getRowTop(headerNode);

    for (let index = 0; index < rowNodes.length; index++) {
      const rowTop = top + (rowHeight - 1) * index;

      if (index !== rowNodes.length - 1) {
        rowNodes[index].style.top = `${rowTop}px`;
        this.resizeRow(rowNodes[index], rowHeight);
      } else {
        this.resizeRow(rowNodes[index], height);
        rowNodes[index].style.top = `${rowTop}px`;
        rowNodes[index].style.bottom = '0px';
      }
    }
  }

  resizeRow(rowNode, height) {
    rowNode.style.height = `${height}px`;
    rowNode.childNodes[0].style.height = `${height}px`;
    rowNode.childNodes[1].style.height = `${height}px`;
  }

  renderDay(day) {
    const renderedDay = (<DefaultDayRenderer month={this.props.month} day={day.clone()}/>);

    day.add(1, 'day');

    return renderedDay;
  }

  render() {
    const rowCount = this.getRowCount();
    const tableClassName = classNames('full-width', 'full-height', 'calendar-mv-position');
    const tableClassName2 = classNames('full-width', 'full-height', 'calendar-mv-bg-position');
    const tableCellClassName = classNames('calendar-mv-cell');
    const tableCellBackgroundClassName = classNames('calendar-mv-bg-cell');
    const calendarClassName = classNames('calendar-mv-container');
    const calendarContainerName = classNames('calendar-mv-row-container');
    const month2 = this.props.month.clone().startOf('month').day('Sunday');
    const tableRow = classNames('calendar-mv-row');
    const weekRow = this.getWeekRow();

    return (
      <div className={calendarClassName}>
        {weekRow}
        <div className={calendarContainerName}>
          {Array(rowCount).fill().map((data, index) => {
            return (
              <div className={tableRow}
                   style={{top: this.getPercent(index, rowCount)}}>
                <table className={tableClassName2}>
                  <tbody>
                  <tr>
                    <td className={tableCellBackgroundClassName}/>
                    <td className={tableCellBackgroundClassName}/>
                    <td className={tableCellBackgroundClassName}/>
                    <td className={tableCellBackgroundClassName}/>
                    <td className={tableCellBackgroundClassName}/>
                    <td className={tableCellBackgroundClassName}/>
                    <td className={tableCellBackgroundClassName}/>
                  </tr>
                  </tbody>
                </table>
                <table className={tableClassName}>
                  <tbody>
                  <tr>
                    <td className={tableCellClassName}>{this.renderDay(month2)}</td>
                    <td className={tableCellClassName}>{this.renderDay(month2)}</td>
                    <td className={tableCellClassName}>{this.renderDay(month2)}</td>
                    <td className={tableCellClassName}>{this.renderDay(month2)}</td>
                    <td className={tableCellClassName}>{this.renderDay(month2)}</td>
                    <td className={tableCellClassName}>{this.renderDay(month2)}</td>
                    <td className={tableCellClassName}>{this.renderDay(month2)}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

CalendarMonthView.propTypes = {
  forceSixWeek: React.PropTypes.bool,
  month: React.PropTypes.object.isRequired,
  showWeekHeader: React.PropTypes.bool,
  dayRenderer: React.PropTypes.element,
  weekdays: React.PropTypes.array,
};

CalendarMonthView.defaultProps = {
  forceSixWeek: false,
  showWeekHeader: true,
  dayRenderer: DefaultDayRenderer,
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

module.exports = CalendarMonthView;
