"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stationsByGenre = exports.stationStartsWith = exports.stations = exports.numLiveStations = exports.stationIsLive = exports.liveStations = exports.listeners = exports.allListeners = exports.hasStation = exports.stationNames = exports.relatedGenres = exports.genres = exports.hasLetter = exports.letters = exports.serverTime = exports.isServerRunning = void 0;

/**
 * Server Status
 * /server_status
 * {running: Boolean, message: String}
 */
var isServerRunning = function isServerRunning() {};
/**
 * Server Time
 * /time
 * String
 */


exports.isServerRunning = isServerRunning;

var serverTime = function serverTime() {};
/**
 * Letters
 * /letters
 * []
 */


exports.serverTime = serverTime;

var letters = function letters() {};

exports.letters = letters;

var hasLetter = function hasLetter(letter) {};
/**
 * Genres
 * /genres
 * [{name: String, score: Integer, related:[Strig]}, ...]
 */


exports.hasLetter = hasLetter;

var genres = function genres() {};

exports.genres = genres;

var relatedGenres = function relatedGenres(genre) {};
/**
 * Station Names
 * /station_names
 * [String, ...]
 */


exports.relatedGenres = relatedGenres;

var stationNames = function stationNames() {};

exports.stationNames = stationNames;

var hasStation = function hasStation(station) {};
/**
 * Listeners
 * /listeners
 * {"StationName"(key): Integer, ...}
 */


exports.hasStation = hasStation;

var allListeners = function allListeners() {};

exports.allListeners = allListeners;

var listeners = function listeners(station) {};
/**
 * Teaser
 * /teaser
 * [{headline: String, schedule:[], link:String, img_l: String, img_m: String, img_s: String}, ...]
 */

/**
 * Live Stations
 * /stations/live
 * [{Station}, ...]
 */


exports.listeners = listeners;

var liveStations = function liveStations() {};

exports.liveStations = liveStations;

var stationIsLive = function stationIsLive(station) {};

exports.stationIsLive = stationIsLive;

var numLiveStations = function numLiveStations() {};
/**
 * Song Change JSON Stream
 * /song_change.stream.json
 */

/**
 * Song Change WebSocket
 * /song_change.ws.json
 */

/**
 * Song Change Chunks (last 50)
 * /song_change.chunk.json
 * {Song, ...}
 */

/**
 * Stations
 * /stations
 * @param {Integer} limit
 * @param {Integer} offset
 * @param {Float} lat 
 * @param {Float} long
 * [{Station}, ...]
 *
 * Stations by name
 * /stations/{comma_separated_station_names}
 * @param {Float} lat 
 * @param {Float} long
 * @param {String,...} station(s)
 */


exports.numLiveStations = numLiveStations;

var stations = function stations(_stations, options) {};
/**
 * Stations by Letters
 * /stations/letter/{letter}
 * @param {Integer} limit
 * @param {Integer} offset
 * @param {Float} lat 
 * @param {Float} long
 * @param {String} letter [a-z]
 *
 * Stations Beginning with Numbers
 * /stations/numbers
 * @param {Integer} limit
 * @param {Integer} offset
 * @param {Float} lat 
 * @param {Float} long
 */


exports.stations = stations;

var stationStartsWith = function stationStartsWith(startw, options) {};
/**
 * Stations by Genre 
 * /stations/genre/{genre}
 * @param {Integer} limit
 * @param {Integer} offset
 * @param {Float} lat 
 * @param {Float} long
 * @param {String} genre [\w\d\-]+
 */


exports.stationStartsWith = stationStartsWith;

var stationsByGenre = function stationsByGenre(genre, options) {};
/**
 * Search
 * (?-mix:\A\/station\/([\w\d_\-]+)\/images\/([\w\d_\-]+)\Z)
 */


exports.stationsByGenre = stationsByGenre;