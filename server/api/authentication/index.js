const express = require('express')
const router = express.Router()
const { argon2i } = require('argon2-ffi')
const { isAscii } = require('validator')

const { getUserIdAndHash } = require('../../dao.js')

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

  const { userid, password } = await getUserIdAndHash(body.username)
  if (password) {
    const result = await argon2i.verify(password, body.password)
    if (result) {
      req.session.username = body.username
      req.session.userid = userid
      res.status(204).send()
    } else {
      res.status(401).send()
    }
  } else {
    res.status(404).send()
  }
})

module.exports = router
