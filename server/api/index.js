const express = require('express')

const entries = require('./entries')
const users = require('./users')
const authentication = require('./authentication')

const router = express.Router()

router.use('/authentication', authentication)
router.use('/users', users)
router.use('/entries', entries)

module.exports = router
