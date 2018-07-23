// Define Database Queries
const db = require('./db')

const insertEntry = entry => {
  const { userid, event, lastoccurrence, frequency } = entry
  return db
    .query(
      'INSERT INTO entries VALUES (DEFAULT, $1, $2, $3, $4) RETURNING entryid, lastoccurrence, frequency',
      [userid, event, lastoccurrence, frequency.toString()],
    )
    .then(res => Object.assign({}, res.rows[0], { event }))
}

const updateEntry = entry => {
  const { event, lastoccurrence, frequency, entryid } = entry
  return db
    .query(
      'UPDATE entries SET event=$1, lastoccurrence=$2, frequency=$3 WHERE entryid=$4 RETURNING entryid, event, lastoccurrence, frequency',
      [event, lastoccurrence, frequency.toString(), entryid],
    )
    .then(res => res.rows[0])
}

const checkEntryExists = entryid => {
  return db
    .query('SELECT EXISTS(SELECT 1 FROM entries WHERE entryid=$1)', [entryid])
    .then(res => res.rows[0].exists)
}

const getEntries = user => {
  return db
    .query(
      'SELECT entryid, event, lastoccurrence, frequency FROM entries WHERE userid=$1',
      [user],
    )
    .then(res => res.rows)
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
