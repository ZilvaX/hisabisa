const express = require('express')
const router = express.Router()
const { argon2i } = require('argon2-ffi')
const jwt = require('jsonwebtoken')

const { getUserHash } = require('../../dao.js')
const { secret } = require('../../config.js')

//check user login password and give token to client
router.post('/', (req, res) => {
  const body = req.body
  getUserHash(body.username)
    .then(hash => argon2i.verify(hash, body.password))
    .then(result => {
      if (result) {
        const user = {
          username: body.username,
        }
        const token = jwt.sign(user, secret)
        res.status(200)
        res.send({ token })
      } else {
        res.status(401)
        res.send('Login Error')
      }
    })
    .catch(e => {
      console.error(e)
      res.status(500)
      res.send('Error')
    })
})

module.exports = router
