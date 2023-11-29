"use strict";

var _core = _interopRequireDefault(require("../../node_modules/@event-calendar/core"));
var _interaction = _interopRequireDefault(require("../../node_modules/@event-calendar/interaction"));
var _timeGrid = _interopRequireDefault(require("../../node_modules/@event-calendar/time-grid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
document.addEventListener("DOMContentLoaded", function () {
  var ec = new _core["default"]({
    target: document.getElementById('ec'),
    props: {
      plugins: [_timeGrid["default"]],
      options: {
        view: 'timeGridWeek',
        events: [
          // your list of events
        ]
      }
    }
  });
});