import { Request, Response, NextFunction } from 'express'

export const defaultHeaders = (req: Request, res: Response, next: NextFunction): void => {
  res.set({ 'content-type': 'application/json' })
  next()
}
