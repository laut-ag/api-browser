import { query } from './query'
import type { IOptions } from './query'
import type { IApiGenre, IApiStation } from './types'

/**
 * Gets the boolean value if the server is running
 * or not
 */
export async function isServerRunning(): Promise<boolean> {
    const resp = await query('server_status')
    return resp.running
}

/**
 * Gets the status object of the server
 */
export async function serverStatus(): Promise<{ running: boolean, message: string  }> {
    const resp = await query('server_status')
    return resp
}

/**
 * Gets the time from the server
 */

export async function serverTime(): Promise<string> {
    const resp = await query('time')
    return resp
}

/**
 * Gets unique array of all first letters of stations
 */

export async function letters(): Promise<string[]> {
    const resp = await query('letters')
    return resp
}

/**
 * Determines if any stations starts with a certain letter
 */

export async function hasLetter(letter: string): Promise<boolean> {
    const resp = await query('letters')
    return resp.indexOf(letter) !== -1
}

/**
 * Get all genres available
 */

export async function genres(): Promise<string[]> {
    const resp = await query('genres')
    return resp.map( (g: IApiGenre) => g.name )
}

/**
 * Gets raw object of all genres
 */

export async function genresRaw(): Promise<IApiGenre[]> {
    const resp = await query('genres')
    return resp
}

/**
 * Gets raw genres objects related to another genre
 */

export async function genre(genre: string): Promise<IApiGenre> {
    const resp = await query('genres')
    const selGen = resp.filter( (g: IApiGenre) => g.name === genre )
    return selGen[0]
}

/* Gets all genres related to antother genre
 */

export async function relatedGenres(genre: string): Promise<string[]> {
    const resp = await query('genres')
    const selGen = resp.filter( (g: IApiGenre) => g.name === genre )
    return selGen[0].related
}

/**
 * Gets all station names
 */

export async function stationNames(): Promise<string[]> {
    const resp = await query('station_names')
    return resp
}

/**
 * Indicates if a station exists
 */

export async function hasStation(station: string): Promise<boolean> {
    const resp = await query('station_names')
    return resp.indexOf(station) !== -1
}

/**
 * Gets total number of listeners
 */

export async function allListeners(): Promise<number> {
    const resp = await query('listeners')
    let sum = 0
    for(let key in resp) {
        sum += parseInt(resp[key])
    }
    return sum
}

/**
 * Gets listeners for a particular station
 */

export async function listeners(station: string): Promise<number> {
    const resp = await query('listeners')
    return resp[station]
}

/**
 * Get raw objects of all stations broadcasting live
 */

export async function liveStationsRaw(): Promise<IApiStation[]> {
    const resp = await query('stations/live')
    return resp
}

/**
 * Get names of all stations broadcasting live
 */

export async function liveStations(): Promise<string[]> {
    const resp = await query('stations/live')
    return resp.map( (s: IApiStation) => s.name )
}

/**
 * Determine if a station is currently broadcasting live
 */

export async function stationIsLive(station: string): Promise<boolean> {
    const resp = await query('stations/live')
    return resp.filter( (s: IApiStation) => s.name === station ).length !== 0
}

/**
 * Indicate how many stations are broadcasting live
 */

export async function numLiveStations(): Promise<number> {
    const resp = await query('stations/live')
    return resp.length
}

function assignOptions(options: Partial<IOptions> = {}): Partial<IOptions> | never {
    const allowedKeys = [ 'lat', 'long', 'offset', 'limit' ]
    const copts: Partial<IOptions> = {}
    if(! (options instanceof Object) ) { throw 'not an Object' }
    if( ( options.lat && ! options.long ) || ( options.long && ! options.lat ) ) { throw 'both lat and long are required' }
    for ( const key in options ) {
        if ( allowedKeys.indexOf(key) > -1 ) {
            copts[key] = options[key]
        }
    }
    return copts
}

interface IPaginationInfo {
    total?: number;
    offset?: number;
    limit?: number;
    next_offset?: number;
}

interface IPaginatedResp extends IPaginationInfo {
    items: IApiStation[];
}

type NormalizedPagination = {
    stations: IApiStation[],
    pagination: IPaginationInfo
}

type NormalizedResp = IApiStation[] | NormalizedPagination

function formatResult(resp: IPaginatedResp | IApiStation[]): NormalizedResp {
    if("items" in resp) {
        let {items:stations, ...pagination} = resp
        return {stations, pagination}
    } else {
        return resp
    }
}

/**
 * Gets all Stations
 */

export async function allStations(options: Partial<IOptions> = {}): Promise<NormalizedResp> {
    const cops = assignOptions(options)
    const resp = await query('stations', cops)
    return formatResult(resp)
} 

/**
 * Get stations beginning with a certain letter or number
 */

export async function stationStartsWith(startw: string|number, options: Partial<IOptions> = {}): Promise<NormalizedResp> {
    const cops = assignOptions(options)
    if (typeof startw === 'number' || parseInt(startw)) {
        const resp = await query('/stations/numbers', cops)
        const filteredResults = resp.filter( (s: IApiStation) => s.name[0] == startw )
        return formatResult(filteredResults)
    } else {
        const resp = await query(`stations/letter/${startw}`, cops)
        return formatResult(resp)
    }
}

/**
 * Gets information for specific stations
 */

export async function stations(stations: string[], options: Partial<IOptions> = {}): Promise<IApiStation[]>{
    if ( options.offset || options.limit ) { throw 'can not use limit and/or offset with this list' }
    const cops = assignOptions(options)
    const resp = await query(`stations/${stations}`, cops)
    return resp
}

/**
 * Get all stations of a particular genre
 */

export async function stationsByGenre(genre: string, options: Partial<IOptions> = {}): Promise<NormalizedResp> {
    const cops = assignOptions(options)
    const resp = await query(`stations/genre/${genre}`, cops)
    return formatResult(resp)
}

/**
 * Search
 * (?-mix:\A\/station\/([\w\d_\-]+)\/images\/([\w\d_\-]+)\Z)
 * @todo not implemented yet
 */

/**
 * Song Change JSON Stream
 * /song_change.stream.json
 * @todo not implemented yet
 */

/**
 * Song Change WebSocket
 * /song_change.ws.json
 * @todo not implemented yet
 */

/**
 * Song Change Chunks (last 50)
 * /song_change.chunk.json
 * {Song, ...}
 * @todo not implemented yet
 */

/**
 * Teaser
 * /teaser
 * [{headline: String, schedule:[], link:String, img_l: String, img_m: String, img_s: String}, ...]
 * @todo not implemented yet
 */

