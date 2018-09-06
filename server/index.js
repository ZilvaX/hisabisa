const express = require('express')
const helmet = require('helmet')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const router = require('./api')
const { expressSession } = require('./config')
const { pool } = require('./db')

const app = express()
app.use(express.json())
app.use(helmet())
app.use(
  session(
    Object.assign({}, expressSession, {
      store: new pgSession({
        pool,
      }),
    }),
  ),
)

app.use('/api', router)

app.listen(3000, () => console.log('Hisabisa listening on port 3000'))
