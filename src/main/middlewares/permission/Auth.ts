import { adapterMiddleware } from '@main/adapters/middlewareAdapter'
import { makeAuthMiddleware } from '@main/factories/middlewares/authMiddleware'

export const auth = adapterMiddleware(makeAuthMiddleware())
