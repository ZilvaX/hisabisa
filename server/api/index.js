const express = require('express')
const router = express.Router()
const entries = require('./entries')
const users = require('./users')
const authentication = require('./authentication')

// define the home page route
router.get('/', function(req, res) {
  res.send('API home page \n /entries/:id: Gets entries for given id')
})

router.use('/entries', entries)

router.use('/users', users)

router.use('/authentication', authentication)

module.exports = router
