const { getEntries, insertEntry, deleteEntry } = require('./dao')

async function addEntry(entry) {
  return await insertEntry(entry)
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
