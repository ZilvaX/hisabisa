const express = require('express')
const { isISO8601, isInt } = require('validator')
const { Duration } = require('luxon')

const hisabisaService = require('../../../hisabisaService')
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
    const entries = await hisabisaService.getAllEntries(req.params.id)
    res.send(entries)
  } catch (e) {
    console.error(e)
    res.status(500).send('Failed to obtain entries')
  }
})

router.post('/', async (req, res) => {
  const { event, lastoccurrence, frequency } = req.body
  const { days } = frequency
  if (
    !event ||
    !lastoccurrence ||
    !frequency ||
    !days ||
    !isISO8601(lastoccurrence + '') ||
    !isInt(days + '')
  ) {
    res.status(400).send()
    return
  }
  // Convert to Object
  const entry = {
    userid: parseInt(req.params.id, 10),
    event,
    lastoccurrence,
    frequency: Duration.fromObject(frequency),
  }
  try {
    const newEntry = await hisabisaService.addEntry(entry)
    res.status(201).send(newEntry)
  } catch (e) {
    console.error(e)
    res.status(500).send('Failed to store entry')
  }
})

router.delete('/:entryid(\\d+)', (req, res) => {
  hisabisaService
    .removeEntry(req.params.entryid)
    .then(() => res.status(204).send())
    .catch(() => res.status(500).send())
})

module.exports = router
