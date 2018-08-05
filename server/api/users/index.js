const express = require('express')
const { argon2i } = require('argon2-ffi')
const crypto = require('crypto')
const { promisify } = require('util')
const { isAscii } = require('validator')

const { insertUser } = require('../../dao.js')
const { checkUserExists } = require('../../dao.js')
const entries = require('./entries')

const router = express.Router()

router.use('/:id(\\d+)/entries', entries)

const randomBytes = promisify(crypto.randomBytes)

// create a new user
router.post('/', async (req, res) => {
  const body = req.body

  // Validate Input
  if (
    !body.username ||
    !body.password ||
    !isAscii(body.username + '') ||
    !isAscii(body.password + '')
  ) {
    res.status(400).send()
    return
  }

  if (await checkUserExists(body.username)) {
    res.status(409)
    res.send('Username already exists')
  } else {
    randomBytes(32)
      .then(salt => argon2i.hash(body.password, salt))
      .then(hashedPassword => insertUser(body.username, hashedPassword))
      .then(userid => {
        req.session.username = body.username
        req.session.userid = userid
        res.status(201).send({ userid })
      })
      .catch(() => {
        res.status(500).send()
      })
  }
})

// Check if session cookie
router.get('/', async (req, res) => {
  if (req.session) {
    const username = req.session.username
    const userid = req.session.userid
    res.status(200).send({ username, userid })
  } else {
    res.status(401).send()
  }
})

module.exports = router
