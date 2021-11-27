import { makeLoadSurveysController } from '@main/factories/controllers/LoadSurveys/loadSurveyController'
import { makeAddSurveyController } from '@main/factories/controllers/Survey/addSurveyFactory'
import { adminAuth } from '@main/middlewares/permission/adminAuth'
import { auth } from '@main/middlewares/permission/Auth'
import { Router } from 'express'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
