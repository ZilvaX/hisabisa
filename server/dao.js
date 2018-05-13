// Define Database Queries
const db = require('./db')
const insertEntry = (user, event, lastoccurence, frequency) => {
  return db
    .query('INSERT INTO entries VALUES (DEFAULT, $1, $2, $3, $4)', [
      user,
      event,
      lastoccurence,
      frequency,
    ])
    .then(res => res)
}
const getEntries = user => {
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

const insertUser = (user, hashedPassword) => {
  return db
    .query('INSERT INTO users VALUES (DEFAULT, $1, $2)', [user, hashedPassword])
    .then(res => res)
}

module.exports = {
  getEntries,
  insertEntry,
  insertUser,
  getOverdueEntries,
}
