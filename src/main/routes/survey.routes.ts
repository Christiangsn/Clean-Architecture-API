import { adapterMiddleware } from '@main/adapters/middlewareAdapter'
import { makeAddSurveyController } from '@main/factories/controllers/Survey/addSurveyFactory'
import { makeAuthMiddleware } from '@main/factories/middlewares/authMiddleware'
import { Router } from 'express'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
