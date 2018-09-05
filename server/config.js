const env = process.env
const nodeEnv = env.NODE_ENV || 'production'

const db = {
  user: env.DB_USER || 'admin',
  database: env.DB_NAME || 'hisabisa',
}
const production = {
  db,
}
const development = {
  db,
}
const test = {
  db,
}

const config = {
  production,
  development,
  test,
}[nodeEnv]

module.exports = {
  secret: 'ohisashiburito',
  db: config.db,
}
