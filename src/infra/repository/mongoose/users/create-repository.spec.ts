import { CreateUserRepository } from './create-repository'

// import mongoose from 'mongoose'
// import { MongoMemoryServer } from 'mongodb-memory-server'

describe('Create user repository', () => {
  test('should return an user on success', async () => {
    // const mongoServer = await MongoMemoryServer.create()
    // await mongoose.connect(mongoServer.getUri(), { dbName: 'NodeCleanArch' })
    const sut = new CreateUserRepository()
    const response = await sut.handle({
      name: 'name',
      email: 'name@email.com',
      password: '1234',
    })
    expect(response).toBeTruthy()
    expect(response.id).toBeTruthy()
    expect(response.name).toEqual('name')
    expect(response.email).toEqual('name@email.com')
    expect(response.password).toEqual('hashed_password')
    // await mongoose.disconnect()
  })
})

// const { MongoClient } = require('mongodb')

// describe('insert', () => {
//   let connection
//   let db

//   beforeAll(async () => {
//     connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     db = await connection.db(globalThis.__MONGO_DB_NAME__)
//   })

//   afterAll(async () => {
//     await connection.close()
//   })

//   it('should insert a doc into collection', async () => {
//     const users = db.collection('users')

//     const mockUser = { _id: 'some-user-id', name: 'John' }
//     await users.insertOne(mockUser)

//     const insertedUser = await users.findOne({ _id: 'some-user-id' })
//     expect(insertedUser).toEqual(mockUser)
//   })
// })
