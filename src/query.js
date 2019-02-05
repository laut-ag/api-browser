import axios from 'axios' 
import querystring from 'querystring' 

export const query = async function(url, params = {}) {
    const responseType = 'json'
    const timeout = 2000
    const baseURL = 'http://api.laut.fm/'
    //const params = querystring.stringify(params)
    try {
        const response = await axios({
            method: 'get',
            baseURL,
            url,
            responseType,
            params: querystring.stringify(params),
            timeout,
        })
        const data = await response.data
        return data
    } catch (err) {
        console.log(err)
        throw err
    }
}

