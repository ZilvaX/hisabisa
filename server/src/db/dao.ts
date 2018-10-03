import db from './connection'
const sql = require('sql')

// Define tables
const users = sql.define({
  name: 'users',
  columns: ['userid', 'username', 'password'],
})

// Dao functions
function checkUserExists(username) {
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

export default { checkUserExists }
