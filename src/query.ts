export interface IOptions {
    lat: number;
    long: number;
    offset: number;
    limit: number;
    [x: string]: number;
}

const BASE_URL = 'https://api.laut.fm/'

function qs(params: Partial<IOptions>): string {
    const props = Object.keys(params)
    let queryString = props.reduce( (prev, cur, index) => {
        let prefix = '&'
        if (index === 0) prefix = '?'
        return prev += prefix + cur + '=' + params[cur]
    }, '')
    return queryString
}

export function query(url: string, params: Partial<IOptions> = {}): Promise<any> {
    return new Promise( (res, rej) => {
        const xhr = new XMLHttpRequest()
        xhr.timeout = 2000
        xhr.responseType = 'json'
        xhr.addEventListener("load", () => {
            res(xhr.response)
        })
        xhr.addEventListener("error", () => {
            const code = xhr.status
            const statusText = xhr.statusText
            const url = xhr.responseURL
            rej({code, statusText, url})
        })
        xhr.addEventListener("abort", () => rej("request aborted"))
        xhr.addEventListener("timeout", () => {
            const code = xhr.status
            const statusText = xhr.statusText
            const url = xhr.responseURL
            rej({code, statusText, url})
        })
        xhr.open('GET', BASE_URL + url + qs(params))
        xhr.send()
    })
}

