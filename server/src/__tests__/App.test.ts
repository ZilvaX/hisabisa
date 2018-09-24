import app from '../App'
const request = require('supertest')

test('App constructor', () => {
  return request(app)
    .get('/')
    .expect(200, { message: 'Hello World' })
})
