import app from '../App'
const request = require('supertest')
jest.mock('../services/hisabisaService')
import hisabisaService from '../services/hisabisaService'

describe('Users API', () => {
  test('invalid request body', () => {
    return request(app)
      .post('/api/users')
      .expect(400)
  })

  test('user already existing', () => {
    ;(hisabisaService.checkUserExists as any).mockImplementation(() =>
      Promise.resolve(true),
    )
    return request(app)
      .post('/api/users')
      .send({ username: 'test', password: 'test1' })
      .expect(409)
  })

  test('register user', () => {
    ;(hisabisaService.checkUserExists as any).mockImplementation(() =>
      Promise.resolve(false),
    )
    ;(hisabisaService.registerUser as any).mockImplementation(() =>
      Promise.resolve(1),
    )
    return request(app)
      .post('/api/users')
      .send({ username: 'test', password: 'test1' })
      .expect(201, { userid: 1 })
  })
})
