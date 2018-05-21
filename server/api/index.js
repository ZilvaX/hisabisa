const express = require('express')
const router = express.Router()
const entries = require('./entries')
const users = require('./users')
const authentication = require('./authentication')
const jwt = require('jsonwebtoken')
const { secret } = require('../config.js')
const { promisify } = require('util')

// define the home page route
router.get('/', function(req, res) {
  res.send('API home page \n /entries/:id: Gets entries for given id')
})

router.use('/authentication', authentication)
router.use('/users', users)

router.use((req, res, next) => {
  const token = req.headers.authorization
  const verify = promisify(jwt.verify)
  if (token) {
    verify(token, secret)
      .then(result => {
        if (result) {
          next()
        }
      })
      .catch(e => {
        res.status(401)
        res.send('Token verification failed')
        console.error(e)
      })
  } else {
    res.status(401)
    res.send('No token provided')
  }
})

router.use('/entries', entries)

module.exports = router
