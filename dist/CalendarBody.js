'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _DayColumn = require('./DayColumn');

var _DayColumn2 = _interopRequireDefault(_DayColumn);

var _Utils = require('./Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  firstDay: _propTypes2.default.object.isRequired,
  numberOfDays: _propTypes2.default.number.isRequired,
  scaleUnit: _propTypes2.default.number.isRequired,
  scaleIntervals: _propTypes2.default.array.isRequired,
  getCellHeight: _propTypes2.default.func.isRequired,
  dayCellComponent: _propTypes2.default.func.isRequired,
  onSelectionStart: _propTypes2.default.func.isRequired,
  onCellMouseEnter: _propTypes2.default.func.isRequired
};

var CalendarBody = function (_React$Component) {
  _inherits(CalendarBody, _React$Component);

  function CalendarBody(props) {
    _classCallCheck(this, CalendarBody);

    var _this = _possibleConstructorReturn(this, (CalendarBody.__proto__ || Object.getPrototypeOf(CalendarBody)).call(this, props));

    _this.cellRef = _react2.default.createRef();
    return _this;
  }

  _createClass(CalendarBody, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // get cell height => TODO : not required anymore
      var cellHeight = this.cellRef.clientHeight;
      this.props.getCellHeight(cellHeight);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.scaleUnit !== this.props.scaleUnit || nextProps.numberOfDays !== this.props.numberOfDays || !nextProps.firstDay.isSame(this.props.firstDay, 'day');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          firstDay = _props.firstDay,
          numberOfDays = _props.numberOfDays,
          scaleUnit = _props.scaleUnit,
          scaleIntervals = _props.scaleIntervals,
          dayCellComponent = _props.dayCellComponent;


      var weekdayColumns = [];
      for (var i = 0; i < numberOfDays; i += 1) {
        var day = (0, _moment2.default)(firstDay).add(i, 'd');
        var intervals = (0, _Utils.getDayIntervals)(day, scaleIntervals);
        weekdayColumns.push(_react2.default.createElement(_DayColumn2.default, {
          key: i,
          colPos: i,
          getCellRef: i === 0 ? function (el) {
            _this2.cellRef = el;
          } : function () {},
          dayCellComponent: dayCellComponent,
          scaleUnit: scaleUnit,
          dayIntervals: intervals,
          onSelectionStart: this.props.onSelectionStart,
          onCellMouseEnter: this.props.onCellMouseEnter,
          getCellHeight: function getCellHeight(height) {
            return _this2.getCellHeight(height);
          }
        }));
      }

      return _react2.default.createElement(
        'div',
        { className: 'calendarBody' },
        _react2.default.createElement(
          'div',
          { className: 'calendarBody__row' },
          weekdayColumns
        )
      );
    }
  }]);

  return CalendarBody;
}(_react2.default.Component);

CalendarBody.propTypes = propTypes;

exports.default = CalendarBody;