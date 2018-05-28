// Define Database Queries
const db = require('./db')
const insertEntry = (user, event, lastoccurence, frequency) => {
  const userId = '(SELECT userid from users where username = $1)'
  return db
    .query(
      `INSERT INTO entries VALUES (DEFAULT, ${userId}, $2, $3, $4) returning entryid, userid,lastoccurence, frequency`,
      [user, event, lastoccurence, frequency + 'days'],
    )
    .then(res => res.rows[0])
}

const getEntries = user => {
  return db
    .query(
      'SELECT * FROM entries WHERE userid=(select userid from users where username=$1)',
      [user],
    )
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

const checkUser = username => {
  return db
    .query('SELECT password FROM users WHERE username=$1', [username])
    .then(res => res.rows[0].password)
}

module.exports = {
  getEntries,
  insertEntry,
  insertUser,
  getOverdueEntries,
  checkUser,
}
