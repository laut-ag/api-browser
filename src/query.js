import axios from 'axios'

let _pubApiInstance = axios.create({
  responseType: 'json',
  timeout: 2000,
  baseURL: 'https://api.laut.fm/'
})


export const query = async function(url, params = {}) {
    try {
        const response = await _pubApiInstance({
            method: 'get',
            url,
            params,
        })
        const data = await response.data
        return data
    } catch (err) {
        console.log(err)
        throw err
    }
}

