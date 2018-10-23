require('dotenv').config()
const env = process.env

const nodeEnv = env.NODE_ENV || 'production'

const db = {
  user: env.DB_USER || 'admin',
  database: env.DB_NAME || 'hisabisa',
  password: env.DB_PASSWORD,
}

const expressSession = {
  secret: env.HISABISA_SECRET,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  resave: false,
  saveUninitialized: false,
}

const config = {
  nodeEnv,
  db,
  expressSession,
}

module.exports = config
