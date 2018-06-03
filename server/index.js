const express = require('express')
const helmet = require('helmet')
const session = require('express-session')

const router = require('./api')
const { secret } = require('./config')

const app = express()
app.use(express.json())
app.use(helmet())
app.use(
  session({
    secret,
    cookie: {},
    resave: false,
    saveUninitialized: false,
  }),
)

app.use('/api', router)

app.listen(3000, () => console.log('Hisabisa listening on port 3000'))
