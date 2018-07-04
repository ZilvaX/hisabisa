const express = require('express')
const _ = require('lodash')
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

const convertEntries = function(entries) {
  return _.map(entries, x => {
    const { entryid, event, lastoccurrence, frequency } = x
    return {
      entryid,
      event,
      lastoccurrence: lastoccurrence.toISODate(),
      frequency,
    }
  })
}

router.use(authorize)

router.get('/', async (req, res) => {
  try {
    const entries = await hisabisaService.getAllEntries(req.params.id)
    const convertedEntries = convertEntries(entries)
    res.send(convertedEntries)
  } catch (e) {
    console.error(e)
    res.status(500).send('Failed to obtain entries')
  }
})

router.post('/', async (req, res) => {
  const { event, lastoccurrence, frequency } = req.body
  if (
    !event ||
    !lastoccurrence ||
    !frequency ||
    !frequency.days ||
    !isISO8601(lastoccurrence + '') ||
    !isInt(frequency.days + '')
  ) {
    res.status(400).send()
    return
  }
  // Convert to Object
  const entry = {
    userid: parseInt(req.params.id, 10),
    event,
    lastoccurrence,
    frequency: Duration.fromObject({ days: frequency.days }),
  }
  try {
    const newEntry = await hisabisaService.addEntry(entry)
    const convertedEntry = convertEntries([newEntry])[0]
    res.status(201).send(convertedEntry)
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
