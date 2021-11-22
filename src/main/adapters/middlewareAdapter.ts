import { HttpRequest } from '@presentation/protocol'
import { ProtocolsMiddleware } from '@presentation/protocol/middleware'
import { NextFunction, Request, Response } from 'express'

export const adapterMiddleware = (midleware: ProtocolsMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = { headers: req.header }

    const httpResponse = await midleware.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
