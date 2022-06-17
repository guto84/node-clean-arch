import request from 'supertest'
import app from '../config/app'
import env from '../config/env'

describe('create user routes', () => {
  test('should return an user on success', async () => {
    await request(app)
      .post(`/${env.apiVersion}/users`)
      .send({
        name: 'name',
        email: 'name@email.com',
        password: '1234',
        passwordConfirmation: '1234',
      })
      .expect(200)
  })
})
