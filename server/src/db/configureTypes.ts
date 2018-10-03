const pgInterval = require('postgres-interval')
const { Duration, DateTime } = require('luxon')
export default function configureTypes(types) {
  // Type Parsers
  const INTERVAL_OID = 1186
  types.setTypeParser(INTERVAL_OID, value =>
    Duration.fromObject(pgInterval(value)),
  )
  const DATE_OID = 1082
  types.setTypeParser(DATE_OID, value => DateTime.fromISO(value))
}
