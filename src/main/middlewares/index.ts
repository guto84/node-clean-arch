import { Express } from 'express'
import { bodyParser } from './body-parser'
import { contentType } from './content-type'
import { cors } from './cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
