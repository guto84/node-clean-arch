import express, { Express } from 'express'
import middlewares from '../middlewares'
import routes from './routes'

const app: Express = express()
middlewares(app)
routes(app)

export default app
