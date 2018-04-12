// Setup Database Pool
const {Pool} = require('pg')
// Database Configuration
const pool = new Pool({
  user: 'admin',
  database: 'hisabisa',
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}