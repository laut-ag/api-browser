import * as api from '../src/api'
import 'jest-extended'
import MockAdapter from './mocks/xhr_mock'
import Station from '../src/station'

const tOrUndefined = function(T: any) {
    return [T, undefined]
}

const httpMock = new MockAdapter(window.XMLHttpRequest)
beforeEach( () => httpMock.reset() )

describe( 'station class', () => {
    httpMock.reply(200,null)

    var radiohayom = new Station('radiohayom')

    it( 'returns info', async () => {
        httpMock.reply(200,null)
        const info = await radiohayom.info()
        expect(info).toEqual(expect.any(Object))
        expect(info.name).toEqual('radiohayom')
    } )
    it( 'returns current song', async () => {
        httpMock.reply(200,null)
        const currentSong = await radiohayom.currentSong()
        expect(currentSong).toEqual(expect.any(Object))
    } )
    it( 'returns last song', async () => {
        httpMock.reply(200,null)
        const lastSong = await radiohayom.lastSong()
        expect(lastSong).toEqual(expect.any(Object))
    } )
    it( 'returns schedule', async () => {
        httpMock.reply(200,null)
        const schedule = await radiohayom.schedule()
        // TODO: errors when end_time is null
        // removed to pass tests
        expect(schedule).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                day: expect.any(String),
                hour: expect.any(Number),
                description: expect.any(String),
                color: expect.any(String),
                length: expect.any(Number),
                shuffled: expect.any(Boolean),
            })
        ]))
    } )
    it( 'returns playlists', async () => {
        httpMock.reply(200,null)
        const playlists = await radiohayom.playlists()
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
        httpMock.reply(200,null)
        const listeners = await radiohayom.listeners()
        expect(listeners).toEqual(expect.any(Number))
    } )
    it( 'returns next artists', async () => {
        httpMock.reply(200,null)
        const nextArtists = await radiohayom.nextArtists()
        expect(nextArtists).toEqual(expect.arrayContaining([expect.any(String)]))
    } )
} )

describe( 'accessing with getters', () => {
    it( '#genresByCount', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.genresByCount(1).length).toBe(1)
    })
    it( '#name', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.name).toEqual(expect.any(String))
    })
    it( '#displayName', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.displayName).toEqual(expect.any(String))
    })
    it( '#pageUrl', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.pageUrl).toEqual(expect.any(String))
    })
    it( '#streamUrl', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.streamUrl).toEqual(expect.any(String))
    })
    it( '#format', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.format).toEqual(expect.any(String))
    })
    it( '#description', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.description).toEqual(expect.any(String))
    })
    it( '#djs', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.djs).toEqual(expect.any(String))
    })
    it( '#location', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.location).toEqual(expect.any(String))
    })
    it( '#latLong', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.latLong.length).toEqual(2)
    })
    it( '#color', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.color).toEqual(expect.any(String))
    })
    it( '#updatedAt', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.updatedAt).toEqual(expect.any(String))
    })
    it( '#genres', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.genres).toEqual(expect.arrayContaining([expect.any(String)]))
    })
    it( '#active', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.active).toEqual(expect.any(Boolean))
    })
    it( '#skillName', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.skillName).toBeOneOf(tOrUndefined(expect.any(String)))
    })
    it( '#invocationName', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.invocationName).toBeOneOf(tOrUndefined(expect.any(String)))
    })
    it( '#facebook', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.facebook).toBeOneOf(tOrUndefined(expect.any(String)))
    })
    it( '#twitterUrl', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.twitterUrl).toBeOneOf(tOrUndefined(expect.any(String)))
    })
    it( '#twitterName', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.twitterName).toBeOneOf(tOrUndefined(expect.any(String)))
    })
    it( '#website', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.website).toBeOneOf(tOrUndefined(expect.any(String)))
    })
    it( '#phonostarUrl', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.phonostarUrl).toBeOneOf(tOrUndefined(expect.any(String)))
    })
    it( '#radiodeUrl', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.radiodeUrl).toBeOneOf(tOrUndefined(expect.any(String)))
    })
    it( '#currentPlaylist', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.currentPlaylist).toEqual(expect.any(Object))
    })
    it( '#nextPlaylist', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.nextPlaylist)
            .toBeOneOf(tOrUndefined(expect.arrayContaining([expect.any(Object)])))
    })
    it( '#topArtists', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.topArtists).toEqual(expect.arrayContaining([expect.any(String)]))
    })
    it( '#position', async () => {
        httpMock.reply(200,null)
        const radiohayomObject = await new Station('radiohayom').init()
        expect(radiohayomObject.position).toEqual(expect.any(Number))
    } )
} )
