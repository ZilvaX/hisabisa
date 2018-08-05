const pgInterval = require('postgres-interval')
const { Duration, DateTime } = require('luxon')
// Setup Database Pool
const { Pool, types } = require('pg')
// Database Configuration
const pool = new Pool({
  user: 'admin',
  database: 'hisabisa',
})
// Type Parsers
const INTERVAL_OID = 1186
types.setTypeParser(INTERVAL_OID, value =>
  Duration.fromObject(pgInterval(value)),
)
const DATE_OID = 1082
types.setTypeParser(DATE_OID, value => DateTime.fromISO(value))

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  },
  pool,
}
