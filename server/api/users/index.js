const express = require('express')
const router = express.Router()
const { argon2i } = require('argon2-ffi')
const crypto = require('crypto')
const { promisify } = require('util')

const { insertUser } = require('../../dao.js')
const { checkUser } = require('../../dao.js')

const randomBytes = promisify(crypto.randomBytes)
router.post('/', (req, res) => {
  const body = req.body
  randomBytes(32)
    .then(salt => argon2i.hash(body.password, salt))
    .then(async hashedPassword => {
      const result = await insertUser(body.username, hashedPassword)
      if (result) {
        res.status(201)
        res.send(result)
      } else {
        res.status(400)
        res.send('DBMS Error')
      }
    })
})

router.post('/login', async (req, res) => {
  const body = req.body
  await checkUser(body.username)
    .then(hash => argon2i.verify(hash, body.password))
    .then(result => {
      if (result) {
        res.status(200)
        res.send('Password Verified')
      } else {
        res.status(401)
        res.send('Login Error')
      }
    })
})

module.exports = router
