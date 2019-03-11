import '@babel/polyfill'
import axios from 'axios'

import Station from '../src/station'

describe( 'station class', () => {
    var eins = new Station('eins')

    it( 'returns info', async () => {
        const info = await eins.info()
        expect(info).toEqual(expect.any(Object))
        expect(info.name).toEqual('eins')
    } )
    it( 'returns current song', async () => {
        const currentSong = await eins.currentSong()
        expect(currentSong).toEqual(expect.any(Object))
    } )
    it( 'returns last song', async () => {
        const lastSong = await eins.lastSong()
        expect(lastSong).toEqual(expect.any(Object))
    } )
    it( 'returns schedule', async () => {
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
        const listeners = await eins.listeners()
        expect(listeners).toEqual(expect.any(Number))
    } )
    it( 'returns next artists', async () => {
        const nextArtists = await eins.nextArtists()
        expect(nextArtists).toEqual(expect.arrayContaining([expect.any(String)]))
    } )
} )

describe( 'accessing with getters', () => {
    it( 'gets data', async () => {
        const zwo = await new Station('eins').init()
        expect(zwo.name).toBe('eins')
        expect(zwo.position).toEqual(expect.any(Number))
    } )
} )
