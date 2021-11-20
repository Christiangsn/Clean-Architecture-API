import { Router } from 'express'
import { adaptRoute } from '../adapters/express'
import { makeSignUpController } from '../factories/controllers/SignUp/singup'
import { makeLoginController } from '../factories/controllers/Login/loginFactory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
