// Define Database Queries
const db = require('../db')
const getEntries = (currentUser) => {
  return db.query('SELECT * FROM entries where userid=$1', [currentUser])
    .then(res => res.rows)
    .catch(e => console.error(e.stack))
}

module.exports = {
  getEntries,
}
