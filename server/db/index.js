const typeConfigurer = require('./typeConfigurer')
const config = require('../config')
// Setup Database Pool
const { Pool, types } = require('pg')
// Database Configuration
const pool = new Pool(config.db)
// Type Parsers
typeConfigurer(types)

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  },
  pool,
}
