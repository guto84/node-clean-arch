import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'
import env from './env'

export default (app: Express): void => {
  const router = Router()
  app.use(`/${env.apiVersion}`, router)
  readdirSync(path.join(__dirname, '..', 'routes')).map(async (file) => {
    if (!file.includes('.test.')) {
      // eslint-disable-next-line prettier/prettier
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
