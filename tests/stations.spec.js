import Station from '../src/station.js'
import {allStations} from '../src/api.js'
it('runs a test', async () => {
    const station = new Station('eins')
    const cs = await station.currentSong()
    //console.log(cs.id)
})

it('return current song', async () => {
    const station = new Station('eins')
    const cs = await station.currentSong()
    console.log(cs)
})

//it('runs with params', async () => {
//    const cs = await allStations([10,10])
//    console.log(cs)
//    expect(cs.length).toBe(10)
//})
