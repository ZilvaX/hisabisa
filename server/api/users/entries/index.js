const express = require('express')
const { isISO8601, isInt } = require('validator')

const { getEntriesById, insertEntryById } = require('../../../dao')

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
    const entries = await getEntriesById(req.params.id)
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
    const results = await insertEntryById(
      req.params.id,
      event,
      lastoccurence,
      frequency,
    )
    // TODO Check if we need userid
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

module.exports = router
