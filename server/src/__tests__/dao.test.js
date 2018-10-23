const { Client, types } = require('pg')
const { Duration, DateTime } = require('luxon')
const config = require('../config')
const typeConfigurer = require('../db/typeConfigurer')
const db = require('../db')
const dao = require('../dao')
jest.mock('../db')

// Type Parsers
typeConfigurer(types)

let client
beforeAll(() => {
  client = new Client(config.db)
  db.query.mockImplementation(client.query.bind(client))
  return client.connect().then(() => {
    client.query(
      'CREATE TEMP TABLE entries (LIKE entries INCLUDING ALL); CREATE TEMP TABLE users (LIKE users INCLUDING ALL);',
    )
  })
})
beforeEach(() => {
  return client.query('TRUNCATE users, entries')
})

afterAll(() => {
  return client.end()
})
test('Get no entry', async () => {
  const entries = await dao.getEntries('0')
  expect(entries).toEqual([])
})
test('Insert and get inserted entry', async () => {
  const expectedEntry = {
    event: 'Hello World',
    entryid: 1,
    lastoccurrence: DateTime.fromISO('2018-08-03'),
    frequency: Duration.fromObject({ days: 1 }),
  }
  const entryToInsert = {
    userid: 1,
    event: 'Hello World',
    lastoccurrence: DateTime.fromISO('2018-08-03'),
    frequency: Duration.fromObject({ days: 1 }),
  }
  const insertedEntry = await dao.insertEntry(entryToInsert)
  expect(insertedEntry).toEqual(expectedEntry)
  const entries = await dao.getEntries('1')
  expect(entries).toEqual([expectedEntry])
})
test('Insert and delete entry', async () => {
  const entryToInsert = {
    userid: 1,
    event: 'Hello World',
    lastoccurrence: DateTime.fromISO('2018-08-03'),
    frequency: Duration.fromObject({ days: 1 }),
  }
  const { entryid } = await dao.insertEntry(entryToInsert)
  await dao.deleteEntry(entryid)
  const entries = await dao.getEntries('1')
  expect(entries).toEqual([])
})
test('Insert and update entry', async () => {
  const entryToInsert = {
    userid: 1,
    event: 'Hello World',
    lastoccurrence: DateTime.fromISO('2018-08-03'),
    frequency: Duration.fromObject({ days: 1 }),
  }
  const { entryid } = await dao.insertEntry(entryToInsert)
  const updatedEntry = {
    entryid,
    event: 'Hello World updated',
    lastoccurrence: DateTime.fromISO('2018-08-05'),
    frequency: Duration.fromObject({ days: 30 }),
  }
  const update = await dao.updateEntry(updatedEntry)
  expect(update).toEqual(updatedEntry)
})
test('Insert and check entry exists', async () => {
  const entryToInsert = {
    userid: 1,
    event: 'Hello World',
    lastoccurrence: DateTime.fromISO('2018-08-03'),
    frequency: Duration.fromObject({ days: 1 }),
  }
  const { entryid } = await dao.insertEntry(entryToInsert)
  const checkInsert = await dao.checkEntryExists(entryid)
  expect(checkInsert).toBe(true)
  await dao.deleteEntry(entryid)
  const checkDelete = await dao.checkEntryExists(entryid)
  expect(checkDelete).toBe(false)
})
test('Insert and check user exists', async () => {
  const user = { username: 'unittester', password: 'hashedpassword' }
  const checkBeforeInsert = await dao.checkUserExists(user.username)
  expect(checkBeforeInsert).toBe(false)
  await dao.insertUser(user.username, user.password)
  const checkAfterInsert = await dao.checkUserExists(user.username)
  expect(checkAfterInsert).toBe(true)
})
test('Insert and get user', async () => {
  const user = { username: 'unittester', password: 'hashedpassword' }
  const userid = await dao.insertUser(user.username, user.password)
  const getUser = await dao.getUserIdAndHash(user.username)
  const expected = { userid, password: user.password }
  expect(getUser).toEqual(expected)
})
test('Insert multiple and get entries', async () => {
  const entryToExpect1 = {
    event: 'Hello World',
    lastoccurrence: DateTime.fromISO('2018-08-03'),
    frequency: Duration.fromObject({ days: 1 }),
  }
  const entryToInsert1 = {
    userid: 1,
    event: 'Hello World',
    lastoccurrence: DateTime.fromISO('2018-08-03'),
    frequency: Duration.fromObject({ days: 1 }),
  }
  const entryToExpect2 = {
    event: 'Hello World 2',
    lastoccurrence: DateTime.fromISO('2018-08-03'),
    frequency: Duration.fromObject({ days: 1 }),
  }
  const entryToInsert2 = {
    userid: 1,
    event: 'Hello World 2',
    lastoccurrence: DateTime.fromISO('2018-08-03'),
    frequency: Duration.fromObject({ days: 1 }),
  }
  const entriesToExpect = [entryToExpect1, entryToExpect2]
  const insertedEntries = await dao.insertEntries([
    entryToInsert1,
    entryToInsert2,
  ])
  expect(insertedEntries).toMatchObject(entriesToExpect)
  const entries = await dao.getEntries('1')
  expect(entries).toMatchObject(entriesToExpect)
})
