"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _query = require("./query");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Station =
/*#__PURE__*/
function () {
  function Station(station) {
    _classCallCheck(this, Station);

    this.station = station;
    return this;
  }
  /**
   * Station by Name
   * /station/{station_name}
   * @param {String} station
   * {Station}
   */

  /**
  * Station Current Song
  * /station/{station_name}/current_song
  * @param {String} station
  * {Song}
  */


  _createClass(Station, [{
    key: "currentSong",
    value: function currentSong() {
      var url = "".concat(this.station, "/current_song");
      return (0, _query.query)(url);
    }
  }, {
    key: "lastSong",

    /**
     * Station Last Song
     * /station/{station_name}/last_song
     * @param {String} station
     * {Song}
     */
    value: function lastSong() {}
  }, {
    key: "schedule",

    /**
     * Station Schedule
     * /station/{station_name}/schedule
     * @param {String} station
     * [{Schedule}]
     */
    value: function schedule() {}
  }, {
    key: "playlists",

    /**
     * Station Playlists
     * /station/{station_name}/playlists
     * @param {String} station
     * [{Playlist}, ...]
     */
    value: function playlists() {}
  }, {
    key: "listeners",

    /**
     * Station Listeners
     * /station/{station_name}/listeners
     * Integer
     */
    value: function listeners() {}
  }, {
    key: "nextArtist",

    /**
     * Station Next Artists
     * /station/{station_name}/next_artists
     * @param {String} station
     * [{artist:{name:String}}, ...]
     */
    value: function nextArtist() {}
  }, {
    key: "currentSong",
    get: function get() {
      return this.currentSong();
    }
  }, {
    key: "lastSong",
    get: function get() {
      return this.lastSong();
    }
  }, {
    key: "schedule",
    get: function get() {
      return this.schedule();
    }
  }, {
    key: "playlists",
    get: function get() {
      return this.playlists();
    }
  }, {
    key: "listeners",
    get: function get() {
      return this.listeners();
    }
  }]);

  return Station;
}();

exports.default = Station;