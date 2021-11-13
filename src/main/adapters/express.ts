import { ProtocolControllers, HttpRequest } from '@presentation/protocol'
import { Request, Response } from 'express'

export const adaptRoute = (controller: ProtocolControllers) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httResponse = await controller.handle(httpRequest)
    if (httResponse.statusCode === 200) {
      return res.status(httResponse.statusCode).json(httResponse.body)
    } else {
      res.status(httResponse.statusCode).json({
        error: httResponse.body.message
      })
    }
  }
}
