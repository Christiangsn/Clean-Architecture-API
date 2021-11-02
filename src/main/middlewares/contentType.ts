import { Request, Response, NextFunction } from 'express'

export const defaultHeaders = (req: Request, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
}
