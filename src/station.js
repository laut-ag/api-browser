import { query } from './query'

export default class Station {
    constructor(station) {
        this.baseurl = `station/${station}`
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
        const url = `${this.baseurl}/last_song`
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
    async nextArtist() {
        const url = `${this.baseurl}/next_artists`
        return await query(url)
    }
}
