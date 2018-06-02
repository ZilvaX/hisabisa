const express = require('express')
const router = express.Router()
const { argon2i } = require('argon2-ffi')
const crypto = require('crypto')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const { secret } = require('../../config.js')
const { insertUser } = require('../../dao.js')
const { checkUserExists } = require('../../dao.js')
const entries = require('./entries')

router.use('/:id(\\d+)/entries', entries)

// create a new user
const randomBytes = promisify(crypto.randomBytes)
router.post('/', async (req, res) => {
  const body = req.body
  if (await checkUserExists(body.username)) {
    res.status(409)
    res.send('Username already exists')
  } else {
    randomBytes(32)
      .then(salt => argon2i.hash(body.password, salt))
      .then(async hashedPassword => {
        const result = await insertUser(body.username, hashedPassword)
        if (result) {
          req.session.username = body.username
          req.sesion.userid = result.userid
          const token = jwt.sign(body.username, secret)
          res.status(201)
          res.send({ token })
        } else {
          res.status(400)
          res.send('DBMS Error')
        }
      })
  }
})

module.exports = router
