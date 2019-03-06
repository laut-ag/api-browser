import {query} from './query'

/**
 * Server Status
 * 
 * @returns {promise<boolean>}
 */
export const isServerRunning = async function() {
    const resp = await query('server_status')
    return resp.running
}

/**
 * Gets entire data of server status
 *
 * @returns {promise<object>} {running: Boolean, message: String}
 */
export const serverStatus = async function() {
    const resp = await query('server_status')
    return resp
}

/**
 * Gets time referenced on server
 *
 * @returns {promise<string>}
 */

export const serverTime = async function() {
    const resp = await query('time')
    return resp 
}

/**
 * Gets unique array of all first letters of stations
 *
 * @returns {promise<array>} [String, ...]
 */

export const letters = async function() {
    const resp = await query('letters')
    return resp 
}

/**
 * Determines if any stations starts with a certain letter
 *
 * @param {string} letter
 * @returns {promise<boolean>}
 */
    
export const hasLetter = async function(letter) {
    const resp = await query('letters')
    return resp.indexOf(letter) !== -1
}

/**
 * Get all genres available
 *
 * @returns {promise<array>} [String, ...]
 */

export const genres = async function() {
    const resp = await query('genres')
    return resp.map( g => g.name )
}

/**
 * Gets all raw genres objects
 *
 * @return {promise<array>} [{name: String, score: Integer, related:[Strig]}, ...]
 */

export const genresRaw = async function() {
    const resp = await query('genres')
    return resp
}

/**
 * Gets raw genres objects related to another genre
 *
 * @param {string} an existing genre
 * @returns {promise<array>} {name: String, score: Integer, related:[Strig]}
 */

export const genre = async function(genre) {
    const resp = await query('genres')
    const selGen = resp.filter( g => g.name === genre )
    return selGen[0]
}

/* Gets all genres related to antother genre
 *
 * @param {string} genre an existing genre
 * @returns {promise<array>} [String, ...]
 */

export const relatedGenres = async function(genre) {
    const resp = await query('genres')
    const selGen = resp.filter( g => g.name === genre )
    return selGen[0].related
}

/**
 * Gets all station names
 *
 * @returns {promise<array>} [String, ...]
 */

export const stationNames = async function() {
    const resp = await query('station_names')
    return resp
}

/**
 * Indicates if a station exists
 *
 * @param {string} station
 * @returns {promise<boolean>}
 */

export const hasStation = async function(station) {
    const resp = await query('station_names')
    return resp.indexOf(station) !== -1
}

/**
 * Gets total number of listeners
 *
 * @returns {promise<number>}
 */

export const allListeners = async function() {
    const resp = await query('listeners')
    let sum = 0
    for(let key in resp) {
        sum += parseInt(resp[key])
    }
    return sum
}

/**
 * Gets listeners for a particular station
 *
 * @param {string} station
 * @returns {promise<number>}
 */

export const listeners = async function(station) {
    const resp = await query('listeners')
    return resp[station]
}

/**
 * Get raw objects of all stations broadcasting live
 *
 * @returns {promise<array>} [{Station}, ...]
 */

export const liveStationsRaw = async function() {
    const resp = await query('stations/live')
    return resp
}

/**
 * Get names of all stations broadcasting live
 *
 * @returns {promise<array>} [String, ...]
 */

export const liveStations = async function() {
    const resp = await query('stations/live')
    return resp.map( s => s.name )
}

/**
 * Determine if a station is currently broadcasting live
 *
 * @param {string} station
 * @returns {promise<boolean>}
 */

export const stationIsLive = async function(station) {
    const resp = await query('stations/live')
    return resp.filter( s => s.name === station ).length !== 0
}

/**
 * Indicate how many stations are broadcasting live
 *
 * @returns {promise<number>}
 */

export const numLiveStations = async function() {
    const resp = await query('stations/live')
    return resp.length
}

const assignOptions = function(options = {}){
    const allowedKeys = [ 'lat', 'long', 'offset', 'limit' ]
    if(! (options instanceof Object) ) { throw 'not an Object' }
    if( ( options.lat && ! options.long ) || ( options.long && ! options.lat ) ) { throw 'both lat and long are required' }
    if( options.offset && ! options.limit ) { throw 'offset requires limit' }
    for ( const key in options ) {
        if ( ! allowedKeys.includes( key ) ) { throw `${key} is not an allowed option` }
    }
    return options
}

const formatResult = function(resp){
    if(resp.items) {
        let {items:stations, ...pagination} = resp
        return {stations, pagination}
    } else {
        return resp
    }
}

/**
 * Gets all Stations
 * /stations
 *
 * @param {array.<number>} [options] limit,offset,lat,long
 * @returns {promise<array>} [{Station}, ...]
 */

export const allStations = async function(options) {
    const cops = assignOptions(options)
    const resp = await query('/stations', cops) 
    return formatResult(resp)
} 

/**
 * Get stations beginning with a certain letter or number
 * /stations/letter/{letter}
 * /stations/numbers
 *
 * @param {string|number} startw station starts with
 * @param {array.<number>} [options] limit,offset,lat,long
 * @returns {promise<array>} [{Station}, ...]
 */

export const stationStartsWith = async function(startw, options) {
    const cops = assignOptions(options)
    if (parseInt(startw)) {
        const resp = await query('/stations/numbers', cops)
        const filteredResults = resp.filter( s => s.name[0] == startw )
        return formatResult(filteredResults)
    } else {
        const resp = await query(`/stations/letter/${startw}`, cops)
        return formatResult(resp)
    }
}

/**
 * Gets information for specific stations
 * /stations/commaseparatedlist
 * @todo only two ops here...fix
 *
 * @param {array.<string>} stations
 * @param {array.<number>} [options] lat long
 * @returns {promise<array>} [{Station}, ...]
 */
export const stations = async function(stations, options = {}){
    if ( options.offset || options.limit ) { throw 'can not use limit and/or offset with this list' }
    const cops = assignOptions(options)
    const resp = await query(`stations/${stations}`, cops)
    return resp
}

/**
 * Get all stations of a particular genre
 * /stations/genre/{genre}
 *
 * @param {string} genre [\w\d\-]+
 * @param {array.<number>} options limit,offset,lat,long
 * @returns {promise<array>} [{Station}, ...]
 */

export const stationsByGenre = function(genre, options) {}

    /**
     * Search
     * (?-mix:\A\/station\/([\w\d_\-]+)\/images\/([\w\d_\-]+)\Z)
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
     * Teaser
     * /teaser
     * [{headline: String, schedule:[], link:String, img_l: String, img_m: String, img_s: String}, ...]
     */

