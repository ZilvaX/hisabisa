// Setup Database Pool
const {Pool} = require('pg')
// Database Configuration
const pool = new Pool({
  user: 'admin',
  database: 'hisabisa',
})

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  },
}
