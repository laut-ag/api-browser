"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("regenerator-runtime/runtime");

var _query = require("./query");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Station =
/*#__PURE__*/
function () {
  function Station(station) {
    _classCallCheck(this, Station);

    this.baseurl = "station/".concat(station);
  }
  /**
   * Station by Name
   * 
   * {Station}
   * @return {Promise}
   */


  _createClass(Station, [{
    key: "info",
    value: function () {
      var _info = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = "".concat(this.baseurl);
                _context.next = 3;
                return (0, _query.query)(url);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function info() {
        return _info.apply(this, arguments);
      }

      return info;
    }()
    /**
    * Station Current Song
    *
    * {Song}
    * @return {Promise}
    */

  }, {
    key: "currentSong",
    value: function () {
      var _currentSong = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var url;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = "".concat(this.baseurl, "/current_song");
                _context2.next = 3;
                return (0, _query.query)(url);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function currentSong() {
        return _currentSong.apply(this, arguments);
      }

      return currentSong;
    }()
    /**
     * Station Last Song
     *
     * {Song}
     * @return {Promise}
     */

  }, {
    key: "lastSong",
    value: function () {
      var _lastSong = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var url;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = "".concat(this.baseurl, "/last_song");
                _context3.next = 3;
                return (0, _query.query)(url);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function lastSong() {
        return _lastSong.apply(this, arguments);
      }

      return lastSong;
    }()
    /**
     * Station Schedule
     *
     * [{Schedule}]
     * @return {Promise}
     */

  }, {
    key: "schedule",
    value: function () {
      var _schedule = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var url;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                url = "".concat(this.baseurl, "/schedule");
                _context4.next = 3;
                return (0, _query.query)(url);

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function schedule() {
        return _schedule.apply(this, arguments);
      }

      return schedule;
    }()
    /**
     * Station Playlists
     *
     * [{Playlist}, ...]
     * @return {Promise}
     */

  }, {
    key: "playlists",
    value: function () {
      var _playlists = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var url;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                url = "".concat(this.baseurl, "/playlists");
                _context5.next = 3;
                return (0, _query.query)(url);

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function playlists() {
        return _playlists.apply(this, arguments);
      }

      return playlists;
    }()
    /**
     * Station Listeners
     * 
     * Integer
     * @return {Promise}
     */

  }, {
    key: "listeners",
    value: function () {
      var _listeners = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var url;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                url = "".concat(this.baseurl, "/listeners");
                _context6.next = 3;
                return (0, _query.query)(url);

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function listeners() {
        return _listeners.apply(this, arguments);
      }

      return listeners;
    }()
    /**
     * Station Next Artists
     *
     * [{artist:{name:String}}, ...]
     * @return {Promise}
     */

  }, {
    key: "nextArtist",
    value: function () {
      var _nextArtist = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var url;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                url = "".concat(this.baseurl, "/next_artists");
                _context7.next = 3;
                return (0, _query.query)(url);

              case 3:
                return _context7.abrupt("return", _context7.sent);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function nextArtist() {
        return _nextArtist.apply(this, arguments);
      }

      return nextArtist;
    }()
  }]);

  return Station;
}();

exports.default = Station;