const express = require('express')
const router = express.Router()
const entries = require('./entries')

// define the home page route
router.get('/', function (req, res) {
  res.send('API home page \n /entries/:id: Gets entries for given id')
})

router.use('/entries', entries)

module.exports = router
