import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { eins as Eins } from './data/Eins/eins'
import { currentSong as CurrentSong } from './data/Eins/currentSong'
import { lastSongs as LastSongs } from './data/Eins/lastSongs'
import { listeners as Listeners } from './data/Eins/listeners'
import { nextArtists as NextArtists } from './data/Eins/nextArtists'
import { playlists as Playlists } from './data/Eins/playlists'
import { schedule as Schedule } from './data/Eins/schedule'

import Station from '../src/station'

const axiosMock = new MockAdapter(axios)
beforeEach( () => axiosMock.reset() )

describe( 'station class', () => {
    axiosMock.onGet( 'https://api.laut.fm/station/eins' )
        .reply( 200, Eins )

    var eins = new Station('eins')

    it( 'returns info', async () => {
        axiosMock.onGet( 'https://api.laut.fm/station/eins' )
            .reply( 200, Eins )
        const info = await eins.info()
        expect(info).toEqual(expect.any(Object))
        expect(info.name).toEqual('eins')
    } )
    it( 'returns current song', async () => {
        axiosMock.onGet( 'https://api.laut.fm/station/eins/current_song' )
            .reply( 200, CurrentSong )
        const currentSong = await eins.currentSong()
        expect(currentSong).toEqual(expect.any(Object))
    } )
    it( 'returns last song', async () => {
        axiosMock.onGet( 'https://api.laut.fm/station/eins/last_songs' )
            .reply( 200, LastSongs )
        const lastSong = await eins.lastSong()
        expect(lastSong).toEqual(expect.any(Object))
    } )
    it( 'returns schedule', async () => {
        axiosMock.onGet( 'https://api.laut.fm/station/eins/schedule' )
            .reply( 200, Schedule )
        const schedule = await eins.schedule()
        expect(schedule).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                day: expect.any(String),
                hour: expect.any(Number),
                end_time: expect.any(Number),
                description: expect.any(String),
                color: expect.any(String),
                length: expect.any(Number),
                shuffled: expect.any(Boolean),
                    })
        ]))
    } )
    it( 'returns playlists', async () => {
        axiosMock.onGet( 'https://api.laut.fm/station/eins/playlists' )
            .reply( 200, Playlists )
        const playlists = await eins.playlists()
        expect(playlists).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                color: expect.any(String),
                length: expect.any(Number),
                airtimes: expect.arrayContaining([expect.any(Object)])
            })
        ]))
    } )
    it( 'returns listeners', async () => {
        axiosMock.onGet( 'https://api.laut.fm/station/eins/listeners' )
            .reply( 200, Listeners )
        const listeners = await eins.listeners()
        expect(listeners).toEqual(expect.any(Number))
    } )
    it( 'returns next artists', async () => {
        axiosMock.onGet( 'https://api.laut.fm/station/eins/next_artists' )
            .reply( 200, NextArtists)
        const nextArtists = await eins.nextArtists()
        expect(nextArtists).toEqual(expect.arrayContaining([expect.any(String)]))
    } )
} )

describe( 'accessing with getters', () => {
    it( 'gets data', async () => {
        axiosMock.onGet( 'https://api.laut.fm/station/eins' )
            .reply( 200, Eins )
        const einsObject = await new Station('eins').init()
        expect(einsObject.name).toBe('eins')
        expect(einsObject.position).toEqual(expect.any(Number))
    } )
} )
