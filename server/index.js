const express = require('express')
const helmet = require('helmet')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const router = require('./api')
const { secret } = require('./config')
const { pool } = require('./db')

const app = express()
app.use(express.json())
app.use(helmet())
app.use(
  session({
    secret,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool,
    }),
  }),
)

app.use('/api', router)

app.listen(3000, () => console.log('Hisabisa listening on port 3000'))
