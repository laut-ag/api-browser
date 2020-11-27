import * as api from '../src/api'
import MockAdapter from './mocks/xhr_mock'

describe( '', () => {
    const httpMock = new MockAdapter(window.XMLHttpRequest)
    beforeEach( () => httpMock.reset() )

    describe( 'server status', () => {

        it( 'returns server status', async () => {
          httpMock.reply(200,null)
           const serverRunning = await api.isServerRunning()
            expect(serverRunning).toEqual(expect.any(Boolean))
        } )
        it( 'returns full server status', async () => {
            httpMock.reply(200,null)
            const serverStatus = await api.serverStatus()
            expect(serverStatus).toEqual({
                message: expect.any(String),
                running: expect.any(Boolean)
            })
        } )

    } )

    describe( 'server time', () => {
        it( 'returns the server time', async () => {
            httpMock.reply(200,null)
            const serverTime = await api.serverTime()
            expect(serverTime).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \+\d\d00/)
        } )
    } )

    describe( 'letter functions', () => {
        it( 'returns all first letters available in api', async () => {
            httpMock.reply(200,null)
            const letters = await api.letters()
            expect(letters).toEqual(
                expect.arrayContaining([
                    expect.any(String)
                ] )
            )
        } )
        it( 'returns true when letter exists', async () => {
            httpMock.reply(200,null)
            const hasLettertrue = await api.hasLetter('a')
            expect(hasLettertrue).toBe(true)
        } )
        it( 'returns false when letter doesnt exist', async () => {
            httpMock.reply(200,null)
            const hasLetterfalse = await api.hasLetter(1)
            expect(hasLetterfalse).toBe(false)
        } )
    } )

    describe( 'genre function', () => {
        it( 'returns an array of genres', async () => {
            httpMock.reply(200,null)
            const genres = await api.genres()
            expect(genres).toContainEqual(expect.any(String))
        } )
        it( 'returns an array of raw genres', async () => {
            httpMock.reply(200,null)
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
            httpMock.reply(200,null)
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
            httpMock.reply(200,null)
            const relatedGenres = await api.relatedGenres('Rock')
            expect(relatedGenres).toEqual(
                expect.arrayContaining([expect.any(String)])
            )
        } )
    } )

    describe( 'live stations', () => {
        it( 'returns array of raw data for live stations', async () => {} )
        it( 'returns array of station names currently live', async () => {
            httpMock.reply(200,null)
            const liveStations = await api.liveStations()
            expect(liveStations).toEqual(expect.arrayContaining([expect.any(String)]))
        } )
        it( 'returns Boolean for a station broadcasting live or not', async () => {
            httpMock.reply(200,null)
            const isLive = await api.stationIsLive('eins')
            expect(isLive).toEqual(expect.any(Boolean))
        } )
        it( 'returns number of stations broadcasting live', async () => {
            httpMock.reply(200,null)
            const numLiveStations = await api.numLiveStations()
            expect(numLiveStations).toEqual(expect.any(Number))
        } )
        it( '#liveStationsRaw', async () => {
            httpMock.reply(200,null)
            const liveStationsRaw = await api.liveStationsRaw()
            expect(liveStationsRaw).toEqual(expect.arrayContaining([expect.any(Object)]))
        } )
   } )
 
    describe( 'station specific functions', () => {
        it( 'returns an array of all stations', async () => {
            httpMock.reply(200,null)
            const stations = await api.stationNames()
            expect(stations).toEqual(expect.arrayContaining([expect.any(String)]))
        } )
        it( 'returns true for a station that exists', async () => {
            httpMock.reply(200,null)
            const hasStationTrue = await api.hasStation('eins')
            expect(hasStationTrue).toBe(true)
        } )
        it( 'returns false for a station that does not exist', async () => {
            httpMock.reply(200,null)
            const hasStationFalse = await api.hasStation('foo')
            expect(hasStationFalse).toBe(false)
        } )
        it( 'returns the number of listeners for a single station', async () => {
            httpMock.reply(200,null)
            const listeners = await api.listeners('eins')
            expect(listeners).toEqual(expect.any(Number))
        } )
    } )

    it( 'returns total number of listeners online', async () => {
        httpMock.reply(200,null)
        const listeners = await api.allListeners()
        expect(listeners).toEqual(expect.any(Number))
    } )

    describe( 'aggregate station functions', () => {
        it( 'returns all stations', async () => {
            httpMock.reply(200,null)
            const allStations = await api.allStations()
            expect(allStations).toEqual(expect.arrayContaining([expect.any(Object)]))
        } )
        it( 'returns all stations with pagination', async () => {
            httpMock.reply(200,null)
            const allStations = await api.allStations({offset:10,limit:5})
            expect(allStations).toEqual(expect.objectContaining({
                stations: expect.arrayContaining([expect.any(Object)]),
                pagination: expect.any(Object)
            }))
        } )
        it( 'returns only specified stations', async () => {
            httpMock.reply(200,null)
            const stations = await api.stations(['eins','radiohayom'])
            expect(stations.length).toBe(2)
        } )
        it( 'returns stations starting with a specific letter', async () => {
            httpMock.reply(200,null)
            const letters=[]
            const stationStartsWith = await api.stationStartsWith('a')
            stationStartsWith.forEach(s=>letters.push(s.name[0].toLowerCase()))
            const notE = letters.filter( l => l !== 'a' )
            expect(notE.length).toBe(0)
        } )
        it( 'returns stations starting with a specific letter and pagination', async () => {
            httpMock.reply(200,null)
            const letters=[]
            let {stations, pagination} = await api.stationStartsWith('a', {offset:10,limit:5})
            stations.forEach(s=>letters.push(s.name[0].toLowerCase()))
            const notE = letters.filter( l => l !== 'a' )
            expect(notE.length).toBe(0)
            expect(pagination).toEqual(expect.anything())
        } )
    } )
} )
