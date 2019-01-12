import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


const propTypes = {
  firstDay: PropTypes.object.isRequired,
  numberOfDays: PropTypes.number.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  dayFormat: PropTypes.string.isRequired,
  columnDimensions: PropTypes.array.isRequired,
};

export class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
    moment.locale('fr'); // TODO : make it work
  }

  shouldComponentUpdate(nextProps) {
    // for columnDimensions return new object
    return nextProps.numberOfDays !== this.props.numberOfDays || !nextProps.firstDay.isSame(this.props.firstDay, 'day')
    || nextProps.columnDimensions !== this.props.columnDimensions;
  }

  render() {
    const {
      firstDay,
      numberOfDays,
      dayFormat,
      columnDimensions,
    } = this.props;

    const HeaderCell = this.props.headerCellComponent;

    if (columnDimensions.length === 0) {
      return null;
    }

    const weekdayColumns = [];

    for (let i = 0; i < numberOfDays; i += 1) {
      const date = moment(firstDay).locale('fr').add(i, 'd');
      const width = `${100 / numberOfDays}%`;
      const newCell = (
        <div key={i} className="weekCalendar__headerColumn" style={{ width }}>
          <HeaderCell date={date} dayFormat={dayFormat} />
        </div>
      );
      weekdayColumns.push(newCell);
    }

    return (
      <div className="weekCalendar__headerWrapper">
        {weekdayColumns}
      </div>);
  }
}

CalendarHeader.propTypes = propTypes;

export default CalendarHeader;
