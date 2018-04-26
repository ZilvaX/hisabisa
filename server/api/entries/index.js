const express = require('express')
const { getEntries, insertEntry } = require('../../dao.js')
const router = express.Router()

router.get('/:id(\\d+)', async (req, res) => {
  const entries = await getEntries(req.params.id)
  res.send(entries)
})

router.post('/', async (req, res) => {
  const body = req.body
  const entry = await insertEntry(body.user, body.event, body.lastoccurence, body.frequency)
  res.send(entry)
})

module.exports = router