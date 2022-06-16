import express, { Express } from 'express'
// import {
//   jsonParser,
//   bodyParser,
//   cors,
//   contentType,
//   morganMiddleware,
// } from '@/main/middlewares'
// import setupRoutes from '@/main/config/routes'

const app: Express = express()
// app.use(jsonParser)
// app.use(bodyParser)
// app.use(cors)
// app.use(contentType)
// app.use(morganMiddleware)
// app.use('/public', express.static(`public`))
// setupRoutes(app)

app.listen(5000, () => console.log('rodando...'))
