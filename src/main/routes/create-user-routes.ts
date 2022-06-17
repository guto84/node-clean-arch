import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeCreateUserController } from '../factories'

export default (router: Router): void => {
  router.post('/users', adaptRoute(makeCreateUserController()))
}
