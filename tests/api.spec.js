import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as api from '../src/api.js'
import { serverStatus as Status } from './data/serverStatus'
import { time } from './data/time'
import { letters as Letters } from './data/letters'
import { genres as Genres } from './data/genres'
import { liveStations as LiveStations } from './data/liveStations'
import { stations } from './data/stations'
import { stationNames } from './data/stationNames'
import { listeners as Listeners } from './data/listeners'
import { stationsStartW } from './data/stationsStartW'
import { stationsStartNumbers } from './data/stationsStartNumbers'
import { einsHayom } from './data/einsHayom'
import { stationsOffset } from './data/stationsOffset'
import { stationsEOffset } from './data/stationsEOffset'

describe.only( '', () => {
    const errorModel = {}
    const axiosMock = new MockAdapter(axios)
    beforeEach( () => axiosMock.reset() )

    describe( 'server status', () => {

        it( 'returns server status', async () => {
            axiosMock.onGet( 'https://api.laut.fm/server_status' )
                .reply( 200, Status )
           const serverRunning = await api.isServerRunning()
            expect(serverRunning).toEqual(expect.any(Boolean))
        } )
        it( 'returns full server status', async () => {
            axiosMock.onGet( 'https://api.laut.fm/server_status' )
                .reply( 200, Status )
            const serverStatus = await api.serverStatus()
            expect(serverStatus).toEqual({
                message: expect.any(String),
                running: expect.any(Boolean)
            })
        } )

    } )

    describe( 'server time', () => {
        it( 'returns the server time', async () => {
            axiosMock.onGet( 'https://api.laut.fm/time' )
                .reply( 200, time )
            const serverTime = await api.serverTime()
            expect(serverTime).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \+\d\d00/)
        } )
    } )

    describe( 'letter functions', () => {
        it( 'returns all first letters available in api', async () => {
            axiosMock.onGet( 'https://api.laut.fm/letters' )
                .reply( 200, Letters )
            const letters = await api.letters()
            expect(letters).toEqual(
                expect.arrayContaining([
                    expect.any(String)
                ] )
            )
        } )
        it( 'returns true when letter exists', async () => {
            axiosMock.onGet( 'https://api.laut.fm/letters' )
                .reply( 200, Letters )
            const hasLettertrue = await api.hasLetter('a')
            expect(hasLettertrue).toBe(true)
        } )
        it( 'returns false when letter doesnt exist', async () => {
            axiosMock.onGet( 'https://api.laut.fm/letters' )
                .reply( 200, Letters )
            const hasLetterfalse = await api.hasLetter(1)
            expect(hasLetterfalse).toBe(false)
        } )
    } )

    describe( 'genre function', () => {
        it( 'returns an array of genres', async () => {
            axiosMock.onGet( 'https://api.laut.fm/genres' )
                .reply( 200, Genres )
            const genres = await api.genres()
            expect(genres).toContainEqual(expect.any(String))
        } )
        it( 'returns an array of raw genres', async () => {
            axiosMock.onGet( 'https://api.laut.fm/genres' )
                .reply( 200, Genres )
            const genresRaw = await api.genresRaw()
            expect(genresRaw).toEqual(
                expect.arrayContaining([
                    {
                        name: expect.any(String),
                        score: expect.any(Number),
                        related: expect.arrayContaining([expect.any(String)]),
                    }
                ])
            )
        } )
        it( 'returns an array of info for spec genre', async () => {
            axiosMock.onGet( 'https://api.laut.fm/genres' )
                .reply( 200, Genres )
            const genre = await api.genre('Rock')
            expect(genre).toEqual(
                expect.objectContaining(
                    {
                        name: expect.any(String),
                        score: expect.any(Number),
                        related: expect.arrayContaining([expect.any(String)]),
                    }
                )
            )
        } )
        it( 'returns an array of related genres', async () => {
            axiosMock.onGet( 'https://api.laut.fm/genres' )
                .reply( 200, Genres )
            const relatedGenres = await api.relatedGenres('Rock')
            expect(relatedGenres).toEqual(
                expect.arrayContaining([expect.any(String)])
            )
        } )
    } )

    describe( 'live stations', () => {
        it( 'returns array of raw data for live stations', async () => {} )
        it( 'returns array of station names currently live', async () => {
            axiosMock.onGet( 'https://api.laut.fm/stations/live' )
                .reply( 200, LiveStations )
            const liveStations = await api.liveStations()
            expect(liveStations).toEqual(expect.arrayContaining([expect.any(String)]))
        } )
        it( 'returns Boolean for a station broadcasting live or not', async () => {
            axiosMock.onGet( 'https://api.laut.fm/stations/live' )
                .reply( 200, LiveStations )
            const isLive = await api.stationIsLive('eins')
            expect(isLive).toEqual(expect.any(Boolean))
        } )
        it( 'returns number of stations broadcasting live', async () => {
            axiosMock.onGet( 'https://api.laut.fm/stations/live' )
                .reply( 200, LiveStations )
            const numLiveStations = await await api.numLiveStations()
            expect(numLiveStations).toEqual(expect.any(Number))
        } )
   } )
 
    describe( 'station specific functions', () => {
        it( 'returns an array of all stations', async () => {
            axiosMock.onGet( 'https://api.laut.fm/station_names' )
                .reply( 200, stationNames )
            const stations = await api.stationNames()
            expect(stations).toEqual(expect.arrayContaining([expect.any(String)]))
        } )
        it( 'returns true for a station that exists', async () => {
            axiosMock.onGet( 'https://api.laut.fm/station_names' )
                .reply( 200, stationNames )
            const hasStationTrue = await api.hasStation('eins')
            expect(hasStationTrue).toBe(true)
        } )
        it( 'returns false for a station that does not exist', async () => {
            axiosMock.onGet( 'https://api.laut.fm/station_names' )
                .reply( 200, stationNames )
            const hasStationFalse = await api.hasStation('foo')
            expect(hasStationFalse).toBe(false)
        } )
        it( 'returns the number of listeners for a single station', async () => {
            axiosMock.onGet( 'https://api.laut.fm/listeners' ).reply( 200, Listeners )
            const listeners = await api.listeners('eins')
            expect(listeners).toEqual(expect.any(Number))
        } )
    } )

    it( 'returns total number of listeners online', async () => {
        axiosMock.onGet( 'https://api.laut.fm/listeners' )
            .reply( 200, Listeners )
        const listeners = await api.allListeners()
        expect(listeners).toEqual(expect.any(Number))
    } )

    describe( 'aggregate station functions', () => {
        it( 'returns all stations', async () => {
            axiosMock.onGet( 'https://api.laut.fm/stations' )
                .reply( 200, stations )
            const allStations = await api.allStations()
            expect(allStations).toEqual(expect.arrayContaining([expect.any(Object)]))
        } )
        it( 'returns all stations with pagination', async () => {
            axiosMock.onGet( 'https://api.laut.fm/stations', { limit: 5, offset: 10 } )
                .reply( 200, stationsOffset )
            const allStations = await api.allStations({offset:10,limit:5})
            expect(allStations).toEqual(expect.objectContaining({
                stations: expect.arrayContaining([expect.any(Object)]),
                pagination: expect.any(Object)
            }))
        } )
        it( 'returns only specified stations', async () => {
            axiosMock.onGet( 'https://api.laut.fm/stations/eins,radiohayom' )
                .reply( 200, einsHayom )
            const stations = await api.stations(['eins','radiohayom'])
            expect(stations.length).toBe(2)
        } )
        it( 'returns stations starting with a specific letter', async () => {
            axiosMock.onGet( 'https://api.laut.fm/stations/letter/w' )
                .reply( 200, stationsStartW )
            const letters=[]
            const stationStartsWith = await api.stationStartsWith('w')
            stationStartsWith.forEach(s=>letters.push(s.name[0].toLowerCase()))
            const notE = letters.filter( l => l !== 'w' )
            expect(notE.length).toBe(0)
        } )
        it( 'returns stations starting with a specific letter and pagination', async () => {
            axiosMock.onGet( 'https://api.laut.fm/stations/letter/e', { offset: 10, limit: 5 } )
                .reply( 200, stationsEOffset )
            const letters=[]
            let {stations, pagination} = await api.stationStartsWith('e', {limit:5,offset:10})
            stations.forEach(s=>letters.push(s.name[0].toLowerCase()))
            const notE = letters.filter( l => l !== 'e' )
            expect(notE.length).toBe(0)
            expect(pagination).toEqual(expect.anything())
        } )
    } )
} )

//it('runs a test', async () => {
//    const station = new Station('eins')
//    const cs = await station.currentSong()
//    console.log(cs.id)
//})

//it('return current song', async () => {
//    const station = new Station('eins')
//    const cs = await station.currentSong()
//    console.log(cs)
//})

//it('runs with params', async () => {
//    const cs = await allStations([10,10])
//    console.log(cs)
//    expect(cs.length).toBe(10)
//})
