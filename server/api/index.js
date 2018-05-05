const express = require('express')
const router = express.Router()
const entries = require('./entries')
const users = require('./users')

// define the home page route
router.get('/', function(req, res) {
  res.send('API home page \n /entries/:id: Gets entries for given id')
})

router.use('/entries', entries)

router.use('/users', users)

module.exports = router
