import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
  date: PropTypes.object.isRequired,
  dayFormat: PropTypes.string.isRequired,
};


class HeaderCell extends React.PureComponent {
  constructor(props) {
    super(props);
    moment.locale('fr'); // TODO : make it work
  }

  render() {
    const {
      date,
      dayFormat,
    } = this.props;
    return (<span className="title">{date.format(dayFormat)}</span>);
  }
}

HeaderCell.propTypes = propTypes;
export default HeaderCell;
