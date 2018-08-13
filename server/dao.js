// Define Database Queries
const db = require('./db')
const sql = require('sql')

// Define tables
const entries = sql.define({
  name: 'entries',
  columns: ['entryid', 'userid', 'event', 'lastoccurrence', 'frequency'],
})

const insertEntry = entry => {
  const { event, frequency } = entry
  const entryToInsert = Object.assign({}, entry, {
    frequency: frequency.toString(),
  })
  const query = entries
    .insert(entryToInsert)
    .returning('entryid', 'lastoccurrence', 'frequency')
    .toQuery()
  return db
    .query(query.text, query.values)
    .then(res => Object.assign({}, res.rows[0], { event }))
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
    .select(
      entries.entryid,
      entries.event,
      entries.lastoccurrence,
      entries.frequency,
    )
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
  return db.query('DELETE FROM entries where entryid=$1', [entryid])
}

const insertUser = (user, hashedPassword) => {
  return db
    .query('INSERT INTO users VALUES (DEFAULT, $1, $2) RETURNING userid', [
      user,
      hashedPassword,
    ])
    .then(res => res.rows[0].userid)
}

const checkUserExists = username => {
  return db
    .query('SELECT EXISTS(SELECT 1 FROM users WHERE username=$1 )', [username])
    .then(res => res.rows[0].exists)
}

const getUserIdAndHash = username => {
  return db
    .query('SELECT userid, password FROM users WHERE username=$1', [username])
    .then(res => res.rows[0])
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
}
