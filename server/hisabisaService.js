const { insertEntry } = require('./dao')

async function addEntry(entry) {
  const results = await insertEntry(entry)
  console.log(results)
  return results
}

module.exports = {
  addEntry,
}
