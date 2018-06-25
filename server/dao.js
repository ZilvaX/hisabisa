// Define Database Queries
const db = require('./db')

const insertEntry = (userid, event, lastoccurrence, frequency) => {
  return db
    .query(
      'INSERT INTO entries VALUES (DEFAULT, $1, $2, $3, $4) RETURNING entryid, lastoccurrence, frequency',
      [userid, event, lastoccurrence, frequency + 'days'],
    )
    .then(res => res.rows[0])
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

const removeEntry = entryid => {
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
  removeEntry,
  getUserIdAndHash,
}
