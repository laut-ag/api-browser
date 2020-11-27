![npm](https://img.shields.io/npm/v/lautfm-api.svg)
![NPM](https://img.shields.io/npm/l/lautfm-api.svg)
![npm](https://img.shields.io/npm/dw/lautfm-api.svg)
![Travis (.org) branch](https://img.shields.io/travis/fvhockney/lautfm-api/master.svg)

# Importable Public API for Laut.fm

This is an importable wrapper for the Laut.fm public API. It features the ability to import only the functions that a user needs in any particular file. It is also compatible with tree shaking when used with a build system like webpack.

## Important Information

This liberary comes with a commonJs build and an ES2015(ES6) build. The commonJs build is located in `./cjs` and exposed in `package.json#browser` while the ES6 build is located in `./esm` and exposed in `package.json#module`. In either case, you will need to polyfill `Promise** if you want to use it in an environment that does not provide a native implementation.

**As of version 3.0.0, we no longer require `axios` as peer dependency. We know use the browsers native `XMLHttpRequest` object to fulfill all requests**

If you are interested in a liberary that can be used directly in the browser, without polyfilling, or without promises, take a look at the wonderful liberary at <https://github.com/lautde/lautfm_js_tools>.

## Documentation

Full documentation can be found at <https://laut-ag.github.io/api-browser>

## Installation

```bash
npm i @lautag/api-browser
```

## Use

Import entire liberary
```js
import * as lautapi from '@lautag/api-browser'

api.isServerRunning()
    .then( data => console.log( data ) )
    .catch( error => console.error( error ) )

api.genres()
    .then( data => console.log( data ) )
    .catch( error => console.error( error ) )

```

Import only specific functions
```js
import { isServerRunning, genres } from '@lautag/api-browser'

isServerRunning()
    .then( data => console.log( data ) )
    .catch( error => console.error( error ) )

genres()
    .then( data => console.log( data ) )
    .catch( error => console.error( error ) )

```

You can also create an object to work with a specific station
```js
import { Station } from '@lautag/api-browser'

const eins = new Station( 'eins' )
eins.lastSong()
    .then( data => console.log( data ) )
    .catch( error => console.error( error ) )
```

Or if you can initialize a station and have access to quite a bit of information without having to make multiple requests
```js
import { Station } from '@lautag/api-browser'

( async () => {
    const eins = await new Station( 'eins' ).init()

    console.log( eins.name )
    console.log( eins.currentPlaylist )

    // You can still use other async methods after initializing
    // if you still need more information

    const einsPlaylists = await eins.playlists()
    console.log( einsPlaylists )
  })()
```

## Tests

```bash
npm run test
```

## Collaboration

Collaboration on this project is welcome. Feel free to fork the project and to submit a pull request with additional functionality. It would be most helpful if you submit tests (preferably by adding them to the appropriate file) and ensure that the entire test suite runs. If you are not able to run tests, that is ok; however, it will slow down the pace of merging pull requests.
