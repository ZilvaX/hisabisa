import db from './connection'
function checkUserExists(username) {
  return db
    .query('select userid from users where username = $1', [username])
    .then(res => res.rows.length > 0)
}

export default { checkUserExists }
