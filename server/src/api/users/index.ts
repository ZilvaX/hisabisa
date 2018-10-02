import NewUser from '../../model/NewUser'
import hisabisaService from '../../services/hisabisaService'

const express = require('express')
const { isAscii } = require('validator')

const router = express.Router()

router.post(
  '/',
  (req, res, next) => {
    const body = req.body
    if (
      body &&
      body.username &&
      body.password &&
      isAscii(body.username + '') &&
      isAscii(body.password + '')
    ) {
      const newUser = new NewUser(body.username, body.password)
      res.locals.newUser = newUser
      next()
    } else {
      res.sendStatus(400)
    }
  },
  async (req, res, next) => {
    const newUser: NewUser = res.locals.newUser
    if (!(await hisabisaService.checkUserExists(newUser))) {
      next()
    } else {
      res.sendStatus(409)
    }
  },
  async (req, res) => {
    const newUser: NewUser = res.locals.newUser
    const userid: number = await hisabisaService.registerUser(newUser)
    //    req.sesion.username = newUser.username
    //    req.session.userid = userid
    res.status(201).send({ userid }) // Should return userid
  },
)

export default router
