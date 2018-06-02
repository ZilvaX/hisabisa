const express = require('express')
const { isInt, isISO8601 } = require('validator')
const {
  getEntries,
  insertEntry,
  getOverdueEntries,
  removeEntry,
} = require('../../dao.js')
const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    console.log(req.session)
    const entries = await getEntries(req.params.id)
    res.send(entries)
  } catch (e) {
    res.status(500).send('Failed to obtain entries')
  }
})

router.get('/:id(\\d+)/overdue', async (req, res) => {
  try {
    const entries = await getOverdueEntries(req.params.id)
    res.send(entries)
  } catch (e) {
    res.status(500).send('Failed to obtain overdue entries')
  }
})

router.post('/', async (req, res) => {
  const username = req.jwt.username
  console.log(req.session)
  const { event, lastoccurence, frequency } = req.body
  if (!isISO8601(lastoccurence + '') || !isInt(frequency + '')) {
    res.status(400).send()
    return
  }
  try {
    const results = await insertEntry(username, event, lastoccurence, frequency)
    const entry = {
      entryid: results.entryid,
      userid: results.userid,
      event,
      lastoccurence: results.lastoccurence,
      frequency: results.frequency,
    }
    res.status(201).send(entry)
  } catch (e) {
    res.status(500).send('Failed to store entry')
  }
})

router.delete('/:id(\\d+)', (req, res) => {
  // TODO Check if the user has permissions to remove the entry
  removeEntry(req.params.id)
    .then(() => res.status(204).send())
    .catch(e => {
      console.error(e)
      res.status(500).send()
    })
})

module.exports = router
