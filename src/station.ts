import { query } from './query'
import type{
    IApiStation,
    IApiCurrentSong,
    IApiLastSongs,
    IApiPlaylist,
    IApiScheduleItem,
    IApiImages,
    IApiArtist
} from './types'

/** Class representing a specific station */
export default class Station {
    baseurl: string
    genData: IApiStation|undefined
    /**
     * Create a station object
     * @parem {string} station - the name of a station
     */
    constructor(station: string) {
        this.baseurl = `station/${station}`
        this.genData = undefined
    }

    async init() {
        this.genData = await this.info()
        return this
    }

    /**
     * Gets the basic information about a station
     * 
     * @return {Promise} Object which contains basic station information
     */
    async info(): Promise<IApiStation> {
        const url = `${this.baseurl}`
        return await query(url)
    }

     /**
     * Gets the information for the currently playing song 
     *
     * @return {Promise} Object containing the current song
     */
    async currentSong(): Promise<IApiCurrentSong> {
        const url = `${this.baseurl}/current_song`
        return await query(url)
    }

    /**
     * Gets the information about the last song played
     *
     * @return {Promise} Object containing the last played song
     */
    async lastSong(): Promise<IApiLastSongs> {
        const url = `${this.baseurl}/last_songs`
        return await query(url)
    }

    /**
     * Gets the schedules for a station
     *
     * @return {Promise} An array of schedule objects
     */
    async schedule(): Promise<IApiScheduleItem[]> {
        const url = `${this.baseurl}/schedule`
        return await query(url)
    }

    /**
     * Gets the playlists of a station
     *
     * @return {Promise} An array of playlist objects
     */
    async playlists(): Promise<IApiPlaylist[]>  {
        const url = `${this.baseurl}/playlists`
        return await query(url)
    }

    /**
     * Gets the current number of listeners for a station
     * 
     * @return {Promise} An number representing the number of listeners
     */
    async listeners(): Promise<number> {
        const url = `${this.baseurl}/listeners`
        return await query(url)
    }

    /**
     * Get the next artists who will play on a station
     *
     * @return {Promise} An array of objects in the form {artist: {name: <String>}}
     */
    async nextArtists(): Promise<IApiArtist[]> {
        const url = `${this.baseurl}/next_artists`
        const resp = await query(url)
        return resp.map( (item: { artist: IApiArtist} ) => item.artist.name )
    }

    /**
     * Gets the specified number of genres. Will not
     * throw an error if more genres are requested then
     * are present
     *
     * @param {number} count - the number of genres to return
     * @return {array} An array of strings i.e. genres
     */
    genresByCount ( count: number ): string[] | undefined { return this.genData?.genres.slice(0,count) }

    /**
     * Gets the image based on type and size/orientation
     *
     * @param {string} type - 'station'|'background'
     * @param {string} size - 'sm'|'md'|'lg' 'portrait'|'landscape'
     * @return {string} The URL of the requested image
     */
    imagesSize ( type: "station"|"background", size: "sm"|"md"|"lg"|"portrait"|"landscape"|"" = '' )
    : string | undefined {
        switch (type) {
            case 'station':
            switch (size) {
                case 'sm':
                    return this.genData?.images.station_80x80
                    break;
                case 'md':
                    return this.genData?.images.station_120x120
                    break;
                case 'lg':
                    return this.genData?.images.station_640x640
                    break;
                default:
                    return this.genData?.images.station
                    break;
            }
            case 'background':
            switch (size) {
                case 'portrait':
                    return this.genData?.images.background_768x1024
                    break;
                case 'landscape':
                    return this.genData?.images.background_1024x768
                    break;
                default:
                    return this.genData?.images.background
                    break;
            }
        }
    }

    /**
     * Name of station
     * @returns {string} station name
     */
    get name(): string | undefined { return this.genData?.name }

    /**
     * Display Name of station
     * @returns {string} display name
     */
    get displayName(): string | undefined { return this.genData?.display_name }

