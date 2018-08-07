const typeConfigurer = require('./typeConfigurer')
// Setup Database Pool
const { Pool, types } = require('pg')
// Database Configuration
const pool = new Pool({
  user: 'admin',
  database: 'hisabisa',
})
// Type Parsers
typeConfigurer(types)

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  },
  pool,
}
