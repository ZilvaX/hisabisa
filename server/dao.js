// Define Database Queries
const db = require('../db')
const insertEntry = (user, event, lastoccurence, frequency) => {
  return db.query('INSERT INTO entries VALUES (DEFAULT, $1, $2, $3, $4)', [user, event, lastoccurence, frequency])
    .then(res => res)
    .catch(e=> console.error(e.stack))
}
const getEntries = (user) => {
  return db.query('SELECT * FROM entries where userid=$1', [user])
    .then(res => res.rows)
    .catch(e => console.error(e.stack))
}

module.exports = {
  getEntries,
  insertEntry,
}