    /**
     * URL of station on laut.fm
     * @returns {string} url
     */
    get pageUrl(): string | undefined { return this.genData?.page_url }

    /**
     * URL of station stream
     * @returns {string} url
     */
    get streamUrl(): string | undefined { return this.genData?.stream_url }

    /**
     * Format of the station
     * @returns {string} format
     */
    get format(): string | undefined { return this.genData?.format }

    /**
     * Description of the station
     * @returns {string} description
     */
    get description(): string | undefined { return this.genData?.description }

    /**
     * Djs for the station
     * @returns {string} Djs
     */
    get djs(): string | undefined { return this.genData?.djs }

    /**
     * DJ provided location for station
     * @returns {string} location
     */
    get location(): string | undefined { return this.genData?.location }

    /**
     * Latitude and Longitude of the station
     * @returns{array} [latitude, longitude]
     */
    get latLong(): number[] | undefined {
        const lat = this.genData?.lat
        const lng = this.genData?.lng
        if (lat !== undefined && lng !== undefined) return [lat,lng]
    }

    /**
     * Color of the station in RadioAdmin
     * @returns {string} hex color
     */
    get color(): string | undefined { return this.genData?.color }

    /**
     * Last time the station was updated
     * @returns {Date} update time
     */
    get updatedAt(): string | undefined { return this.genData?.updated_at }

    /**
     * Genres associated with the station
     * @returns {array.<string>} genres
     */
    get genres(): string[] | undefined { return this.genData?.genres }

    /**
     * If the station is currently active
     * @returns {boolean} active
     */
    get active(): boolean { return this.genData?.active || false }

    /**
     * The amazon alexa skill name
     * @returns {string} skill name
     */
    get skillName(): string | undefined { return this.genData?.third_parties?.amazon?.skill_name }

    /**
     * The amazon alexa invocation name
     * @returns {string} invocation name
     */
    get invocationName(): string | undefined { return this.genData?.third_parties?.amazon?.invocation_name }

    /**
     * The facebook page for the station
     * @returns {string} facebook url
     */
    get facebook(): string | undefined { return this.genData?.third_parties?.facebook?.page }

    /**
     * The URL of the twitter account for a station
     * @returns {string} twitter url
     */
    get twitterUrl(): string | undefined { return this.genData?.third_parties?.twitter?.url }

    /**
     * The twitter name associated with the station
     * @returns {string} twitter handle
     */
    get twitterName(): string | undefined { return this.genData?.third_parties?.twitter?.name }

    /**
     * The URL of an external station website
     * @return {string} external station url
     */
    get website(): string | undefined { return this.genData?.third_parties?.website?.url }

    /**
     * The URL of a station on phonostar
     * @return {string} phonostar url
     */
    get phonostarUrl(): string | undefined { return this.genData?.third_parties?.phonostar?.url }

    /**
     * The URL of a station on radio.de
     * @return {string} radio.de url
     */
    get radiodeUrl(): string | undefined { return this.genData?.third_parties?.radiode?.url }

    /**
     * Object containing associated images to a station
     * @returns {object} image size key, image url value
     */
    get images(): IApiImages | undefined { return this.genData?.images }

    /**
     * Object containing information about the currently playing
     * playlist
     *
     * @return {object} current playlist
     */
    get currentPlaylist(): IApiPlaylist | undefined { return this.genData?.current_playlist }

    /**
     * Object containing information about he next playlist
     * @return {object} next playlist
     */
    get nextPlaylist(): IApiPlaylist | undefined { return this.genData?.next_playlists }

    /**
     * The top artists on this station
     * @return {array} artists
     */
    get topArtists(): string[] | undefined { return this.genData?.top_artists }

    /**
     * The current rank of the station
     * @return {number} rank
     */
    get position(): number | undefined { return this.genData?.position }

    // static count( count: number ) {
    //     this.slice(count)
    // }
}
