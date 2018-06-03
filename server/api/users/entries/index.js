const express = require('express')
const { isISO8601, isInt } = require('validator')

const { getEntries, insertEntry, removeEntry } = require('../../../dao')

const router = express.Router({ mergeParams: true })

const authorize = function(req, res, next) {
  const paramUserId = parseInt(req.params.id, 10)
  if (paramUserId === req.session.userid) {
    next()
  } else {
    res.status(403).send()
    return
  }
}

router.use(authorize)

router.get('/', async (req, res) => {
  try {
    const entries = await getEntries(req.params.id)
    res.send(entries)
  } catch (e) {
    res.status(500).send('Failed to obtain entries')
  }
})

router.post('/', async (req, res) => {
  const { event, lastoccurence, frequency } = req.body
  if (
    !event ||
    !lastoccurence ||
    !frequency ||
    !isISO8601(lastoccurence + '') ||
    !isInt(frequency + '')
  ) {
    res.status(400).send()
    return
  }
  try {
    const results = await insertEntry(
      req.params.id,
      event,
      lastoccurence,
      frequency,
    )
    const entry = {
      entryid: results.entryid,
      event,
      lastoccurence: results.lastoccurence,
      frequency: results.frequency,
    }
    res.status(201).send(entry)
  } catch (e) {
    res.status(500).send('Failed to store entry')
  }
})

router.delete('/:entryid(\\d+)', (req, res) => {
  removeEntry(req.params.entryid)
    .then(() => res.status(204).send())
    .catch(e => {
      res.status(500).send()
    })
})

module.exports = router
