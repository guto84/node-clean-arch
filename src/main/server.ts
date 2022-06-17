import { Mongo } from '../infra/repository/mongoose/config/connection'
import env from './config/env'

Mongo.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log('rodando...'))
  })
  .catch(console.error)
