import * as api from '../src/api.js'
expect.extend

it( 'returns server status', async () => {
   const serverRunning = await api.isServerRunning()
    expect(serverRunning).toEqual(expect.any(Boolean))
} )

it( 'returns full server status', async () => {
    const serverStatus = await api.serverStatus()
    expect(serverStatus).toEqual({
        message: expect.any(String),
        running: expect.any(Boolean)
    })
} )

it( 'returns the server time', async () => {
    const serverTime = await api.serverTime()
    expect(serverTime).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \+\d\d00/)
} )


describe( 'letter functions', () => {
    it( 'returns all first letters available in api', async () => {
        const letters = await api.letters()
        expect(letters).toEqual(
            expect.arrayContaining([
                expect.any(String)
            ] )
        )
    } )

    it( 'returns true when letter exists', async () => {
        const hasLettertrue = await api.hasLetter('a')
        expect(hasLettertrue).toBe(true)
    } )

    it( 'returns false when letter doesnt exist', async () => {
        const hasLetterfalse = await api.hasLetter(1)
        expect(hasLetterfalse).toBe(false)
    } )
} )

describe( 'genre function', () => {
    it( 'returns an array of genres', async () => {
        const genres = await api.genres()
        expect(genres).toContainEqual(expect.any(String))
    } )
    it( 'returns an array of raw genres', async () => {
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
        const relatedGenres = await api.relatedGenres('Rock')
        expect(relatedGenres).toEqual(
            expect.arrayContaining([expect.any(String)])
        )
    } )
} )

it( 'returns total number of listeners online', async () => {
    const listeners = await api.allListeners()
    expect(listeners).toEqual(expect.any(Number))
} )

describe( 'station specific functions', () => {
    it( 'returns an array of all stations', async () => {
        const stations = await api.stationNames()
        expect(stations).toEqual(expect.arrayContaining([expect.any(String)]))

    } )
    it( 'returns true for a station that exists', async () => {
        const hasStationTrue = await api.hasStation('eins')
        expect(hasStationTrue).toBe(true)
    } )
    it( 'returns false for a station that does not exist', async () => {
        const hasStationFalse = await api.hasStation('foo')
        expect(hasStationFalse).toBe(false)
    } )
    it( 'returns the number of listeners for a single station', async () => {
        const listeners = await api.listeners('eins')
        expect(listeners).toEqual(expect.any(Number))
    } )
} )

describe( 'live stations', () => {
    it( 'returns array of raw data for live stations', async () => {} )
    it( 'returns array of station names currently live', async () => {
        const liveStations = await api.liveStations()
        expect(liveStations).toEqual(expect.arrayContaining([expect.any(String)]))
    } )
    it( 'returns Boolean for a station broadcasting live or not', async () => {
        //must have station broadcasting live
        const isLive = await api.stationIsLive('eins')
        expect(isLive).toEqual(expect.any(Boolean))
    } )
    it( 'returns number of stations broadcasting live', async () => {
        const numLiveStations = await await api.numLiveStations()
        expect(numLiveStations).toEqual(expect.any(Number))
    } )
} )

describe( 'aggregate station functions', () => {
    it( 'returns all stations', async () => {
        const allStations = await api.allStations()
        expect(allStations).toEqual(expect.arrayContaining([expect.any(Object)]))
    } )
    it( 'returns all stations with pagination', async () => {
        const allStations = await api.allStations({offset:10,limit:5})
        expect(allStations).toEqual(expect.objectContaining({
            stations: expect.arrayContaining([expect.any(Object)]),
            pagination: expect.any(Object)
        }))
    } )
    it( 'returns only specified stations', async () => {
        const stations = await api.stations(['eins','zwo'])
        expect(stations.length).toBe(2)
    } )
    it( 'returns stations starting with a specific letter', async () => {
        const letters=[]
        const stationStartsWith = await api.stationStartsWith('e')
        stationStartsWith.forEach(s=>letters.push(s.name[0].toLowerCase()))
        const notE = letters.filter( l => l !== 'e' )
        expect(notE.length).toBe(0)
    } )
    it( 'returns stations starting with a specific number', async () => {
        const letters=[]
        let {stations, pagination} = await api.stationStartsWith('e', {limit:5,offset:1})
        stations.forEach(s=>letters.push(s.name[0].toLowerCase()))
        const notE = letters.filter( l => l !== 'e' )
        expect(notE.length).toBe(0)
        expect(pagination).toEqual(expect.anything())
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
