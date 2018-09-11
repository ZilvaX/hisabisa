require('dotenv').config()
const env = process.env

const nodeEnv = env.NODE_ENV || 'production'

const db = {
  user: env.DB_USER || 'admin',
  database: env.DB_NAME || 'hisabisa',
  pasword: env.DB_PASSWORD,
}

const defaultCookie = { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
let cookie
if (nodeEnv === 'production') {
  cookie = Object.assign({}, defaultCookie, { secure: true })
} else {
  cookie = defaultCookie
}
const expressSession = {
  secret: env.HISABISA_SECRET,
  cookie,
  resave: false,
  saveUninitialized: false,
}

const config = {
  nodeEnv,
  db,
  expressSession,
}

module.exports = config
