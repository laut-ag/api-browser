class Api {
    constructor() {
        return
    }

    /**
     * Server Status
     * /server_status
     * {running: Boolean, message: String}
     */

    /**
     * Server Time
     * /time
     * String
     */

    /**
     * Letters
     * /letters
     * []
     */

    /**
     * Genres
     * /genres
     * [{name: String, score: Integer, related:[Strig]}, ...]
     */

    /**
     * Station Names
     * /station_names
     * [String, ...]
     */

    /**
     * Listeners
     * /listeners
     * {"StationName"(key): Integer, ...}
     */

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
     */

    /**
     * Stations by Letters
     * /stations/letter/{letter}
     * @param {Integer} limit
     * @param {Integer} offset
     * @param {Float} lat 
     * @param {Float} long
     * @param {String} letter [a-z]
     */

    /**
     * Stations Beginning with Numbers
     * /stations/numbers
     * @param {Integer} limit
     * @param {Integer} offset
     * @param {Float} lat 
     * @param {Float} long
     */

    /**
     * Stations by Genre 
     * /stations/genre/{genre}
     * @param {Integer} limit
     * @param {Integer} offset
     * @param {Float} lat 
     * @param {Float} long
     * @param {String} genre [\w\d\-]+
     */

    /**
     * Stations by name
     * /stations/{comma_separated_station_names}
     * @param {Float} lat 
     * @param {Float} long
     * @param {String,...} station(s)
     */

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

    /**
     * Station Last Song
     * /station/{station_name}/last_song
     * @param {String} station
     * {Song}
     */

    /**
     * Station Schedule
     * /station/{station_name}/schedule
     * @param {String} station
     * [{Schedule}]
     */

    /**
     * Station Playlists
     * /station/{station_name}/playlists
     * @param {String} station
     * [{Playlist}, ...]
     */

    /**
     * Station Listeners
     * /station/{station_name}/listeners
     * Integer
     */

    /**
     * Station Next Artists
     * /station/{station_name}/next_artists
     * @param {String} station
     * [{artist:{name:String}}, ...]
     */

    /**
     * Search
     * (?-mix:\A\/station\/([\w\d_\-]+)\/images\/([\w\d_\-]+)\Z)
     */
}
