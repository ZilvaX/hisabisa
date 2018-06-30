const { getEntries, insertEntry } = require('./dao')

async function addEntry(entry) {
  const results = await insertEntry(entry)
  console.log(results)
  return results
}

async function getAllEntries(userid) {
  return await getEntries(userid)
}

module.exports = {
  addEntry,
  getAllEntries,
}
