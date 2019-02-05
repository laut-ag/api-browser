import Station from '../src/station.js'

it('runs a test', async () => {
    const station = new Station('eins')
    const cs = await station.currentSong()
    console.log(cs)
})
