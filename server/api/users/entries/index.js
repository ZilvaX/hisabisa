const express = require('express')
const { getEntriesById, checkUserExists } = require('../../../dao')

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

module.exports = router
