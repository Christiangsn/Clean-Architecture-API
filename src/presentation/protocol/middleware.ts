import { HttpRequest, HttpResponse } from './http'

export interface ProtocolsMiddleware {
    handle (httpRequest: HttpRequest): Promise<HttpResponse>
}
