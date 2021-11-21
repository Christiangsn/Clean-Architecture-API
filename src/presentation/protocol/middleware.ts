import { HttpRequest, HttpResponse } from './http'

export interface ProtocolMiddlware {
    handle (httpRequest: HttpRequest): Promise<HttpResponse>
}
