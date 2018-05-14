const express = require('express')
const router = express.Router()
const { argon2i } = require('argon2-ffi')
const jwt = require('jsonwebtoken')

const { checkUser } = require('../../dao.js')
const { secret } = require('../../config.js')

router.post('/', async (req, res) => {
  const body = req.body
  await checkUser(body.username)
    .then(hash => argon2i.verify(hash, body.password))
    .then(result => {
      if (result) {
        const user = {
          user: body.user,
        }
        var token = jwt.sign(user, secret)
        res.status(200)
        res.send(token)
      } else {
        res.status(401)
        res.send('Login Error')
      }
    })
})

module.exports = router
