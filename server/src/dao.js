// Define Database Queries
const db = require('./db')
const sql = require('sql')

// Define tables
const entries = sql.define({
  name: 'entries',
  columns: ['entryid', 'userid', 'event', 'lastoccurrence', 'frequency'],
})

const users = sql.define({
  name: 'users',
  columns: ['userid', 'username', 'password'],
})

const insertEntry = entry => {
  return insertEntries([entry]).then(res => res[0])
}

const insertEntries = entriesArray => {
  const entriesToInsert = entriesArray.map(entry => {
    return Object.assign({}, entry, { frequency: entry.frequency.toString() })
  })
  const query = entries
    .insert(entriesToInsert)
    .returning('entryid', 'event', 'lastoccurrence', 'frequency')
    .toQuery()
  return db.query(query.text, query.values).then(res => res.rows)
}

const updateEntry = entry => {
  const { event, lastoccurrence, frequency, entryid } = entry
  const query = entries
    .update({
      event,
      lastoccurrence,
      frequency: frequency.toString(),
    })
    .where(entries.entryid.equals(entryid))
    .returning('entryid', 'event', 'lastoccurrence', 'frequency')
    .toQuery()
  return db.query(query.text, query.values).then(res => res.rows[0])
}

const checkEntryExists = entryid => {
  const query = sql
    .select(
      entries
        .subQuery()
        .where(entries.entryid.equals(entryid))
        .exists(),
    )
    .toQuery()
  return db.query(query.text, query.values).then(res => res.rows[0].exists)
}

const getEntries = user => {
  const query = entries
    .select('entryid', 'event', 'lastoccurrence', 'frequency')
    .from(entries)
    .where(entries.userid.equals(user))
    .order(entries.lastoccurrence.ascending)
    .toQuery()
  return db.query(query.text, query.values).then(res => res.rows)
}

const getOverdueEntries = user => {
  return db
    .query(
      'SELECT * FROM entries WHERE userid=$1 AND lastoccurrence + frequency > CURRENT_DATE',
      [user],
    )
    .then(res => res.rows)
}

const deleteEntry = entryid => {
  const query = entries
    .delete()
    .where(entries.entryid.equals(entryid))
    .toQuery()
  return db.query(query.text, query.values)
}

const insertUser = (user, hashedPassword) => {
  const userToInsert = {
    username: user,
    password: hashedPassword,
  }
  const query = users
    .insert(userToInsert)
    .returning('userid')
    .toQuery()
  return db.query(query.text, query.values).then(res => res.rows[0].userid)
}

const checkUserExists = username => {
  const query = sql
    .select(
      users
        .subQuery()
        .where(users.username.equals(username))
        .exists(),
    )
    .toQuery()
  return db.query(query.text, query.values).then(res => res.rows[0].exists)
}

const getUserIdAndHash = username => {
  const query = users
    .select('userid', 'password')
    .where(users.username.equals(username))
    .toQuery()
  return db.query(query.text, query.values).then(res => res.rows[0])
}

module.exports = {
  getEntries,
  insertEntry,
  insertUser,
  getOverdueEntries,
  checkUserExists,
  deleteEntry,
  getUserIdAndHash,
  updateEntry,
  checkEntryExists,
  insertEntries,
}
