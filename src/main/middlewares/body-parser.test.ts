import request from 'supertest'
import app from '../config/app'

describe('body parser middleware', () => {
  test('should parse body at json', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test-body-parser')
      .send({ name: 'name' })
      .expect({ name: 'name' })
  })
})
