const express = require('express')
const { isInt, isISO8601 } = require('validator')
const { getEntries, insertEntry, getOverdueEntries } = require('../../dao.js')
const router = express.Router()

router.get('/:id(\\d+)', async (req, res) => {
  try {
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
  const { user, event, lastoccurence, frequency } = req.body
  if (
    !isInt(user + '') ||
    !isISO8601(lastoccurence) ||
    !isInt(frequency + '')
  ) {
    res.status(400).send()
  }

  try {
    const entry = await insertEntry(user, event, lastoccurence, frequency)
    res.status(201).send(entry)
  } catch (e) {
    res.status(500).send('Failed to store entry')
  }
})

module.exports = router
