// Define Database Queries
const db = require('./db')

const insertEntryById = (userid, event, lastoccurence, frequency) => {
  return db
    .query(
      'INSERT INTO entries VALUES (DEFAULT, $1, $2, $3, $4) RETURNING entryid, userid,lastoccurence, frequency',
      [userid, event, lastoccurence, frequency + 'days'],
    )
    .then(res => res.rows[0])
}

const getEntriesById = user => {
  return db
    .query('SELECT * FROM entries WHERE userid=$1', [user])
    .then(res => res.rows)
}

const getOverdueEntries = user => {
  return db
    .query(
      'SELECT * FROM entries WHERE userid=$1 AND lastoccurence + frequency > CURRENT_DATE',
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
    .then(res => res.rows[0])
}

const checkUserExists = username => {
  return db
    .query('SELECT EXISTS(SELECT 1 FROM users WHERE username=$1 )', [username])
    .then(res => res.rows[0].exists)
}

const getUserHash = username => {
  return db
    .query('SELECT password FROM users WHERE username=$1', [username])
    .then(res => res.rows[0].password)
}

const getUserIdAndHash = username => {
  return db
    .query('SELECT userid, password FROM users WHERE username=$1', [username])
    .then(res => res.rows[0])
}

module.exports = {
  getEntriesById,
  insertEntryById,
  insertUser,
  getOverdueEntries,
  getUserHash,
  checkUserExists,
  removeEntry,
  getUserIdAndHash,
}
