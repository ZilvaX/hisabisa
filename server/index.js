const express = require('express')
const helmet = require('helmet')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const router = require('./api')
let { expressSession } = require('./config')
const { pool } = require('./db')

const app = express()
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  const cookie = Object.assign({}, expressSession.cookie, { secure: true })
  expressSession = Object.assign({}, expressSession, { cookie }) // serve secure cookies
}
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
