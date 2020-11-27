import apiMappings from '../../api.json'

type status = number | "timeout"
type method = "get"
type response = any
type eventName = "load"|"error"|"abort"|"timeout"
type eventCallback = () => void
type apiMapping = { file: string, uri: string }

export default class XHRMock {
    implementation: any
    responseUrl: string
    url: string
    method: method
    status: status
    statusText: string
    responseType: string
    response: any
    readyState: number
    handlers: { error: () => void; load: () => void; abort: () => void; timeout: () => void }

    constructor(impl: any) {
        this.implementation = impl
        this.responseUrl = ''
        this.url= ''
        this.method= "get"
        this.status= 200
        this.statusText= ''
        this.responseType= ''
        this.response= {}
        this.readyState= 4
        let self = this
        window.XMLHttpRequest = function () { return self }
        this.handlers= {
            error: () => {},
            load: () => {},
            abort: () => {},
            timeout: () => {},
        }
    }

    resource (): response {
        let response = apiMappings.find( (u: apiMapping) => this.url === u.uri )
        return require('../../' + response.file)
    }

    open (method: method, url: string) {
        this.responseUrl = url
        this.url = url
        this.method = method
    }

    send(): Promise<any> {
        return new Promise((res,rej) => {
            if (this.status >= 200 && this.status < 400) {
                this.response = this.resource()
                res(this.handlers.load())
            } else if (this.status >= 400) {
                rej(this.handlers.error())
            } else {
                rej(this.handlers.timeout())
            }
        })
    }

    reply(status: status, resp: any){
        this.status = status
        this.response = resp
    }

    addEventListener (event: eventName, listener: eventCallback){
        this.handlers[event] = listener
    }

    reset (){
        this.responseUrl = ''
        this.url = ''
        this.method = 'get'
        this.status = 200
        this.statusText = ''
        this.response = {}
        this.readyState = 4
        this.handlers = {
            error: () => {},
            load: () => {},
            abort: () => {},
            timeout: () => {},
        }
    }
}
