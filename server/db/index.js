const pgInterval = require('postgres-interval')
const { Duration } = require('luxon')
// Setup Database Pool
const { Pool, types } = require('pg')
// Database Configuration
const pool = new Pool({
  user: 'admin',
  database: 'hisabisa',
})
// Type Parsers
const INTERVAL_OID = 1186
types.setTypeParser(INTERVAL_OID, value => {
  const { days } = Duration.fromISO(pgInterval(value).toISO())
  return { days }
})

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  },
}
