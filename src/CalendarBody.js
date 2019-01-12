import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DayColumn from './DayColumn';
import { getDayIntervals } from './Utils';

const propTypes = {
  firstDay: PropTypes.object.isRequired,
  numberOfDays: PropTypes.number.isRequired,
  scaleUnit: PropTypes.number.isRequired,
  scaleIntervals: PropTypes.array.isRequired,
  getCellHeight: PropTypes.func.isRequired,
  dayCellComponent: PropTypes.func.isRequired,
  onSelectionStart: PropTypes.func.isRequired,
  onCellMouseEnter: PropTypes.func.isRequired,
};

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);
    this.cellRef = React.createRef();
  }

  componentDidMount() {
    // get cell height => TODO : not required anymore
    const cellHeight = this.cellRef.clientHeight;
    this.props.getCellHeight(cellHeight);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.scaleUnit !== this.props.scaleUnit
      || nextProps.numberOfDays !== this.props.numberOfDays
      || !nextProps.firstDay.isSame(this.props.firstDay, 'day');
  }

  render() {
    const {
      firstDay,
      numberOfDays,
      scaleUnit,
      scaleIntervals,
      dayCellComponent,
    } = this.props;

    const weekdayColumns = [];
    for (let i = 0; i < numberOfDays; i += 1) {
      const day = moment(firstDay).add(i, 'd');
      const intervals = getDayIntervals(day, scaleIntervals);
      weekdayColumns.push(<DayColumn
        key={i}
        colPos={i}
        getCellRef={i === 0 ? (el) => { this.cellRef = el; } : () => {}}
        dayCellComponent={dayCellComponent}
        scaleUnit={scaleUnit}
        dayIntervals={intervals}
        onSelectionStart={this.props.onSelectionStart}
        onCellMouseEnter={this.props.onCellMouseEnter}
        getCellHeight={height => this.getCellHeight(height)}
      />);
    }

    return (
      <div className="calendarBody" >
        <div className="calendarBody__row">
          {weekdayColumns}
        </div>
      </div>
    );
  }
}

CalendarBody.propTypes = propTypes;

export default CalendarBody;
