import { Router } from 'express'
import { makeSignUpController } from '../factories/singup'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
