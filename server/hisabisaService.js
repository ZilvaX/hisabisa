const {
  getEntries,
  insertEntry,
  updateEntry,
  checkEntryExists,
  deleteEntry,
  insertEntries,
} = require('./dao')

async function addEntry(entry) {
  return await insertEntry(entry)
}

async function addEntries(entries) {
  return await insertEntries(entries)
}

async function editEntry(entry) {
  return await updateEntry(entry)
}

async function checkEntry(entryid) {
  return await checkEntryExists(entryid)
}

async function getAllEntries(userid) {
  return await getEntries(userid)
}

async function removeEntry(userid) {
  return deleteEntry(userid)
}

module.exports = {
  addEntry,
  editEntry,
  getAllEntries,
  removeEntry,
  checkEntry,
  addEntries,
}
