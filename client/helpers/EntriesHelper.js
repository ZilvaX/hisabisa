import _ from 'lodash'
import { DateTime } from 'luxon'
export function convertEntriesFromApi(entries) {
  return _.map(entries, x => {
    const { entryid, event, lastoccurrence, frequency } = x
    return {
      entryid,
      event,
      lastoccurrence: DateTime.fromISO(lastoccurrence),
      frequency,
    }
  })
}
