var express = require('express')
const { getEntries, insertEntry } = require('../dao.js')
var router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.send('API home page \n /entries/:id: Gets entries for given id')
})

router.get('/entries/:id(\\d+)', async (req, res) => {
  const entries = await getEntries(req.params.id)
  res.send(entries)
})

router.post('/entries/', async (req, res) => {
  const body = req.body
  const entry = await insertEntry(body.user, body.event, body.lastoccurence, body.frequency)
  res.send(entry)
})

module.exports = router
