import { query } from './query'

export default class Station {
    constructor(station) {
        this.baseurl = `station/${station}`
        this.genData = {}
    }

    async init() {
        this.genData = await this.info()
        return this
    }

    /**
     * Station by Name
     * 
     * {Station}
     * @return {Promise}
     */
    async info() {
        const url = `${this.baseurl}`
        return await query(url)
    }

     /**
     * Station Current Song
     *
     * {Song}
     * @return {Promise}
     */
    async currentSong() {
        const url = `${this.baseurl}/current_song`
        return await query(url)
    }

    /**
     * Station Last Song
     *
     * {Song}
     * @return {Promise}
     */
    async lastSong() {
        const url = `${this.baseurl}/last_songs`
        return await query(url)
    }

    /**
     * Station Schedule
     *
     * [{Schedule}]
     * @return {Promise}
     */
    async schedule() {
        const url = `${this.baseurl}/schedule`
        return await query(url)
    }

    /**
     * Station Playlists
     *
     * [{Playlist}, ...]
     * @return {Promise}
     */
    async playlists() {
        const url = `${this.baseurl}/playlists`
        return await query(url)
    }

    /**
     * Station Listeners
     * 
     * Integer
     * @return {Promise}
     */
    async listeners() {
        const url = `${this.baseurl}/listeners`
        return await query(url)
    }

    /**
     * Station Next Artists
     *
     * [{artist:{name:String}}, ...]
     * @return {Promise}
     */
    async nextArtists() {
        const url = `${this.baseurl}/next_artists`
        const resp = await query(url)
        return resp.map( item => item.artist.name )
    }

    /**
     * Subset of Genres
     *
     * Returns the specified number of genres. Will not
     * throw an error if more genres are requested then
     * are present
     *
     * @param {number} count
     * @return {array.<string>}
     */
    genresC ( count ) { return this.genData.genres.slice(0,count) }

    /**
     * Select image size
     *
     * Returns the image based on type and size/orientation
     *
     * @param {string} type 'station'|'background'
     * @param {string} size 'sm'|'md'|'lg' 'portrait'|'landscape'
     * @return {string}
     */
    imagesSize ( type, size = '' ) {
        switch (type) {
            case 'station':
            switch (size) {
                case 'sm':
                    return this.genData.images.station_80x80
                    break;
                case 'md':
                    return this.genData.images.station_120x120
                    break;
                case 'lg':
                    return this.genData.images.station_640x640
                    break;
                default:
                    return this.genData.images.station
                    break;
            }
            case 'background':
            switch (size) {
                case 'portrait':
                    return this.genData.images.background_768x1024
                    break;
                case 'landscape':
                    return this.genData.images.background_1024x768
                    break;
                default:
                    return this.genData.background
                    break;
            }
        }
    }

    get name() { return this.genData.name }
    get displayName() { return this.genData.display_name }
    get pageUrl() { return this.genData.page_url }
    get streamUrl() { return this.genData.stream_url }
    get format() { return this.genData.format }
    get description() { return this.genData.description }
    get djs() { return this.genData.djs }
    get location() { return this.genData.location }
    get latLong() {
        const lat = this.genData.lat
        const lng = this.genData.lng
        return [lat,lng]
    }
    get color() { return this.genData.color }
    get updatedAt() { return this.genData.updated_at }
    get genres() { return this.genData.genres }
    get active() { return this.genData.active }
    get skillName() { return this.genData.third_parties.amazon.skill_name }
    get invocationName() { return this.genData.third_parties.amazon.invocation_name }
    get facebook() { return this.genData.third_parties.facebook.page }
    get twitterName() { return this.genData.twitter }
    get twitterUrl() { return this.genData.third_parties.twitter.name }
    get website() { return this.genData.third_parties.website.url }
    get images() { return this.genData.images }
    get currentPlaylist() { return this.genData.current_playlist }
    get nextPlaylist() { return this.genData.next_playlists }
    get topArtists() { return this.genData.top_artists }
    get position() { return this.genData.position }

    static count( count ) {
        this.slice(count)
    }
}
