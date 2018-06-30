const { getEntries, insertEntry, deleteEntry } = require('./dao')

async function addEntry(entry) {
  const results = await insertEntry(entry)
  console.log(results)
  return results
}

async function getAllEntries(userid) {
  return await getEntries(userid)
}

async function removeEntry(userid) {
  return deleteEntry(userid)
}

module.exports = {
  addEntry,
  getAllEntries,
  removeEntry,
}
