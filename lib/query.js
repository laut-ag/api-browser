"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _querystring = _interopRequireDefault(require("querystring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var query =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(url) {
    var params,
        responseType,
        timeout,
        baseURL,
        response,
        data,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            responseType = 'json';
            timeout = 2000;
            baseURL = 'http://api.laut.fm/';
            _context.prev = 4;
            _context.next = 7;
            return (0, _axios.default)({
              method: 'get',
              baseURL: baseURL,
              url: url,
              responseType: responseType,
              params: params,
              timeout: timeout
            });

          case 7:
            response = _context.sent;
            _context.next = 10;
            return response.data;

          case 10:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            throw _context.t0;

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 14]]);
  }));

  return function query(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.query = query;