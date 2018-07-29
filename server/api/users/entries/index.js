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

function checkBody(event, lastoccurrence, frequency) {
  return (
    !event ||
    !lastoccurrence ||
    !frequency ||
    !frequency.days ||
    !isISO8601(lastoccurrence + '') ||
    !isInt(frequency.days + '')
  )
}

function convertEntries(entries) {
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

  if (checkBody(event, lastoccurrence, frequency)) {
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

router.put('/:entryid(\\d+)', async (req, res) => {
  const { event, lastoccurrence, frequency } = req.body

  if (checkBody(event, lastoccurrence, frequency)) {
    res.status(400).send()
    return
  }

  const entryid = req.params.entryid
  if (hisabisaService.checkEntry(entryid)) {
    // Convert to Object
    const entry = {
      entryid,
      event,
      lastoccurrence,
      frequency: Duration.fromObject({ days: frequency.days }),
    }
    try {
      const editedEntry = await hisabisaService.editEntry(entry)
      const convertedEntry = convertEntries([editedEntry])[0]
      res.status(200).send(convertedEntry)
    } catch (e) {
      console.error(e)
      res.status(500).send('Failed to update entry')
    }
  } else {
    res.status(404).send('Cannot find entry')
    return
  }
})

router.delete('/:entryid(\\d+)', (req, res) => {
  hisabisaService
    .removeEntry(req.params.entryid)
    .then(() => res.status(204).send())
    .catch(() => res.status(500).send())
})

module.exports = router
