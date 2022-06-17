import mongoose from 'mongoose'
import { config } from './config'

beforeAll(async () => {
  await mongoose.connect(`${process.env.MONGO_URI}/${config.Database}`)
})

afterAll(async () => {
  await mongoose.disconnect()
})
