import dao from '../db/dao'
import { Client } from 'pg'
import { db } from '../config'
jest.mock('../db/connection')
import connection from '../db/connection'

let client
beforeAll(() => {
  client = new Client(db)
  connection.query.mockImplementation(client.query.bind(client))
  return client.connect().then(() => {
    client.query(
      'CREATE TEMP TABLE entries (LIKE entries INCLUDING ALL); CREATE TEMP TABLE users (LIKE users INCLUDING ALL);',
    )
  })
})

afterAll(() => {
  client.end()
})

describe('User data acess', () => {
  it('should check user does not exist', async () => {
    const userExists = await dao.checkUserExists('test')
    expect(userExists).toEqual(false)
  })
})
