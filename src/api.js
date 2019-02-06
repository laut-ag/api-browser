    /**
     * Server Status
     * /server_status
     * {running: Boolean, message: String}
     */
export const isServerRunning = async function() {
    const resp = await query('server_status')
    return resp.running
}

    /**
     * Server Time
     * /time
     * String
     */

export const serverTime = async function() {
    const resp = await query('time')
    return resp 
}

    /**
     * Letters
     * /letters
     * []
     */

export const letters = async function() {
    const resp = await query('letters')
    return resp 
}
    
export const hasLetter = async function(letter) {
    const resp = await query('letters')
    return resp.indexOf(letter) !== -1
}

    /**
     * Genres
     * /genres
     * [{name: String, score: Integer, related:[Strig]}, ...]
     */

export const genres = async function() {
    const resp = await query('genres')
    return resp.map( g => g.name )
}

export const relatedGenres = async function(genre) {
    const resp = await query('genres')
    const selGen = resp.filter( g => g.name === genre )
    return selGen.related
}

    /**
     * Station Names
     * /station_names
     * [String, ...]
     */

export const stationNames = async function() {
    const resp = await query('station_names')
    return resp
}

export const hasStation = async function(station) {
    const resp = await query('station_names')
    return resp.indexOf(station) !== -1
}

    /**
     * Listeners
     * /listeners
     * {"StationName"(key): Integer, ...}
     */

export const allListeners = async function() {
    const resp = await query('listeners')
    let sum = 0
    for(let key in resp) {
        sum += parseInt(resp[key])
    }
    return sum
}

export const listeners = async function(station) {
    const resp = await query('listeners')
    return resp[station]
}

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

export const liveStations = async function() {
    const resp = await query('stations/live')
    return resp
}

export const stationIsLive = async function(station) {
    const resp = await query('stations/live')
    return resp.filter( s => s.name === station ).length !== 0
}

export const numLiveStations = async function() {
    const resp = await query('stations/live')
    return resp.length
}

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
const assignOptions = function(options){
    const ops = ['limit','offset','lat','long']
    if(! (options instanceof Array) ) { throw }
    if( options.length === 3 ) { throw }
    if( options.filter( o => typeof o === 'number' ).length ) { throw }
    const cleanOb = {}
    options.forEach( (o,index) => cleanOb[ ops[index] ] = o )
    return cleanOb
}

export const stations = function(stations = null, options = []) {
}

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
