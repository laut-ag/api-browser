"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "genres", {
  enumerable: true,
  get: function get() {
    return _api.genres;
  }
});

var _api = require("./api.js");