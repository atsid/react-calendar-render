const React = require('react/addons');
const classNames = require('classnames');

class CalendarMonthView extends React.Component {
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

  getDay(month) {
    return '';
  }

  renderDay(month) {
    const day = month.date();
    const content = 'asdlfkjasdkjh aena jnaslnenalsdjnn aslkd e lkalkje adlkj d ;lkjdalkjs';//month.format('MM/DD/YYYY');
    month.add(1, 'day');
    return day + '\n' + content + content;
  }

  getPercent(i, rowCount) {
    const percent = (i / rowCount) * 100;

    return `${percent}%`;
  }

  resizeRow(rowNode, height) {
    rowNode.style.height = `${height}px`;
    rowNode.childNodes[0].style.height = `${height}px`;
    rowNode.childNodes[1].style.height = `${height}px`;
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

  handleResize() {
    const rootNode = React.findDOMNode(this);
    const headerNode = this.getHeaderNode(rootNode);
    const rowNodes = this.getRowNodes(rootNode);
    const height = headerNode ? rootNode.clientHeight - headerNode.clientHeight : rootNode.clientHeight;
    let top = this.getRowTop(headerNode);

    for (let i = 0; i < rowNodes.length; i++) {
      if (i !== rowNodes.length - 1) {
        const rowHeight = Math.floor(height / rowNodes.length);
        rowNodes[i].style.top = `${top}px`;
        this.resizeRow(rowNodes[i], rowHeight);
        top += (rowHeight - 1);
      } else {
        rowNodes[i].style.top = `${top}px`;
        rowNodes[i].style.bottom = '0px';
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
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
              <td>Sunday</td>
              <td>Monday</td>
              <td>Tuesday</td>
              <td>Wednesday</td>
              <td>Thursday</td>
              <td>Friday</td>
              <td>Saturday</td>
            </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return row;
  }

  render() {
    let rowCount = this.getRowCount();
    const tableClassName = classNames('full-width', 'full-height', 'calendar-mv-position');
    const tableClassName2 = classNames('full-width', 'full-height', 'calendar-mv-bg-position');
    const tableCellClassName = classNames('calendar-mv-cell');
    const tableCellBackgroundClassName = classNames('calendar-mv-bg-cell');
    const calendarClassName = classNames('calendar-mv-container');
    const calendarContainerName = classNames('calendar-mv-row-container');
    const month = this.props.month.clone().startOf('month').day('Sunday');
    const month2 = this.props.month.clone().startOf('month').day('Sunday');
    const tableRow = classNames('calendar-mv-row');
    const weekRow = this.getWeekRow();

    return (
      <div className={calendarClassName}>
        {weekRow}
        <div className={calendarContainerName}>
          {Array(rowCount).fill().map((data, i) => {
            return (
              <div className={tableRow}
                   style={{top: this.getPercent(i, rowCount)}}>
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
};

CalendarMonthView.defaultProps = {
  forceSixWeek: false,
  showWeekHeader: true,
};

module.exports = CalendarMonthView;
