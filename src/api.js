    /**
     * Server Status
     * /server_status
     * {running: Boolean, message: String}
     */
    export const isServerRunning = function() {}

    /**
     * Server Time
     * /time
     * String
     */

    export const serverTime = function() {}

    /**
     * Letters
     * /letters
     * []
     */

    export const letters = function() {}
    
    export const hasLetter = function(letter) {}

    /**
     * Genres
     * /genres
     * [{name: String, score: Integer, related:[Strig]}, ...]
     */

    export const genres = function() {}

    export const relatedGenres = function(genre) {}

    /**
     * Station Names
     * /station_names
     * [String, ...]
     */

    export const stationNames = function() {}

    export const hasStation = function(station) {}

    /**
     * Listeners
     * /listeners
     * {"StationName"(key): Integer, ...}
     */

    export const allListeners = function() {}

    export const listeners = function(station) {}

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

    export const liveStations = function() {}

    export const stationIsLive = function(station) {}

    export const numLiveStations = function() {}

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

    export const stations = function(stations, options) {}

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

    export const stationStartsWith = function(startw, options) {}

    /**
     * Stations by Genre 
     * /stations/genre/{genre}
     * @param {Integer} limit
     * @param {Integer} offset
     * @param {Float} lat 
     * @param {Float} long
     * @param {String} genre [\w\d\-]+
     */

    export const stationsByGenre = function(genre, options) {}

    /**
     * Search
     * (?-mix:\A\/station\/([\w\d_\-]+)\/images\/([\w\d_\-]+)\Z)
     */
