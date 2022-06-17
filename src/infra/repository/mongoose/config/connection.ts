import mongoose from 'mongoose'

export const Mongo = {
  client: null as typeof mongoose | null | void,

  async connect(uri: string) {
    this.client = await mongoose.connect(uri)
  },

  async disconnect() {
    this.client = await mongoose.disconnect()
  },
}
